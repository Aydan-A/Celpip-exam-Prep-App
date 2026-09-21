import { Badge, Card, Eyebrow, Grid, Heading, PageHeader, Text, color, fontSize, fontWeight, tone } from '../../design-system/index.js';
import ScoreTracker from './ScoreTracker.jsx';

export default function Dashboard({ v }) {
  return (
    <>
      <PageHeader title={`Welcome back, ${v.userName}`} subtitle="Choose how you'd like to practice today." style={{ marginBottom: 26 }} />

      <Grid min={300} gap={20} style={{ marginBottom: 28 }}>
        <ModeCard
          accent={tone.primary}
          eyebrow="Full Exam Mode"
          title="Simulate the real CELPIP"
          body="All four parts in order — Listening, Reading, Writing, Speaking — under real timed conditions. Get a full score report with a CLB estimate per section."
          chips={v.examOrderLabels.map((lbl) => ({ key: lbl, label: lbl }))}
          cta="Start full exam →"
          onClick={v.startFullExam}
        />
        <ModeCard
          accent={tone.success}
          eyebrow="Test Yourself Mode"
          title="Practice section by section"
          body="Pick any section, see scoring criteria and CLB 9+ tips, and work through tasks with no time pressure unless you turn a timer on."
          chips={v.sections.map((sec) => ({ key: sec.id, label: sec.name, onClick: () => v.openSection(sec.id) }))}
          cta="Choose a section →"
          onClick={v.goSectionList}
        />
      </Grid>

      <ScoreTracker rows={v.scoreRows} />
    </>
  );
}

function ModeCard({ accent, eyebrow, title, body, chips, cta, onClick }) {
  return (
    <Card accentBar={accent.color} padding="lg" onClick={onClick}>
      <Eyebrow color={accent.color} style={{ letterSpacing: '0.06em', marginBottom: 10 }}>{eyebrow}</Eyebrow>
      <Heading level="card" style={{ fontSize: fontSize['2xl'], marginBottom: 8 }}>{title}</Heading>
      <Text style={{ lineHeight: 1.55, marginBottom: 18 }}>{body}</Text>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {chips.map((c) => (
          <Badge
            key={c.key}
            tone={accent}
            onClick={c.onClick ? (e) => { e.stopPropagation(); c.onClick(); } : undefined}
            style={{ fontSize: 11.5, fontWeight: fontWeight.medium, padding: '5px 10px', borderRadius: 6, cursor: c.onClick ? 'pointer' : undefined }}
          >
            {c.label}
          </Badge>
        ))}
      </div>
      <div style={{ fontWeight: fontWeight.bold, fontSize: fontSize.md, color: accent.color }}>{cta}</div>
    </Card>
  );
}
