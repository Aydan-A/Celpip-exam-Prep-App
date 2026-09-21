import { Mono, Toggle, color } from '../../design-system/index.js';

// Countdown row for timed MCQ / writing tasks. Practice mode shows an on/off
// switch; in the full exam the timer always runs.
export default function TaskTimer({ v, label = 'Countdown timer' }) {
  const t = v.taskState;
  const clock = <Mono size={14} color={t.timeLeft < 60 ? color.danger : color.text}>{v.fmtTime(t.timeLeft)}</Mono>;
  if (v.isFull) return <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>{clock}</div>;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <Toggle label={label} checked={t.timerEnabled} onChange={v.handlers.toggleTimer} />
      {t.timerEnabled && clock}
    </div>
  );
}
