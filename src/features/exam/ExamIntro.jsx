import { BackLink, BulletList, Button, Card, Eyebrow, PageHeader, color, font, fontSize, fontWeight } from '../../design-system/index.js';
import SectionGuide from '../practice/SectionGuide.jsx';

const RULES = [
  'Listening and Reading are each one full video mock test, the same ones as in Test Yourself. Mark the answer sheet, then check your answers to continue.',
  'Writing timers start on their own and cannot be paused.',
  'Each task must be answered before you can continue — there is no going back.',
  'Speaking records through your microphone, so allow access when asked.',
];

// Full-exam overview shown BEFORE the exam starts (Issue #2): the sections in
// order with their length, and each section's scoring criteria and CLB 9+ tips
// one click away, so all guidance is available up front.
export default function ExamIntro({ v }) {
  return (
    <>
      <BackLink onClick={v.goDashboard}>Dashboard</BackLink>
      <PageHeader
        eyebrow="Full Exam Mode"
        title="Before you begin"
        subtitle="All four sections in the official order, timed like the real test. You get a CLB estimate for each section at the end."
        style={{ marginTop: 8, marginBottom: 22 }}
      />

      <Eyebrow style={{ marginBottom: 8 }}>Exam order</Eyebrow>
      <Card padding="none" style={{ overflow: 'hidden', marginBottom: 18 }}>
        {v.sections.map((sec, i) => (
          <SectionRow key={sec.id} n={i + 1} sec={sec} accent={v.sectionStyle[sec.id]} last={i === v.sections.length - 1} />
        ))}
      </Card>

      <Card padding="sm" style={{ marginBottom: 24 }}>
        <Eyebrow style={{ marginBottom: 8 }}>How it works</Eyebrow>
        <BulletList items={RULES} />
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, flexWrap: 'wrap' }}>
        <Button variant="secondary" size="lg" onClick={v.goDashboard}>Cancel</Button>
        <Button size="lg" onClick={v.beginFullExam}>Begin full exam →</Button>
      </div>
    </>
  );
}

// One section: number, name and length; expands to show its criteria and tips.
function SectionRow({ n, sec, accent, last }) {
  const { duration, parts } = sec.official;
  return (
    <details className="ds-disclosure" style={{ borderBottom: last ? 'none' : `1px solid ${color.divider}` }}>
      <summary className="ds-row-interactive ds-focusable" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', cursor: 'pointer' }}>
        <div style={{ flex: 'none', width: 26, height: 26, borderRadius: 999, background: accent.bg, color: accent.color, fontFamily: font.mono, fontWeight: fontWeight.bold, fontSize: fontSize.sm, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {n}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: fontSize.lg, fontWeight: fontWeight.bold }}>{sec.name}</div>
          <div style={{ fontSize: fontSize.sm, fontFamily: font.mono, color: color.textMuted }}>{parts} parts · {duration}</div>
        </div>
        <div style={{ flex: 'none', fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: accent.color, whiteSpace: 'nowrap' }}>
          Criteria & tips <span className="ds-disclosure-chevron">▾</span>
        </div>
      </summary>
      <div style={{ padding: '4px 20px 18px 60px' }}>
        <SectionGuide section={sec} />
      </div>
    </details>
  );
}
