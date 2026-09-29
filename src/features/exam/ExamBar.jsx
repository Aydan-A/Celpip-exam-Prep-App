import { Badge, Button, Mono, ProgressBar, color, fontSize, fontWeight, layout, radius, shadow } from '../../design-system/index.js';

// Sticky header for the full exam / section run: where you are, how far
// through, the task clock (MCQ + writing; speaking shows its own, video mocks run at
// the video's pace), and exit.
export default function ExamBar({ v }) {
  const { section, taskState: t } = v;
  const accent = v.sectionStyle[section.id];
  const hasClock = !!t && (t.kind === 'mcq' || t.kind === 'writing');
  return (
    <div
      style={{
        position: 'sticky',
        top: layout.navHeight + 8,
        zIndex: 10,
        background: color.surface,
        border: `1px solid ${color.border}`,
        borderRadius: radius.lg,
        boxShadow: shadow.sm,
        padding: '12px 18px',
        marginBottom: 20,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <Badge tone={accent}>{section.name}</Badge>
          <div style={{ fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: color.textSecondary, whiteSpace: 'nowrap' }}>
            {v.examScope ? 'Part' : 'Task'} {v.examStep} of {v.examTotal}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {hasClock && <Mono size={15} color={t.timeLeft < 60 ? color.danger : color.text}>{v.fmtTime(t.timeLeft)}</Mono>}
          <Button variant="ghost" onClick={v.exitExam} style={{ fontSize: fontSize.sm, fontWeight: fontWeight.medium }}>Exit</Button>
        </div>
      </div>
      <ProgressBar value={v.examStep / v.examTotal} tone={accent} height={4} />
    </div>
  );
}
