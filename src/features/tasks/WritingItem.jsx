import { Badge, Button, Card, Eyebrow, Heading, TextArea, Text, color, fontSize, fontWeight, lineHeight, radius } from '../../design-system/index.js';
import { GuideList } from '../practice/SectionGuide.jsx';
import TaskTimer from './TaskTimer.jsx';
import ItemFilter from './ItemFilter.jsx';

const countWords = (text) => (text.trim().match(/\S+/g) || []).length;

// Writing item, in reading order: the question (situation, the instruction
// and bullet points in a highlighted box, survey options as A/B cards), the
// response box with a word-count badge, then the task tips and a CLB 10–12
// model answer, each in its own card. In exam mode the tips and model answer
// stay hidden until time is up.
export default function WritingItem({ v }) {
  const { item, task, taskState: t, handlers } = v;
  const words = countWords(t.text);
  const saved = t.savedId && v.savedAnswers.find((a) => a.id === t.savedId);
  const upToDate = saved && saved.text === t.text && saved.choice === t.choice;
  const sampleUnlocked = v.isPractice || t.timeLeft === 0;
  const category = task.filter && item[task.filter.key];
  const instruction = item.instruction || task.itemInstruction;

  return (
    <>
      {v.isPractice && task.filter && <ItemFilter filter={task.filter} active={v.itemFilter} onPick={handlers.pickItemFilter} />}
      <TaskTimer v={v} label={`Countdown timer (${task.minutes} min)`} />

      <Card style={{ padding: 0, marginBottom: 16, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '10px 22px', background: color.surfaceSubtle, borderBottom: `1px solid ${color.divider}` }}>
          <Eyebrow>Question</Eyebrow>
          {category && <Badge tone="primary">{category}</Badge>}
        </div>
        <div style={{ padding: '20px 22px 22px' }}>
          {item.title && <Heading level="card" style={{ marginBottom: 10 }}>{item.title}</Heading>}
          <p style={{ margin: 0, fontSize: fontSize.lg, lineHeight: lineHeight.loose, color: color.text }}>{item.prompt}</p>

          {instruction && (
            <div style={{ marginTop: 16, padding: '14px 16px', background: color.primarySoft, borderLeft: `3px solid ${color.primary}`, borderRadius: radius.md }}>
              <div style={{ fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: color.text, lineHeight: lineHeight.normal }}>{instruction}</div>
              {item.points && (
                <ol style={{ margin: '8px 0 0', paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {item.points.map((p) => (
                    <li key={p} style={{ fontSize: fontSize.lg, color: color.text, lineHeight: lineHeight.normal }}>{p}</li>
                  ))}
                </ol>
              )}
            </div>
          )}

          {item.options && (
            <div role="radiogroup" aria-label="Survey options" style={{ display: 'grid', gap: 10, marginTop: 16 }}>
              {item.options.map((o, i) => (
                <ChoiceCard key={i} letter={'AB'[i]} text={o} selected={t.choice === i} onClick={() => handlers.chooseSurveyOption(i)} />
              ))}
            </div>
          )}
        </div>
      </Card>

      <Card style={{ padding: '16px 22px 18px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
          <Eyebrow>Your response</Eyebrow>
          <WordCount words={words} min={task.wordMin} max={task.wordMax} />
        </div>
        <TextArea placeholder="Write your response here…" value={t.text} onChange={handlers.onWritingText} minHeight={240} style={{ fontSize: fontSize.lg }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
          {v.isPractice && <Button variant="outline" size="sm" onClick={handlers.rerollItem}>🔀 Another task</Button>}
          <Button size="sm" onClick={handlers.saveWritingAnswer} disabled={!words || upToDate}>
            {upToDate ? '✓ Saved' : saved ? 'Update saved answer' : 'Save answer'}
          </Button>
        </div>
      </Card>

      {sampleUnlocked && (
        <Card style={{ padding: '18px 22px', marginBottom: 16 }}>
          <Heading level="section" style={{ marginBottom: 12 }}>How to score 10–12 on this task</Heading>
          <GuideList items={task.tips} />
        </Card>
      )}

      {sampleUnlocked && item.sample && (
        <Card style={{ padding: '18px 22px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
            <div>
              <Heading level="section" style={{ marginBottom: 4 }}>Model answer</Heading>
              <Text size="sm">Written to the CLB 10–12 standard for this exact task. Compare its structure with yours — don't memorise it.</Text>
            </div>
            <Button variant="outline" size="sm" onClick={handlers.toggleSample}>
              {t.showSample ? 'Hide model answer' : 'Show model answer'}
            </Button>
          </div>
          {t.showSample && <ModelAnswer item={item} task={task} />}
        </Card>
      )}
    </>
  );
}

// Live word count, coloured against the target range.
function WordCount({ words, min, max }) {
  const tone = !words ? 'neutral' : words < min ? 'warning' : words > max ? 'danger' : 'success';
  return <Badge tone={tone} mono>{words} / {min}–{max} words</Badge>;
}
