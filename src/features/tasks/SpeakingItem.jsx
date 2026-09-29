import { Alert, Badge, BulletList, Button, Card, CopyButton, Eyebrow, Mono, ProgressBar, TextArea, color, fontSize, radius, tone } from '../../design-system/index.js';
import { canTranscribe } from '../../lib/recorder.js';
import VocabSticky from '../vocab/VocabSticky.jsx';
import ItemFilter from './ItemFilter.jsx';
import ScoreSelect from '../answers/ScoreSelect.jsx';
import RedPenView from '../answers/RedPenView.jsx';

// Speaking item. Flow: idle → prep → response → review.
// Issue #6: a notepad is shown for the prep note, and the prep timer starts the
// moment the user begins typing (or via the Start button). During the
// response the microphone records and (where supported) transcribes live; the
// review shows the recording, the editable transcript, an improved-answer box
// and a self-given CELPIP score, all saved together. In practice the
// question's own sticky notes sit on the right.
export default function SpeakingItem({ v }) {
  const { item, task, taskState: t, handlers, fmtTime } = v;

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ flex: '999 1 520px', minWidth: 0 }}>
        {v.isPractice && task.filter && <ItemFilter filter={task.filter} active={v.itemFilter} onPick={handlers.pickItemFilter} />}
        <Card style={{ padding: '20px 22px', marginBottom: 16 }}>
          {/* Prompt header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <Eyebrow>{item.image ? 'Picture' : 'Question'} · {task.prepSec}s prep · {task.responseSec}s speak</Eyebrow>
              {task.filter && item[task.filter.key] && <Badge tone="primary">{item[task.filter.key]}</Badge>}
            </div>
            {v.isPractice && t.phase === 'idle' && item && (
              <Button variant="outline" size="sm" onClick={handlers.rerollItem} style={{ padding: '10px 16px' }}>🔀 {item.image ? 'New picture' : 'New question'}</Button>
            )}
          </div>

          {item.image && (
            <img src={item.image} alt="Picture to describe" style={{ display: 'block', width: '100%', maxWidth: 640, margin: '0 auto 16px', borderRadius: 10, border: `1px solid ${color.border}` }} />
          )}
          {item.prompt && <div style={{ fontSize: 14, lineHeight: 1.7, color: color.textBody, marginBottom: 18 }}>{item.prompt}</div>}

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
              <MicStatus t={t} />
              {t.recording && canTranscribe && (
                <div style={{ marginTop: 12, minHeight: 60, fontSize: fontSize.md, lineHeight: 1.6, color: t.transcript ? color.textBody : color.textFaint, background: color.surfaceSubtle, border: `1px solid ${color.border}`, borderRadius: radius.md, padding: '12px 14px' }}>
                  {t.transcript || 'Start speaking — your words will appear here…'}
                </div>
              )}
              {t.notes && <Notes text={t.notes} style={{ marginTop: 16 }} />}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                {v.isPractice && <Button variant="outline" onClick={handlers.retryTask}>↻ Start over</Button>}
                <Button onClick={handlers.endSpeakingResponse}>I'm done →</Button>
              </div>
            </>
          )}

          {/* Review phase */}
          {t.phase === 'review' && (
            <>
              <div style={{ textAlign: 'center', padding: '6px 0 14px' }}>
                <Eyebrow color={color.success} style={{ fontSize: 12 }}>{t.endedEarly ? 'You stopped — response finished' : "Time's up — response finished"}</Eyebrow>
              </div>
              {t.notes && <Notes text={t.notes} style={{ marginBottom: 14 }} />}
              <Review v={v} />
              {v.isPractice && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <Button variant="danger" onClick={handlers.deleteSpeakingAttempt} disabled={t.recording}>🗑 Delete recording</Button>
                  <Button variant="outline" onClick={handlers.retryTask}>↻ Try this question again</Button>
                  <Button onClick={handlers.rerollItem}>🔀 New question</Button>
                </div>
              )}
            </>
          )}
        </Card>

        {task.tips && (
          <Card style={{ padding: '18px 22px', marginBottom: 16 }}>
            <Eyebrow style={{ marginBottom: 8 }}>Tips for this task</Eyebrow>
            <BulletList items={task.tips} />
          </Card>
        )}
      </div>
      {v.isPractice && <VocabSticky vocab={v.vocab.filter((w) => w.taskId === task.id && w.itemId === item.id)} onAdd={v.addVocab} onDelete={v.deleteVocab} />}
    </div>
  );
}

