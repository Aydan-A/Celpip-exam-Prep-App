import { color, fontWeight } from '../../design-system/index.js';

// A writing task laid out like the exam: the survey title, the situation, the
// instruction ("Write an email to … In your email:" or the task-wide survey
// line), and the bullet points the response must cover. `showOptions` lists
// the survey options as text (the task screen renders them as radio buttons).
export const optionName = (i) => `Option ${'AB'[i]}`;

export default function WritingPrompt({ item, task, showOptions = false, style }) {
  const instruction = item.instruction || (task && task.itemInstruction);
  return (
    <div style={{ lineHeight: 1.7, ...style }}>
      {item.title && <div style={{ fontWeight: fontWeight.bold, color: color.text, marginBottom: 4 }}>{item.title}</div>}
      <div>{item.prompt}</div>
      {instruction && <div style={{ marginTop: 10, fontWeight: fontWeight.bold, color: color.text }}>{instruction}</div>}
      {item.points && (
        <ul style={{ margin: '4px 0 0', paddingLeft: 20 }}>
          {item.points.map((p) => <li key={p}>{p}</li>)}
        </ul>
      )}
      {showOptions && item.options && (
        <ul style={{ margin: '4px 0 0', paddingLeft: 20 }}>
          {item.options.map((o, i) => <li key={i}>{optionName(i)}: {o}</li>)}
        </ul>
      )}
    </div>
  );
}
