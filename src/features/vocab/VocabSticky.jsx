import { useState } from 'react';
import { color, shadow } from '../../design-system/index.js';

// Yellow sticky note beside a task with the user's notes for THIS question.
// They are kept in the collection on the profile and come back whenever the
// same question is practised again.
export default function VocabSticky({ vocab, onAdd, onDelete }) {
  const [word, setWord] = useState('');
  function submit(e) {
    e.preventDefault();
    onAdd(word);
    setWord('');
  }
  return (
    <aside style={{ flex: '1 1 240px', maxWidth: 420, minHeight: 220, position: 'sticky', top: 16, background: color.sticky, borderTop: `22px solid ${color.stickyEdge}`, borderRadius: 4, boxShadow: shadow.md, padding: '12px 14px 14px', transform: 'rotate(0.6deg)', color: color.stickyText }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase' }}>📌 My notes</div>
        <div style={{ fontSize: 12, opacity: 0.8 }}>{vocab.length} {vocab.length === 1 ? 'note' : 'notes'}</div>
      </div>
      <form onSubmit={submit} style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Add a note…"
          aria-label="New note"
          style={{ flex: 1, minWidth: 0, border: 'none', borderBottom: `2px solid ${color.stickyEdge}`, background: 'transparent', color: 'inherit', fontSize: 14, padding: '6px 2px', outline: 'none', fontFamily: 'inherit' }}
        />
        <button type="submit" disabled={!word.trim()} style={{ border: 'none', background: color.stickyEdge, color: 'inherit', fontWeight: 800, borderRadius: 4, padding: '0 10px', cursor: word.trim() ? 'pointer' : 'default', opacity: word.trim() ? 1 : 0.5 }}>+</button>
      </form>
      {vocab.length > 0 && (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxHeight: 360, overflowY: 'auto' }}>
          {vocab.map((w) => (
            <li key={w.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 14, lineHeight: '20px', padding: '4px 0', borderBottom: `1px solid ${color.stickyEdge}` }}>
              <span style={{ flex: 1, overflowWrap: 'anywhere' }}>{w.word}</span>
              <button onClick={() => onDelete(w.id)} aria-label={`Remove ${w.word}`} title="Remove" style={{ border: 'none', background: 'transparent', color: 'inherit', opacity: 0.55, cursor: 'pointer', fontSize: 14, lineHeight: '20px', padding: '0 2px' }}>×</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
