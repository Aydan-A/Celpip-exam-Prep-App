import { BackLink, Badge, Button, Card, Eyebrow, Grid, Heading, PageHeader, color, font, fontSize } from '../../design-system/index.js';
import SectionGuide from '../practice/SectionGuide.jsx';

// Full-exam overview shown BEFORE the exam starts (Issue #2): every section's
// scoring criteria, CLB 9+ tips, and the ordered list of tasks with timing, so
// the candidate sees all guidance up front.
export default function ExamIntro({ v }) {
  const totalTasks = v.sections.reduce((n, s) => n + s.tasks.length, 0);

  return (
    <>
      <BackLink onClick={v.goDashboard}>Dashboard</BackLink>
      <PageHeader
        centered
        eyebrow="Full Exam Mode"
        title="Before you begin"
        subtitle={`You'll complete all ${totalTasks} tasks in the official order — Listening, Reading, Writing, then Speaking. Each task is timed. Review the criteria and tips for every section below, then start when you're ready.`}
        style={{ margin: '10px 0 6px' }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '24px 0' }}>
        {v.sections.map((sec) => (
          <Card key={sec.id}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <Heading level="card" style={{ fontSize: 17 }}>{sec.name}</Heading>
              <Badge tone={v.sectionStyle[sec.id]} mono>{sec.tasks.length} TASKS</Badge>
            </div>

            <SectionGuide section={sec} />

            <Eyebrow style={{ margin: '14px 0 7px' }}>Tasks</Eyebrow>
            <Grid min={260} gap={6}>
              {sec.tasks.map((t, i) => {
                const timing = t.kind === 'speaking' ? `${t.prepSec}s + ${t.responseSec}s` : t.minutes ? `${t.minutes} min` : '';
                return (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: fontSize.sm, color: color.textSecondary, padding: '4px 0' }}>
                    <span>{i + 1}. {t.name}</span>
                    <span style={{ fontFamily: font.mono, color: color.textMuted, whiteSpace: 'nowrap' }}>{timing}</span>
                  </div>
                );
              })}
            </Grid>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <Button variant="secondary" size="lg" onClick={v.goDashboard}>Cancel</Button>
        <Button size="lg" onClick={v.beginFullExam}>Begin full exam →</Button>
      </div>
    </>
  );
}