function MicStatus({ t }) {
  if (t.micError) return <Alert tone="danger" style={{ marginTop: 14 }}>🎙 {t.micError}</Alert>;
  if (!t.recording) return <div style={{ textAlign: 'center', marginTop: 12, fontSize: fontSize.sm, color: color.textMuted }}>Starting microphone…</div>;
  return (
    <div style={{ textAlign: 'center', marginTop: 12, fontSize: fontSize.sm, fontWeight: 700, color: color.danger }}>
      ● Recording{canTranscribe ? ' · speech-to-text on' : ' · speech-to-text is not supported in this browser (audio only)'}
    </div>
  );
}

// Recording playback + editable transcript + save.
function Review({ v }) {
  const { taskState: t, handlers } = v;
  const saved = t.savedId && v.savedAnswers.find((a) => a.id === t.savedId);
  const same = (stored, live) => (stored || '') === (live.trim() ? live : '');
  const upToDate = saved && saved.text === t.transcript && same(saved.improved, t.improved) && same(saved.model, t.model) && (saved.score || null) === t.score;
  const hasSomething = !!(t.transcript.trim() || t.audioBlob || t.improved.trim() || t.model.trim());
  const words = (t.transcript.trim().match(/\S+/g) || []).length;
  return (
    <div style={{ marginBottom: 14 }}>
      {t.audioUrl && (
        <>
          <Eyebrow style={{ marginBottom: 6 }}>Your recording</Eyebrow>
          <audio controls src={t.audioUrl} style={{ width: '100%', marginBottom: 12 }} />
        </>
      )}
      {t.recording && <div style={{ fontSize: fontSize.sm, color: color.textMuted, marginBottom: 10 }}>Finishing the recording…</div>}
      <Eyebrow style={{ marginBottom: 6 }}>What you said {canTranscribe ? '(fix any words the transcript got wrong)' : ''}</Eyebrow>
      <TextArea
        placeholder={canTranscribe ? 'No speech was picked up.' : 'Speech-to-text is not supported in this browser — type what you said if you want to keep it.'}
        value={t.transcript}
        onChange={handlers.onTranscriptChange}
        minHeight={120}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, margin: '8px 0 16px' }}>
        <div style={{ fontSize: 12, color: color.textMuted }}>{words} words</div>
        <CopyButton text={t.transcript} />
      </div>

      <Eyebrow style={{ marginBottom: 6 }}>Improved answer</Eyebrow>
      <TextArea
        placeholder="Write or paste a better version of your answer here…"
        value={t.improved}
        onChange={handlers.onImprovedChange}
        minHeight={140}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, margin: '8px 0 16px' }}>
        <div style={{ fontSize: 12, color: color.textMuted }}>{countWords(t.improved)} words</div>
        <CopyButton text={t.improved} />
      </div>
      {t.transcript.trim() && t.improved.trim() && <RedPenView original={t.transcript} improved={t.improved} style={{ marginBottom: 16 }} />}

      <Eyebrow style={{ marginBottom: 6 }}>CELPIP 11–12 answer</Eyebrow>
      <TextArea
        placeholder="Paste or write a level 11–12 answer to this question to learn from…"
        value={t.model}
        onChange={handlers.onModelChange}
        minHeight={140}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, margin: '8px 0 16px' }}>
        <div style={{ fontSize: 12, color: color.textMuted }}>{countWords(t.model)} words</div>
        <CopyButton text={t.model} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap', borderTop: `1px solid ${color.divider}`, paddingTop: 12 }}>
        <ScoreSelect value={t.score} onChange={handlers.onScoreChange} />
        <Button size="sm" onClick={handlers.saveSpeakingAnswer} disabled={!hasSomething || upToDate || t.recording}>
          {upToDate ? '✓ Saved' : saved ? 'Update saved answer' : 'Save answer'}
        </Button>
      </div>
    </div>
  );
}

const countWords = (text) => (text.trim().match(/\S+/g) || []).length;

function Notes({ text, style }) {
  return (
    <div style={{ fontSize: 13, lineHeight: 1.6, color: color.textSecondary, background: color.surfaceSubtle, border: `1px solid ${color.border}`, borderRadius: radius.md, padding: '12px 14px', whiteSpace: 'pre-line', ...style }}>
      <Eyebrow style={{ marginBottom: 6 }}>Your notes</Eyebrow>
      {text}
    </div>
  );
}
