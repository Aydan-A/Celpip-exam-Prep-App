import { Alert, Button, Card, Eyebrow, Tag, TextArea, color, fontWeight } from '../../design-system/index.js';
import TaskTimer from './TaskTimer.jsx';
import FeedbackCard from './FeedbackCard.jsx';

// Writing item: a prompt (optionally with survey choices), a response box with
// a live word count, and an AI feedback panel.
export default function WritingItem({ v }) {
  const { item, task, taskState: t, handlers, clbFromScore12 } = v;
  const words = (t.text.trim().match(/\S+/g) || []).length;
  const target = task.wordMin && task.wordMax ? `${task.wordMin}–${task.wordMax} words` : '';

  return (
    <>
      <TaskTimer v={v} label={`Countdown timer (${task.minutes} min)`} />

      <Card style={{ padding: '20px 22px', marginBottom: 16 }}>
        <Eyebrow style={{ marginBottom: 10 }}>Task prompt</Eyebrow>
        <div style={{ fontSize: 14, lineHeight: 1.7, color: color.textBody, marginBottom: item.options ? 12 : 16 }}>{item.prompt}</div>
        {item.options && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {item.options.map((o, i) => <Tag key={i} style={{ fontWeight: fontWeight.medium, padding: '7px 12px' }}>{o}</Tag>)}
          </div>
        )}
        <TextArea placeholder="Write your response here…" value={t.text} onChange={handlers.onWritingText} minHeight={220} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, gap: 10, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 12, color: color.textMuted }}>{words} words{target ? ` · target ${target}` : ''}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {v.isPractice && <Button variant="outline" size="sm" onClick={handlers.rerollItem} style={{ padding: '10px 14px' }}>🔀 Another prompt</Button>}
            <Button onClick={handlers.getWritingFeedback} disabled={t.loading} style={{ fontSize: 13 }}>
              {t.loading ? 'Scoring…' : 'Get AI Feedback'}
            </Button>
          </div>
        </div>
        {t.error && <Alert tone="danger" style={{ marginTop: 10 }}>{t.error}</Alert>}
      </Card>

      {t.feedback && <FeedbackCard feedback={t.feedback} clbFromScore12={clbFromScore12} />}
    </>
  );
}
