import { BackLink, Button, Heading, Text, color, fontSize } from '../../design-system/index.js';
import MCQItem from './MCQItem.jsx';
import WritingItem from './WritingItem.jsx';
import SpeakingItem from './SpeakingItem.jsx';

// A single task instance. Renders shared chrome (exam progress or a back link,
// the task heading + instructions) then dispatches on the task's `kind`.
export default function TaskScreen({ v }) {
  const { section, task, taskState } = v;
  if (!section || !task || !taskState) return null;

  return (
    <>
      {v.isFull && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: fontSize.sm, fontWeight: 700, color: color.primary }}>
            FULL EXAM · TASK {v.examStep} OF {v.examTotal}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: color.textMuted }}>{section.name}</div>
        </div>
      )}
      {v.isPractice && <BackLink onClick={v.goTaskList}>{section.name} tasks</BackLink>}

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '6px 0 4px', flexWrap: 'wrap' }}>
        <Heading style={{ fontSize: 22 }}>{task.name}</Heading>
        <div style={{ fontSize: fontSize.sm, color: color.textMuted }}>{section.name}</div>
      </div>
      <Text style={{ lineHeight: 1.6, marginBottom: 18 }}>{task.instructions}</Text>

      {task.kind === 'mcq' && <MCQItem v={v} />}
      {task.kind === 'writing' && <WritingItem v={v} />}
      {task.kind === 'speaking' && <SpeakingItem v={v} />}

      {v.isFull && (
        <Button block size="lg" onClick={v.continueExam} disabled={v.continueDisabled} style={{ marginTop: 16, padding: '14px 0', fontSize: 14.5 }}>
          {v.continueBtnLabel}
        </Button>
      )}
    </>
  );
}
