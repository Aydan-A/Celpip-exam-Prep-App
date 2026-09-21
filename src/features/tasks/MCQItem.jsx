import { Alert, Button, Card, Eyebrow, Mono, color, fontSize, radius, tone } from '../../design-system/index.js';
import TaskTimer from './TaskTimer.jsx';

// Listening / Reading item: a passage (or audio transcript) followed by
// multiple-choice questions. Scoring + timeout-save is handled in App.
export default function MCQItem({ v }) {
  const { item, taskState: t, section, handlers, clbFromPercent } = v;
  const isListening = section.id === 'listening';
  const total = item.questions.length;
  const correct = item.questions.filter((q, i) => t.answers[i] === q.correct).length;
  const answered = t.answers.filter((a) => a !== undefined && a !== null).length;
  const submitDisabled = answered < total;

  return (
    <>
      <TaskTimer v={v} />

      {/* Passage / transcript */}
      <Card style={{ padding: '20px 22px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <Eyebrow>{item.passageLabel}</Eyebrow>
          {item.youtube && (
            <a href={item.youtube} target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 700, color: color.danger, textDecoration: 'none' }}>▶ Listen on YouTube</a>
          )}
        </div>
        {isListening && !item.audio && (
          <Alert tone="warning" style={{ fontSize: 12, marginBottom: 12, lineHeight: 1.5 }}>
            Audio isn't attached to this item yet — read the transcript below to practice the questions.
          </Alert>
        )}
        {item.audio && <audio controls src={item.audio} style={{ width: '100%', marginBottom: 12 }} />}
        <div style={{ fontSize: 14, lineHeight: 1.75, color: color.textBody, whiteSpace: 'pre-line' }}>{item.passage}</div>
      </Card>

      {/* Questions */}
      {item.questions.map((q, qi) => {
        const userCorrect = t.answers[qi] === q.correct;
        return (
          <Card key={qi} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: fontSize.lg, fontWeight: 600, marginBottom: 12 }}>{qi + 1}. {q.text}</div>
            {q.options.map((optText, oi) => (
              <Option
                key={oi}
                text={optText}
                state={t.submitted ? (oi === q.correct ? 'correct' : t.answers[qi] === oi ? 'wrong' : 'idle') : t.answers[qi] === oi ? 'selected' : 'idle'}
                locked={t.submitted}
                onClick={() => handlers.selectOption(qi, oi)}
              />
            ))}
            {t.submitted && (
              <Alert tone={userCorrect ? 'success' : 'danger'} style={{ marginTop: 8, padding: '10px 12px', borderRadius: radius.md }}>
                {userCorrect ? 'Correct' : 'Incorrect'} — {q.explanation}
              </Alert>
            )}
          </Card>
        );
      })}

      {!t.submitted && (
        <Button onClick={handlers.submitMcq} disabled={submitDisabled} style={{ marginTop: 6, padding: '12px 22px' }}>
          Submit answers
        </Button>
      )}
      {t.submitted && (
        <div style={{ marginTop: 14, background: color.inverse, color: color.textOnInverse, borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>You scored {correct} / {total}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Mono size={13} style={{ background: color.surfaceOnInverse, padding: '5px 12px', borderRadius: radius.sm }}>Est. CLB {clbFromPercent(Math.round((correct / total) * 100))}</Mono>
            {v.isPractice && item && <Button variant="onInverse" size="sm" onClick={handlers.rerollItem}>🔀 Try another</Button>}
          </div>
        </div>
      )}
    </>
  );
}

// state: idle | selected | correct | wrong
const OPTION_STYLE = {
  idle: { bg: color.surface, border: color.borderStrong, dot: color.surface, dotBorder: color.textFaint, text: color.text },
  selected: { bg: tone.primary.bg, border: color.primary, dot: color.primary, dotBorder: color.primary, text: color.text },
  correct: { bg: tone.success.bg, border: color.success, dot: color.success, dotBorder: color.success, text: color.success },
  wrong: { bg: tone.danger.bg, border: color.danger, dot: color.danger, dotBorder: color.danger, text: color.danger },
};

function Option({ text, state, locked, onClick }) {
  const s = OPTION_STYLE[state];
  return (
    <div
      onClick={onClick}
      className={locked ? undefined : 'ds-focusable'}
      role="radio"
      aria-checked={state === 'selected'}
      tabIndex={locked ? -1 : 0}
      onKeyDown={(e) => { if (!locked && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick(); } }}
      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: radius.md, border: `1px solid ${s.border}`, background: s.bg, marginBottom: 8, cursor: locked ? 'default' : 'pointer' }}
    >
      <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${s.dotBorder}`, background: s.dot, flex: 'none' }} />
      <div style={{ fontSize: fontSize.md, color: s.text }}>{text}</div>
    </div>
  );
}
