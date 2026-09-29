import { BackLink, Card, Grid, Heading, PageHeader, color, font, fontSize, fontWeight } from '../../design-system/index.js';

// Test Yourself → choose a section. Every card has the same layout: the
// official CELPIP time, number of parts and number of questions.
export default function SectionList({ v }) {
  return (
    <>
      <BackLink onClick={v.goDashboard}>Dashboard</BackLink>
      <PageHeader title="Test Yourself Mode" subtitle="Pick a section, then choose an individual task type to practice." style={{ marginTop: 8, marginBottom: 24 }} />

      <Grid min={220} gap={16}>
        {v.sections.map((sec) => {
          const accent = v.sectionStyle[sec.id];
          const { duration, parts, questions } = sec.official;
          const stats = [
            { label: 'Time', value: duration },
            { label: 'Parts', value: parts },
            { label: 'Questions', value: questions },
          ];
          return (
            <Card key={sec.id} accentBar={accent.color} padding="md" onClick={() => v.openSection(sec.id)} style={{ height: '100%' }}>
              <Heading level="card" style={{ marginBottom: 14 }}>{sec.name}</Heading>
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    padding: '8px 0', borderTop: i === 0 ? 'none' : `1px solid ${color.divider}`,
                  }}
                >
                  <span style={{ fontSize: fontSize.sm, color: color.textMuted }}>{s.label}</span>
                  <span style={{ fontSize: fontSize.md, fontFamily: font.mono, fontWeight: fontWeight.bold, color: color.text }}>{s.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 14, fontWeight: fontWeight.bold, fontSize: fontSize.sm, color: accent.color }}>Choose a task →</div>
            </Card>
          );
        })}
      </Grid>
    </>
  );
}
