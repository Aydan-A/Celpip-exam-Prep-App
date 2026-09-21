import { BackLink, Badge, Card, Grid, Heading, PageHeader, color, fontSize } from '../../design-system/index.js';

// Test Yourself → choose a section. Each card shows the official task count and
// the first few task types for that section.
export default function SectionList({ v }) {
  return (
    <>
      <BackLink onClick={v.goDashboard}>Dashboard</BackLink>
      <PageHeader title="Test Yourself Mode" subtitle="Pick a section, then choose an individual task type to practice." style={{ marginTop: 8, marginBottom: 24 }} />

      <Grid min={300} gap={16}>
        {v.sections.map((sec) => {
          const accent = v.sectionStyle[sec.id];
          return (
            <Card key={sec.id} onClick={() => v.openSection(sec.id)} style={{ padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <Heading level="card">{sec.name}</Heading>
                <Badge tone={accent} mono>{sec.tasks.length} TASK{sec.tasks.length > 1 ? 'S' : ''}</Badge>
              </div>
              <div style={{ fontSize: fontSize.sm, color: color.textMuted, marginBottom: 8, fontWeight: 600 }}>Task types</div>
              {sec.tasks.slice(0, 4).map((t) => (
                <div key={t.id} style={{ fontSize: fontSize.sm, color: color.textSecondary, lineHeight: 1.5, marginBottom: 3 }}>• {t.name}</div>
              ))}
              {sec.tasks.length > 4 && <div style={{ fontSize: fontSize.sm, color: color.textMuted, lineHeight: 1.5 }}>+ {sec.tasks.length - 4} more…</div>}
              <div style={{ marginTop: 14, fontWeight: 700, fontSize: 13, color: accent.color }}>Choose a task →</div>
            </Card>
          );
        })}
      </Grid>
    </>
  );
}
