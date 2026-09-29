import { clbFromPercent } from './clb.js';

// Derive a section-level summary from its per-task results.
// Only Listening/Reading are scored (correct/total); Writing and Speaking
// are practised without a score.
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

  return null;
}
