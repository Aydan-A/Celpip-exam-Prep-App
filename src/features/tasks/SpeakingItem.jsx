import { Alert, Button, Card, Eyebrow, Mono, ProgressBar, TextArea, color, fontSize, radius, tone } from '../../design-system/index.js';
import FeedbackCard from './FeedbackCard.jsx';

// Speaking item. Flow: idle → prep → response → review.
// Issue #6: a notepad is shown for the prep note, and the prep timer starts the
// moment the user begins typing (or via the Start button).
export default function SpeakingItem({ v }) {
  const { item, task, taskState: t, handlers, fmtTime, clbFromScore12 } = v;

  return (
    <>
      <Card style={{ padding: '20px 22px', marginBottom: 16 }}>
        {/* Prompt header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <Eyebrow>Prompt · {task.prepSec}s prep · {task.responseSec}s speak</Eyebrow>
          {v.isPractice && t.phase === 'idle' && item && (
            <Button variant="outline" size="sm" onClick={handlers.rerollItem} style={{ padding: '10px 16px' }}>🔀 New question</Button>
          )}
        </div>

        {item.image && <img src={item.image} alt="Speaking prompt" style={{ width: '100%', borderRadius: 10, marginBottom: 12 }} />}
        <div style={{ fontSize: 14, lineHeight: 1.7, color: color.textBody, marginBottom: 18 }}>{item.prompt}</div>

        {/* Prep phase (idle + prep both show the notepad) */}
        {(t.phase === 'idle' || t.phase === 'prep') && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <Eyebrow color={color.warning} style={{ fontSize: 12 }}>
                Notepad {t.phase === 'idle' ? '· timer starts when you begin typing' : ''}
              </Eyebrow>
              <Mono size={20} color={t.phase === 'prep' ? color.text : color.textFaint}>{fmtTime(t.prepLeft)}</Mono>
            </div>
            <TextArea
              placeholder="Jot down your key points here… (this is your 30-second note — the prep countdown begins as soon as you type)"
              value={t.notes}
              onChange={handlers.onNotesChange}
            />
            {t.phase === 'prep' && <ProgressBar value={t.prepLeft / task.prepSec} tone={tone.warning} style={{ margin: '10px 0 14px' }} />}
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              {t.phase === 'idle' && <Button onClick={handlers.startSpeakingPrep}>Start prep timer ({task.prepSec}s)</Button>}
              <Button variant={t.phase === 'idle' ? 'outline' : 'primary'} onClick={handlers.startSpeakingResponse}>Start speaking now →</Button>
            </div>
          </>
        )}

        {/* Response phase */}
        {t.phase === 'response' && (
          <>
            <div style={{ textAlign: 'center', padding: '10px 0 4px' }}>
              <Eyebrow color={color.success} style={{ fontSize: 12, marginBottom: 8 }}>Speak now</Eyebrow>
              <Mono size="display" color={color.text}>{fmtTime(t.respLeft)}</Mono>
              <ProgressBar value={t.respLeft / task.responseSec} tone={tone.success} style={{ margin: '14px auto 0', maxWidth: 320 }} />
            </div>
            {t.notes && <Notes text={t.notes} style={{ marginTop: 16 }} />}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
              <Button onClick={handlers.endSpeakingResponse}>I'm done →</Button>
            </div>
          </>
        )}

        {/* Review phase */}
        {t.phase === 'review' && (
          <>
            {t.notes && <Notes text={t.notes} style={{ marginBottom: 14 }} />}
            <Eyebrow style={{ marginBottom: 8 }}>Paste your spoken transcript</Eyebrow>
            <TextArea placeholder="Type or paste what you said so it can be scored…" value={t.transcript} onChange={handlers.onTranscriptChange} minHeight={140} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <Button onClick={handlers.getSpeakingFeedback} disabled={t.loading} style={{ fontSize: 13 }}>
                {t.loading ? 'Scoring…' : 'Get AI Feedback'}
              </Button>
            </div>
            {t.error && <Alert tone="danger" style={{ marginTop: 10 }}>{t.error}</Alert>}
          </>
        )}
      </Card>

      {t.feedback && <FeedbackCard feedback={t.feedback} clbFromScore12={clbFromScore12} />}
    </>
  );
}

function Notes({ text, style }) {
  return (
    <div style={{ fontSize: 13, lineHeight: 1.6, color: color.textSecondary, background: color.surfaceSubtle, border: `1px solid ${color.border}`, borderRadius: radius.md, padding: '12px 14px', whiteSpace: 'pre-line', ...style }}>
      <Eyebrow style={{ marginBottom: 6 }}>Your notes</Eyebrow>
      {text}
    </div>
  );
}
