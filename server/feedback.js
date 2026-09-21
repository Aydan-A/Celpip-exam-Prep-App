// Shared AI-feedback handler used by both the Vite dev middleware and the
// production Express server. It scores a CELPIP writing or speaking response
// against the four official criteria (each 1–12).
//
// If ANTHROPIC_API_KEY is set, scoring is done by Claude. Otherwise a built-in
// heuristic scorer runs so the app is fully functional offline.

const MODEL = process.env.CELPIP_MODEL || 'claude-opus-4-8';

const CRITERIA = {
  writing: ['Content/Coherence', 'Vocabulary', 'Readability', 'Task Fulfillment'],
  speaking: ['Content', 'Vocabulary', 'Listenability', 'Task Fulfillment'],
};

const FEEDBACK_SCHEMA = {
  type: 'object',
  properties: {
    criteria: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          score: { type: 'integer' },
          tips: { type: 'array', items: { type: 'string' } },
        },
        required: ['name', 'score', 'tips'],
        additionalProperties: false,
      },
    },
  },
  required: ['criteria'],
  additionalProperties: false,
};

function buildPrompt({ kind, taskName, taskPrompt, text }) {
  const role =
    kind === 'writing' ? 'certified CELPIP writing rater' : 'certified CELPIP speaking rater';
  const names = CRITERIA[kind];
  const label = kind === 'writing' ? 'Candidate response' : "Transcript of candidate's spoken response";
  const taskLine = taskName ? `Task (${taskName}): ${taskPrompt}` : `Task prompt: ${taskPrompt}`;
  return (
    `You are a ${role}. Score the response below against these four CELPIP criteria, ` +
    `each on a scale of 1-12: ${names.join(', ')}.\n\n` +
    `${taskLine}\n\n${label}:\n"""\n${text}\n"""\n\n` +
    `For each criterion give a score (integer 1-12) and two short, specific, actionable tips ` +
    `for reaching CLB 9+. Return one entry per criterion, in the order listed above.`
  );
}

let _client = null;
async function getClient() {
  if (_client) return _client;
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  _client = new Anthropic();
  return _client;
}

async function scoreWithClaude(input) {
  const client = await getClient();
  const names = CRITERIA[input.kind];
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    output_config: { format: { type: 'json_schema', schema: FEEDBACK_SCHEMA } },
    messages: [{ role: 'user', content: buildPrompt(input) }],
  });
  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock) throw new Error('No text block in model response');
  const parsed = JSON.parse(textBlock.text);
  // Normalise: enforce the four expected criteria names, order, and score range.
  const byName = new Map(parsed.criteria.map((c) => [String(c.name).toLowerCase(), c]));
  const criteria = names.map((name) => {
    const c = byName.get(name.toLowerCase()) || {};
    return {
      name,
      score: clampScore(c.score),
      tips: Array.isArray(c.tips) && c.tips.length ? c.tips.slice(0, 3) : ['Keep practising this criterion.'],
    };
  });
  return { criteria };
}

function clampScore(n) {
  const v = Math.round(Number(n));
  if (!Number.isFinite(v)) return 6;
  return Math.max(1, Math.min(12, v));
}

