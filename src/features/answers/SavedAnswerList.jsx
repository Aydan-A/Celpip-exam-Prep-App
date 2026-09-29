import { useEffect, useState } from 'react';
import { Badge, Button, Card, CopyButton, Eyebrow, List, TextArea, color, font, fontSize, fontWeight } from '../../design-system/index.js';
import { getAudio } from '../../lib/audioStore.js';
import WritingPrompt, { optionName } from '../tasks/WritingPrompt.jsx';
import ScoreSelect from './ScoreSelect.jsx';
import RedPenView from './RedPenView.jsx';
import { clbBandInfo } from '../../lib/clb.js';

const countWords = (text) => (text.trim().match(/\S+/g) || []).length;

// Saved writing / speaking answers, newest first. Click a row to open it:
// read the task, play the recording, edit the answer, compare it with the
// suggested (model) answer, write an improved version (marked in red pen
// against the answer), add a CELPIP 11–12 answer, copy any of them, or delete.
export default function SavedAnswerList({ sections, answers, onUpdate, onDelete, showSection = false }) {
  const rows = answers
    .map((a) => {
      for (const sec of sections) {
        const task = sec.tasks.find((t) => t.id === a.taskId);
        if (task) return { a, sec, task, item: task.bank.find((b) => b.id === a.itemId) };
      }
      return null;
    })
    .filter(Boolean);

  if (!rows.length) {
    return (
      <Card style={{ padding: '14px 20px', fontSize: fontSize.sm, color: color.textSecondary }}>
        Nothing saved yet. Use “Save answer” on a writing or speaking task — answers in a full mock are saved automatically.
      </Card>
    );
  }

  return (
    <List>
      {rows.map((row, i) => (
        <AnswerRow key={row.a.id} {...row} last={i === rows.length - 1} showSection={showSection} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </List>
  );
}

function AnswerRow({ a, sec, task, item, last, showSection, onUpdate, onDelete }) {
  const speaking = task.kind === 'speaking';
  function remove() {
    if (window.confirm('Delete this saved answer? This cannot be undone.')) onDelete(a.id);
  }

  return (
    <details style={{ padding: '12px 20px', borderBottom: last ? 'none' : `1px solid ${color.divider}` }}>
      <summary style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: fontSize.md, fontWeight: fontWeight.bold, flex: 1, minWidth: 180 }}>
          {showSection && <span style={{ color: color.textMuted, fontWeight: fontWeight.medium }}>{sec.name} · </span>}
          {task.name}
        </span>
        <span style={{ fontSize: fontSize.sm, fontFamily: font.mono, color: color.textMuted }}>
          {new Date(a.date).toLocaleDateString()} · {a.words} words{a.audio ? ' · 🎙' : ''}{a.edited ? ' · edited' : ''}{a.improved ? ' · ✎ rewrite' : ''}{a.model ? ' · ★ 11–12' : ''}
        </span>
        {a.score && <Badge tone={clbBandInfo(a.score)} mono>Level {a.score}</Badge>}
      </summary>

      {item && item.image && <img src={item.image} alt="Task picture" style={{ display: 'block', width: '100%', maxWidth: 360, borderRadius: 8, border: `1px solid ${color.border}`, margin: '10px 0 8px' }} />}
      {item && item.prompt && <WritingPrompt item={item} task={task} showOptions style={{ fontSize: fontSize.sm, color: color.textSecondary, margin: '10px 0 8px' }} />}
      {item && item.options && a.choice != null && <Badge tone="primary" style={{ marginBottom: 8 }}>Chose {optionName(a.choice)}</Badge>}
      {a.audio && <SavedAudio id={a.id} />}

      <EditableText
        label="Your answer"
        value={a.text || ''}
        task={task}
        empty="No text saved."
        editLabel="✏️ Edit"
        onSave={(val) => onUpdate(a.id, 'text', val)}
      />

      {speaking && (
        <div style={{ marginTop: 12 }}>
          <ScoreSelect value={a.score} onChange={(e) => onUpdate(a.id, 'score', Number(e.target.value) || undefined)} />
        </div>
      )}

      {!speaking && <SuggestedAnswer item={item} />}

      <EditableText
        label="Your improved version"
        hint={speaking ? 'Write a better version of what you said — then practise saying it.' : 'Rewrite your answer using the model answer and tips — then compare the two.'}
        value={a.improved || ''}
        task={task}
        empty="Not written yet."
        editLabel={a.improved ? '✏️ Edit rewrite' : '✍️ Write an improved version'}
        startFrom={a.text || ''}
        onSave={(val) => onUpdate(a.id, 'improved', val)}
      />

      {a.text && a.improved && <RedPenView original={a.text} improved={a.improved} style={{ marginTop: 16 }} />}

      <EditableText
        label="CELPIP 11–12 answer"
        hint="Paste or write a level 11–12 answer to this question to learn from."
        value={a.model || ''}
        task={task}
        empty="Not added yet."
        editLabel={a.model ? '✏️ Edit 11–12 answer' : '➕ Add an 11–12 answer'}
        onSave={(val) => onUpdate(a.id, 'model', val)}
      />

      <div style={{ borderTop: `1px solid ${color.divider}`, marginTop: 14, paddingTop: 12 }}>
        <Button variant="danger" size="sm" onClick={remove}>Delete answer</Button>
      </div>
    </details>
  );
}

// A labelled text block that switches to a text box for editing.
// `startFrom` pre-fills an empty value (the rewrite starts from the original).
function EditableText({ label, hint, value, task, empty, editLabel, startFrom, onSave }) {
  const [draft, setDraft] = useState(null); // null = not editing
  const editing = draft !== null;
  return (
    <div style={{ marginTop: 12 }}>
      <Eyebrow style={{ marginBottom: 6 }}>{label}</Eyebrow>
      {hint && !value && !editing && <div style={{ fontSize: fontSize.sm, color: color.textSecondary, marginBottom: 8 }}>{hint}</div>}
      {editing ? (
        <>
          <TextArea value={draft} onChange={(e) => setDraft(e.target.value)} minHeight={task.kind === 'writing' ? 240 : 120} style={{ marginBottom: 6 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: color.textMuted }}>
              {countWords(draft)} words{task.wordMin ? ` · target ${task.wordMin}–${task.wordMax}` : ''}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="secondary" size="sm" onClick={() => setDraft(null)}>Cancel</Button>
              <Button size="sm" onClick={() => { onSave(draft); setDraft(null); }} disabled={draft === value}>Save changes</Button>
            </div>
          </div>
        </>
      ) : (
        <>
          {value
            ? <TextBox>{value}</TextBox>
            : hint ? null : <div style={{ fontSize: fontSize.sm, color: color.textMuted, marginBottom: 8 }}>{empty}</div>}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button variant="outline" size="sm" onClick={() => setDraft(value || startFrom || '')}>{editLabel}</Button>
            {value && <CopyButton text={value} />}
          </div>
        </>
      )}
    </div>
  );
}

// The CLB 10–12 model answer for the same question, when one exists.
function SuggestedAnswer({ item }) {
  const [open, setOpen] = useState(false);
  const sample = item && item.sample;
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
        <Eyebrow>Suggested answer</Eyebrow>
        {sample && <Badge tone="success" mono>CLB 10–12 · {countWords(sample)} words</Badge>}
        {sample && item.options && item.sampleChoice != null && <Badge tone="primary">Chose {optionName(item.sampleChoice)}</Badge>}
      </div>
      {sample ? (
        <>
          {open && <TextBox tone="success">{sample}</TextBox>}
          <Button variant="outline" size="sm" onClick={() => setOpen((x) => !x)}>{open ? 'Hide suggested answer' : 'Show suggested answer'}</Button>
        </>
      ) : (
        <div style={{ fontSize: fontSize.sm, color: color.textMuted }}>No model answer for this question yet.</div>
      )}
    </div>
  );
}

function TextBox({ tone, children }) {
  return (
    <div style={{ whiteSpace: 'pre-wrap', fontSize: fontSize.md, lineHeight: 1.7, color: color.textBody, background: tone === 'success' ? color.successSoft : color.surfaceSubtle, borderRadius: 8, padding: '12px 14px', marginBottom: 8 }}>
      {children}
    </div>
  );
}

// Loads a saved recording from IndexedDB.
function SavedAudio({ id }) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    let objectUrl = null;
    getAudio(id).then((blob) => {
      if (blob) setUrl((objectUrl = URL.createObjectURL(blob)));
    }).catch(() => {});
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [id]);
  return url ? <audio controls src={url} style={{ width: '100%', margin: '6px 0' }} /> : null;
}
