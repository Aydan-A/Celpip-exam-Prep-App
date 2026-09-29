// Thin localStorage wrappers with the same keys the prototype used.

export function loadUser() {
  try {
    return JSON.parse(localStorage.getItem('celpip_user') || 'null');
  } catch {
    return null;
  }
}

export function saveUser(user) {
  localStorage.setItem('celpip_user', JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem('celpip_user');
}

export function loadScores(email) {
  try {
    return JSON.parse(localStorage.getItem('celpip_scores_' + email) || '{}');
  } catch {
    return {};
  }
}

export function saveScores(email, scores) {
  if (email) localStorage.setItem('celpip_scores_' + email, JSON.stringify(scores));
}

// Saved writing responses: [{ id, taskId, itemId, choice, text, words, date }], newest first.
export function loadAnswers(email) {
  try {
    return JSON.parse(localStorage.getItem('celpip_answers_' + email) || '[]');
  } catch {
    return [];
  }
}

export function saveAnswers(email, answers) {
  if (email) localStorage.setItem('celpip_answers_' + email, JSON.stringify(answers));
}

// The user's vocabulary collection: [{ id, word, taskId, itemId, date }],
// newest first. Added from the sticky note on tasks, listed on the profile.
// An older version stored the sticky note as one free-text string; each
// line of it becomes a word.
export function loadVocab(email) {
  try {
    const raw = localStorage.getItem('celpip_vocab_' + email);
    if (!raw) return [];
    if (raw.trim().startsWith('[')) return JSON.parse(raw);
    const date = new Date().toISOString();
    return raw.split('\n').map((w) => w.trim()).filter(Boolean).map((word, i) => ({ id: `voc-${Date.now()}-${i}`, word, date }));
  } catch {
    return [];
  }
}

export function saveVocab(email, vocab) {
  try {
    if (email) localStorage.setItem('celpip_vocab_' + email, JSON.stringify(vocab));
  } catch {
    /* storage full or blocked — the list just isn't kept */
  }
}

// Finished mock runs: [{ id, scope, startedAt, date, results }], newest first.
// scope null = full exam, else the section id; results = Listening / Reading
// scores of that run by section.
export function loadExams(email) {
  try {
    return JSON.parse(localStorage.getItem('celpip_exams_' + email) || '[]');
  } catch {
    return [];
  }
}

export function saveExams(email, exams) {
  if (email) localStorage.setItem('celpip_exams_' + email, JSON.stringify(exams));
}

// Profile details the user sets themselves: { name, target } where target is a CLB level.
export function loadProfile(email) {
  try {
    return JSON.parse(localStorage.getItem('celpip_profile_' + email) || '{}');
  } catch {
    return {};
  }
}

export function saveProfile(email, profile) {
  if (email) localStorage.setItem('celpip_profile_' + email, JSON.stringify(profile));
}