// ---------- Heuristic fallback ----------
// Deterministic, transparent scoring so the app works without an API key.
function heuristicScore({ kind, text }) {
  const clean = text.trim();
  const words = clean.match(/\S+/g) || [];
  const wordCount = words.length;
  const sentences = clean.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const sentenceCount = Math.max(1, sentences.length);
  const avgSentenceLen = wordCount / sentenceCount;
  const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z']/g, '')));
  const lexicalDiversity = wordCount ? uniqueWords.size / wordCount : 0;
  const longWords = words.filter((w) => w.replace(/[^a-z]/gi, '').length >= 7).length;
  const connectors = (clean.match(
    /\b(however|therefore|moreover|furthermore|although|because|whereas|in addition|for example|as a result|on the other hand|consequently)\b/gi,
  ) || []).length;

  // Target length differs by section.
  const targetLen = kind === 'writing' ? 175 : 90;
  const lengthScore = bell(wordCount, targetLen, targetLen * 0.7);

  // A response far shorter than the target cannot demonstrate any criterion,
  // and lexical diversity is meaningless on a handful of words (a single word
  // is "100% diverse"). Scale everything down until there is enough text.
  const coverage = Math.min(1, wordCount / (targetLen * 0.5));
  const diversity = lexicalDiversity * Math.min(1, wordCount / 60);
  // Real English text almost always contains common function words; keyboard
  // mashing and word salad rarely do.
  const functionHits = (clean.match(
    /\b(the|a|an|i|you|he|she|it|we|they|is|are|was|were|to|of|in|on|for|and|but|or|that|this|with|my|your|have|has|had|not|be|at|as|do|will|would|can)\b/gi,
  ) || []).length;
  const looksLikeEnglish = wordCount >= 8 && functionHits / wordCount >= 0.08;

  // Cap at 9: word counting cannot certify top-band quality, so the offline
  // estimate never claims a 10-12.
  const cap = (n) => Math.min(9, n);
  let content = cap(band((2 + lengthScore * 6 + connectors * 0.8) * coverage));
  let vocabulary = cap(band((3 + diversity * 9 + longWords * 0.25) * coverage));
  let readability = cap(band((4 + clarity(avgSentenceLen) * 6 + connectors * 0.5) * coverage));
  let task = cap(band((3 + lengthScore * 7 + Math.min(connectors, 4) * 0.5) * coverage));
  if (!looksLikeEnglish) {
    content = vocabulary = readability = task = 1;
  }

  const names = CRITERIA[kind];
  const scores = [content, vocabulary, readability, task];
  const tipBanks = {
    'Content/Coherence': contentTips(wordCount, connectors),
    Content: contentTips(wordCount, connectors),
    Vocabulary: vocabTips(lexicalDiversity, longWords),
    Readability: readabilityTips(avgSentenceLen, connectors),
    Listenability: readabilityTips(avgSentenceLen, connectors),
    'Task Fulfillment': taskTips(wordCount, targetLen),
  };
  const gibberishTips = ['This does not look like a real English response — write a genuine answer to get meaningful feedback.'];
  return {
    criteria: names.map((name, i) => ({
      name,
      score: scores[i],
      tips: looksLikeEnglish ? tipBanks[name] : gibberishTips,
    })),
    heuristic: true,
  };
}

function bell(x, center, spread) {
  return Math.exp(-((x - center) ** 2) / (2 * spread ** 2));
}
function clarity(avgLen) {
  // Ideal average sentence length ~16 words.
  return bell(avgLen, 16, 9);
}
function band(raw) {
  return Math.max(1, Math.min(12, Math.round(raw)));
}
function contentTips(wc, connectors) {
  const tips = [];
  if (wc < 100) tips.push('Develop your ideas more fully — add supporting details and examples.');
  else tips.push('Good idea development; make sure every paragraph ties back to the prompt.');
  if (connectors < 2) tips.push('Use more linking words (however, therefore, for example) to connect ideas.');
  else tips.push('Strong use of transitions — keep signposting the structure of your argument.');
  return tips;
}
function vocabTips(diversity, longWords) {
  const tips = [];
  if (diversity < 0.45) tips.push('Vary your word choice — avoid repeating the same key terms.');
  else tips.push('Nice lexical range; keep reaching for precise, less common vocabulary.');
  if (longWords < 5) tips.push('Introduce a few more advanced or topic-specific words where natural.');
  else tips.push('Good use of sophisticated vocabulary — ensure each word fits the context.');
  return tips;
}
function readabilityTips(avgLen, connectors) {
  const tips = [];
  if (avgLen > 26) tips.push('Some sentences are long — break them up for clarity.');
  else if (avgLen < 10) tips.push('Combine short sentences to vary rhythm and show control of grammar.');
  else tips.push('Well-balanced sentence length; keep varying your structures.');
  tips.push(connectors < 2 ? 'Add clear transitions so the reader can follow easily.' : 'Cohesion is clear and easy to follow.');
  return tips;
}
function taskTips(wc, target) {
  const tips = [];
  if (wc < target * 0.7) tips.push(`Aim closer to the expected length (~${target} words) to fully address the task.`);
  else if (wc > target * 1.5) tips.push('You went well over length — be more concise and stay on task.');
  else tips.push('Length is on target; make sure you answered every part of the prompt.');
  tips.push('Re-read the prompt and confirm each requirement is directly addressed.');
  return tips;
}

// ---------- Entry point ----------
export async function computeFeedback(input) {
  const kind = input.kind === 'speaking' ? 'speaking' : 'writing';
  const text = String(input.text || '');
  if (text.trim().length < 20) {
    const err = new Error('Response is too short to score.');
    err.status = 400;
    throw err;
  }
  const payload = {
    kind,
    taskName: input.taskName || '',
    taskPrompt: input.taskPrompt || '',
    text,
  };
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      return await scoreWithClaude(payload);
    } catch (e) {
      // Fall back to the heuristic scorer rather than failing the request.
      console.error('[feedback] Claude scoring failed, using heuristic:', e.message);
    }
  }
  return heuristicScore(payload);
}

export async function feedbackRoute(req, res) {
  try {
    const result = await computeFeedback(req.body || {});
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  } catch (e) {
    res.statusCode = e.status || 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: e.message || 'Feedback failed' }));
  }
}
