import { clbFromPercent, clbFromScore12 } from './clb.js';

// Derive a section-level summary from its per-task results.
// MCQ sections (Listening/Reading) aggregate correct/total; productive
// sections (Writing/Speaking) average the AI 1–12 scores.
export function sectionSummary(sectionScores) {
  const entries = Object.values(sectionScores || {});
  if (!entries.length) return null;

  const mcq = entries.filter((e) => e.type === 'mcq');
  if (mcq.length) {
    const correct = mcq.reduce((a, e) => a + e.correct, 0);
    const total = mcq.reduce((a, e) => a + e.total, 0);
    const pct = total ? Math.round((correct / total) * 100) : 0;
    return { clb: clbFromPercent(pct), detail: `${correct} / ${total} correct · ${mcq.length} task${mcq.length > 1 ? 's' : ''}` };
  }

  const ai = entries.filter((e) => e.type === 'ai');
  if (ai.length) {
    const avg = ai.reduce((a, e) => a + e.avg, 0) / ai.length;
    return { clb: clbFromScore12(avg), detail: `avg ${Math.round(avg * 10) / 10} / 12 · ${ai.length} task${ai.length > 1 ? 's' : ''}` };
  }
  return null;
}
