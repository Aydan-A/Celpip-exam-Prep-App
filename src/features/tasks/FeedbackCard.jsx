import { Alert, Badge, BulletList, Card, Heading, Mono, ProgressBar, color, fontSize } from '../../design-system/index.js';

// Shared AI feedback card used by both writing and speaking. When the server
// scored with the offline heuristic (no API key), say so honestly.
export default function FeedbackCard({ feedback, clbFromScore12 }) {
  const avg = feedback.criteria.reduce((a, c) => a + c.score, 0) / feedback.criteria.length;
  const heuristic = !!feedback.heuristic;
  return (
    <Card style={{ padding: '20px 22px', marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <Heading level="section">{heuristic ? 'Estimated Feedback' : 'AI Feedback'}</Heading>
        <Badge tone="primary" mono size="md">Est. CLB {clbFromScore12(avg)}</Badge>
      </div>
      {heuristic && (
        <Alert tone="warning" style={{ padding: '10px 14px', marginBottom: 14 }}>
          ⚠ Offline estimate — no ANTHROPIC_API_KEY is set on the server, so this score comes from a simple
          word-count heuristic, not real AI. Treat it as a rough guide only.
        </Alert>
      )}
      {feedback.criteria.map((c, i) => (
        <div key={i} style={{ borderTop: `1px solid ${color.border}`, padding: '14px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ fontSize: fontSize.md, fontWeight: 700 }}>{c.name}</div>
            <Mono size={13} color={color.primary}>{c.score} / 12</Mono>
          </div>
          <ProgressBar value={c.score / 12} height={5} style={{ marginBottom: 8 }} />
          <BulletList items={c.tips} />
        </div>
      ))}
    </Card>
  );
}
