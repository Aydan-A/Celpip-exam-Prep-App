import { BackLink, Button, Heading, Text, color, fontSize } from '../../design-system/index.js';
import ExamBar from '../exam/ExamBar.jsx';
import MCQItem from './MCQItem.jsx';
import WritingItem from './WritingItem.jsx';
import SpeakingItem from './SpeakingItem.jsx';

// Why Continue is still locked, per task kind.
const CONTINUE_HINT = {
  mcq: 'Submit your answers to continue.',
  writing: 'Write your response to continue.',
  speaking: 'Finish your response to continue.',
};

// A single task instance. Renders shared chrome (the exam bar or a back link,
// the task heading + instructions) then dispatches on the task's `kind`.
export default function TaskScreen({ v }) {
  const { section, task, taskState } = v;
  if (!section || !task || !taskState) return null;

  return (
    <>
      {v.isFull && <ExamBar v={v} />}
      {v.isPractice && <BackLink onClick={v.goTaskList}>{section.name} tasks</BackLink>}

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '6px 0 4px', flexWrap: 'wrap' }}>
        <Heading style={{ fontSize: 22 }}>{task.name}</Heading>
        {v.isPractice && <div style={{ fontSize: fontSize.sm, color: color.textMuted }}>{section.name}</div>}
      </div>
      <Text style={{ lineHeight: 1.6, marginBottom: 18 }}>{task.instructions}</Text>

      {task.kind === 'mcq' && <MCQItem v={v} />}
      {task.kind === 'writing' && <WritingItem v={v} />}
      {task.kind === 'speaking' && <SpeakingItem v={v} />}

      {v.isFull && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 14, flexWrap: 'wrap', marginTop: 20 }}>
          {v.continueDisabled && <div style={{ fontSize: fontSize.sm, color: color.textMuted }}>{CONTINUE_HINT[task.kind]}</div>}
          <Button size="lg" onClick={v.continueExam} disabled={v.continueDisabled}>{v.continueBtnLabel}</Button>
        </div>
      )}
    </>
  );
}
