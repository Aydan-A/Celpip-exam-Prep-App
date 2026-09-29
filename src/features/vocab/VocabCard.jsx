import { useState } from 'react';
import { Button, Card, CopyButton, Heading, TextInput, color, fontSize } from '../../design-system/index.js';
import { SECTION_LIST } from '../../data/index.js';

const tasks = new Map(SECTION_LIST.flatMap((sec) => sec.tasks.map((t) => [t.id, { sec, task: t }])));

// The question a note belongs to: a label and the question text (or picture).
function questionOf(w) {
  const found = w.taskId && tasks.get(w.taskId);
  if (!found) return { label: 'General notes' };
  const { sec, task } = found;
  const index = task.bank.findIndex((b) => b.id === w.itemId);
  const item = task.bank[index];
  return { label: `${sec.name} · ${task.name}${index >= 0 ? ` · #${index + 1}` : ''}`, prompt: item && item.prompt, image: item && item.image };
}

// Group notes by question, keeping the order of the newest note in each.
function groupByQuestion(notes) {
  const groups = new Map();
  for (const w of notes) {
    const key = `${w.taskId || ''}|${w.itemId || ''}`;
    if (!groups.has(key)) groups.set(key, { key, question: questionOf(w), notes: [] });
    groups.get(key).notes.push(w);
  }
  return [...groups.values()];
}

// Profile: every note the user collected, grouped by question, with search,
// add (general notes), copy and remove.
export default function VocabCard({ vocab, onAdd, onDelete, style }) {
  const [query, setQuery] = useState('');
  const [word, setWord] = useState('');
  const q = query.trim().toLowerCase();
  const shown = q ? vocab.filter((w) => w.word.toLowerCase().includes(q)) : vocab;
  const groups = groupByQuestion(shown);
  const allText = groupByQuestion(vocab).map((g) => [g.question.prompt || g.question.label, ...g.notes.map((w) => `- ${w.word}`)].join('\n')).join('\n\n');

  function add(e) {
    e.preventDefault();
    onAdd(word);
    setWord('');
  }

  return (
    <Card padding="lg" style={style}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
        <Heading level="section">📌 My notes <span style={{ color: color.textMuted, fontWeight: 500 }}>({vocab.length})</span></Heading>
        <CopyButton text={allText} label="📋 Copy all" />
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
        <form onSubmit={add} style={{ display: 'flex', gap: 8, flex: '1 1 260px' }}>
          <TextInput value={word} onChange={(e) => setWord(e.target.value)} placeholder="Add a general note…" aria-label="New general note" />
          <Button type="submit" disabled={!word.trim()}>Add</Button>
        </form>
        {vocab.length > 5 && (
          <TextInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" aria-label="Search notes" style={{ flex: '0 1 220px' }} />
        )}
      </div>

      {vocab.length === 0 ? (
        <div style={{ fontSize: fontSize.sm, color: color.textSecondary }}>
          No notes yet. Add them on the yellow sticky note while you practise a speaking question — they're saved under that question here.
        </div>
      ) : shown.length === 0 ? (
        <div style={{ fontSize: fontSize.sm, color: color.textSecondary }}>No notes match “{query}”.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {groups.map((g) => (
            <div key={g.key} style={{ borderTop: `1px solid ${color.border}`, paddingTop: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: color.textMuted, marginBottom: 4 }}>{g.question.label}</div>
              {g.question.prompt && <div style={{ fontSize: fontSize.sm, lineHeight: 1.6, color: color.textBody, marginBottom: 8 }}>{g.question.prompt}</div>}
              {g.question.image && <img src={g.question.image} alt="Question picture" style={{ display: 'block', width: 160, borderRadius: 6, border: `1px solid ${color.border}`, marginBottom: 8 }} />}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {g.notes.map((w) => (
                  <span key={w.id} title={new Date(w.date).toLocaleDateString()} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: color.sticky, color: color.stickyText, borderRadius: 4, padding: '5px 6px 5px 10px', fontSize: fontSize.sm, fontWeight: 600, overflowWrap: 'anywhere' }}>
                    {w.word}
                    <button onClick={() => onDelete(w.id)} aria-label={`Remove ${w.word}`} title="Remove" style={{ border: 'none', background: 'transparent', color: 'inherit', opacity: 0.55, cursor: 'pointer', fontSize: 14, padding: '0 2px' }}>×</button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
