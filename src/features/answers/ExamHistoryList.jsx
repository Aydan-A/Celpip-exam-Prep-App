import { Badge, Button, Card, List, color, font, fontSize, fontWeight } from '../../design-system/index.js';
import { SECTIONS, SECTION_LIST } from '../../data/index.js';
import { clbBandInfo } from '../../lib/clb.js';

// Finished mock runs (the full exam, or one section's full mock), newest
// first: Listening / Reading scores from that run, and how many Writing /
// Speaking answers were saved during it (those are under their own tabs).
export default function ExamHistoryList({ exams, answers, onDelete }) {
  if (!exams.length) {
    return (
      <Card style={{ padding: '14px 20px', fontSize: fontSize.sm, color: color.textSecondary }}>
        No full mocks finished yet. Take the full exam from the dashboard, or a full section mock from a section page.
      </Card>
    );
  }

  return (
    <List>
      {exams.map((exam, i) => {
        const sections = exam.scope ? [SECTIONS[exam.scope]] : SECTION_LIST;
        const clbs = sections.map((sec) => exam.results[sec.id] && exam.results[sec.id].clb).filter(Boolean);
        const overall = clbs.length ? Math.round(clbs.reduce((a, b) => a + b, 0) / clbs.length) : null;
        return (
          <details key={exam.id} style={{ padding: '12px 20px', borderBottom: i === exams.length - 1 ? 'none' : `1px solid ${color.divider}` }}>
            <summary style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: fontSize.md, fontWeight: fontWeight.bold, flex: 1, minWidth: 180 }}>
                {exam.scope ? `${SECTIONS[exam.scope].name} full mock` : 'Full exam'}
              </span>
              <span style={{ fontSize: fontSize.sm, fontFamily: font.mono, color: color.textMuted }}>{new Date(exam.date).toLocaleDateString()}</span>
              {overall && <Badge tone={clbBandInfo(overall)} mono>CLB {overall}</Badge>}
            </summary>

            <div style={{ margin: '10px 0 4px' }}>
              {sections.map((sec) => (
                <div key={sec.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '6px 0', fontSize: fontSize.sm }}>
                  <span style={{ fontWeight: fontWeight.medium }}>{sec.name}</span>
                  <span style={{ color: color.textSecondary }}>{sectionLine(sec, exam, answers)}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${color.divider}`, marginTop: 10, paddingTop: 12 }}>
              <Button variant="danger" size="sm" onClick={() => { if (window.confirm('Delete this mock from your history? Saved answers are kept.')) onDelete(exam.id); }}>Delete from history</Button>
            </div>
          </details>
        );
      })}
    </List>
  );
}

function sectionLine(sec, exam, answers) {
  const res = exam.results[sec.id];
  if (res) return `${res.correct} / ${res.total} correct · CLB ${res.clb} · ${res.label}`;
  if (sec.videoMocks) return 'Not checked';
  const saved = answers.filter((a) => sec.tasks.some((t) => t.id === a.taskId) && (!exam.startedAt || (a.date >= exam.startedAt && a.date <= exam.date)));
  return saved.length ? `${saved.length} answer${saved.length > 1 ? 's' : ''} saved — see the ${sec.name} tab` : 'No answers saved';
}
