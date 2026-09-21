import { KIND_LABEL, LISTENING_MOCK_PARTS } from '../../data/index.js';
import { BackLink, Badge, Button, Card, Grid, PageHeader, color, font, fontSize } from '../../design-system/index.js';
import SectionGuide from './SectionGuide.jsx';

// One section's task types: scoring criteria + tips, then a card per task.
// Sections with `videoMocks` (Listening) run full video mock tests instead:
// one Start button on top; the part cards below are informative only.
export default function TaskList({ v }) {
  const sec = v.activeSectionObj;
  if (!sec) return null;
  const accent = v.sectionStyle[sec.id];
  const isVideoSection = !!sec.videoMocks;

  return (
    <>
      <BackLink onClick={v.goSectionList}>Sections</BackLink>
      <PageHeader
        title={sec.name}
        style={{ marginTop: 8, marginBottom: 18 }}
        actions={isVideoSection && <Button size="lg" accent={accent.color} onClick={() => v.startVideoMock()}>▶ Start a mock test</Button>}
        subtitle={
          isVideoSection
            ? `A full 6-part video mock test (${sec.videoMocks.length} available). The parts below describe what you'll hear, in order.`
            : "Choose a task type to practice. A random prompt is drawn from that task's bank."
        }
      />

      <Card style={{ padding: '16px 20px', marginBottom: 18 }}>
        <SectionGuide section={sec} />
      </Card>

      <Grid min={300} gap={12}>
        {sec.tasks.map((t, i) => {
          const timing = t.kind === 'speaking' ? `${t.prepSec}s prep · ${t.responseSec}s speak` : t.minutes ? `${t.minutes} min` : '';
          const detail = isVideoSection
            ? `${LISTENING_MOCK_PARTS[i] ? LISTENING_MOCK_PARTS[i].count + ' questions' : ''}`
            : `${t.bank.length} prompt${t.bank.length > 1 ? 's' : ''}${timing ? ` · ${timing}` : ''}`;
          return (
            <Card key={t.id} padding="sm" onClick={isVideoSection ? undefined : () => v.openTask(i)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                <div style={{ fontSize: fontSize.xs, fontFamily: font.mono, color: color.textMuted }}>
                  {sec.name.toUpperCase()} · PART {i + 1}
                </div>
                <Badge tone={accent}>{KIND_LABEL[t.kind]}</Badge>
              </div>
              <div style={{ fontSize: fontSize.lg, fontWeight: 700, marginBottom: 6 }}>{t.name}</div>
              <div style={{ fontSize: fontSize.sm, color: color.textSecondary, lineHeight: 1.5, marginBottom: 10 }}>{t.instructions}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 11.5, color: color.textMuted }}>{detail}</div>
                {!isVideoSection && <div style={{ fontWeight: 700, fontSize: fontSize.sm, color: accent.color }}>Start →</div>}
              </div>
            </Card>
          );
        })}
      </Grid>
    </>
  );
}
