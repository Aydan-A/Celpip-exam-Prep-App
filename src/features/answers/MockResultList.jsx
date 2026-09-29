import { Badge, Button, Card, List, color, font, fontSize, fontWeight } from '../../design-system/index.js';
import { parseAnswerKey } from '../../data/index.js';
import { clbBandInfo } from '../../lib/clb.js';

// Listening / Reading results (latest attempt of each mock test or part),
// newest first. Open a row to see your answer sheet against the key.
export default function MockResultList({ section, scores, onDelete }) {
  const rows = Object.entries(scores || {})
    .map(([scoreId, r]) => ({ scoreId, r, ...describe(section, scoreId, r) }))
    .sort((a, b) => (b.r.date || '').localeCompare(a.r.date || ''));

  if (!rows.length) {
    return (
      <Card style={{ padding: '14px 20px', fontSize: fontSize.sm, color: color.textSecondary }}>
        No {section.name} results yet. Check your answers at the end of a mock test and the result is kept here.
      </Card>
    );
  }

  return (
    <List>
      {rows.map((row, i) => (
        <details key={row.scoreId} style={{ padding: '12px 20px', borderBottom: i === rows.length - 1 ? 'none' : `1px solid ${color.divider}` }}>
          <summary style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: fontSize.md, fontWeight: fontWeight.bold, flex: 1, minWidth: 180 }}>
              {row.title}
              {row.part && <span style={{ color: color.textMuted, fontWeight: fontWeight.medium }}> · {row.part}</span>}
            </span>
            <span style={{ fontSize: fontSize.sm, fontFamily: font.mono, color: color.textMuted }}>
              {row.r.date ? `${new Date(row.r.date).toLocaleDateString()} · ` : ''}{row.r.correct} / {row.r.total} correct
            </span>
            <Badge tone={clbBandInfo(row.r.clb)} mono>CLB {row.r.clb}</Badge>
          </summary>

          {row.key && row.r.answers ? (
            <AnswerSheet first={row.r.first || 1} total={row.r.total} answers={row.r.answers} answerKey={row.key} />
          ) : (
            <div style={{ fontSize: fontSize.sm, color: color.textMuted, margin: '10px 0' }}>The answer sheet wasn't kept for this older result.</div>
          )}

          <div style={{ borderTop: `1px solid ${color.divider}`, marginTop: 12, paddingTop: 12 }}>
            <Button variant="danger" size="sm" onClick={() => { if (window.confirm('Delete this result?')) onDelete(section.id, row.scoreId); }}>Delete result</Button>
          </div>
        </details>
      ))}
    </List>
  );
}

// Title, part and answer key for a stored result. Video mock results are
// keyed by the mock id (whole test) or `<id>-p<n>` (one part).
function describe(section, scoreId, r) {
  const mocks = section.videoMocks || [];
  const mock = mocks.find((m) => m.id === r.mockId) || mocks.find((m) => scoreId === m.id || scoreId.startsWith(`${m.id}-p`));
  if (!mock) {
    const task = section.tasks.find((t) => t.id === scoreId);
    return { title: task ? task.name : scoreId };
  }
  const partIndex = r.part != null ? r.part : scoreId.startsWith(`${mock.id}-p`) ? Number(scoreId.split('-p').pop()) - 1 : null;
  const part = partIndex == null ? 'Full test' : section.mockParts[partIndex] && section.mockParts[partIndex].name;
  return { title: mock.label, part, key: parseAnswerKey(mock.answers) };
}

function AnswerSheet({ first, total, answers, answerKey }) {
  const nums = Array.from({ length: total }, (_, i) => first + i);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(92px, 1fr))', gap: 6, margin: '12px 0 4px' }}>
      {nums.map((n) => {
        const mine = answers[n];
        const right = answerKey[n - 1];
        const ok = mine === right;
        return (
          <div key={n} style={{ fontFamily: font.mono, fontSize: fontSize.sm, padding: '5px 8px', borderRadius: 6, background: ok ? color.successSoft : color.dangerSoft, color: ok ? color.success : color.danger }}>
            Q{n} {mine || '—'}{ok ? ' ✓' : ` → ${right}`}
          </div>
        );
      })}
    </div>
  );
}
