import { Badge, Button, Card, Grid, Heading, PageHeader, Text, fontSize, tone } from '../../design-system/index.js';

export default function ReportScreen({ v }) {
  return (
    <>
      <PageHeader centered eyebrow="Full exam complete" title="Your score report" style={{ marginBottom: 8 }} />
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <Badge tone={tone.inverse} mono style={{ fontSize: 15, padding: '8px 16px', borderRadius: 8 }}>Overall estimate: CLB {v.overallClb}</Badge>
      </div>
      <Grid min={300} gap={16} style={{ marginBottom: 24 }}>
        {v.reportRows.map((row, i) => (
          <Card key={i} style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <Heading level="section">{row.name}</Heading>
              <Badge tone={row.tone} mono size="md">CLB {row.clb}</Badge>
            </div>
            <Text style={{ fontSize: fontSize.sm + 0.5 }}>{row.detail}</Text>
          </Card>
        ))}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size="lg" onClick={v.goDashboard}>Back to dashboard</Button>
      </div>
    </>
  );
}
