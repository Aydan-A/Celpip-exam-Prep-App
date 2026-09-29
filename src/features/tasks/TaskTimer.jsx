import { Mono, Toggle, color } from '../../design-system/index.js';

// Countdown row for timed MCQ / writing tasks. Practice mode shows an on/off
// switch; in the full exam the clock lives in the exam bar instead.
export default function TaskTimer({ v, label = 'Countdown timer' }) {
  const t = v.taskState;
  if (v.isFull) return null;
  const clock = <Mono size={14} color={t.timeLeft < 60 ? color.danger : color.text}>{v.fmtTime(t.timeLeft)}</Mono>;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <Toggle label={label} checked={t.timerEnabled} onChange={v.handlers.toggleTimer} />
      {t.timerEnabled && clock}
    </div>
  );
}
