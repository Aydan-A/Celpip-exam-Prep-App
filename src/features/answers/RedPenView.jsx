import { Eyebrow, color, font, fontSize, radius } from '../../design-system/index.js';
import { wordDiff } from '../../lib/wordDiff.js';

// Teacher-style marking of an answer against the user's own improved version:
// changed words are circled with the fix written above in red, removed words
// are crossed out, and added words get a caret with the addition above.
// Ruby annotations keep each note above its word without overlapping.
export default function RedPenView({ original, improved, style }) {
  const parts = wordDiff(original, improved);
  const fixes = parts.filter((p) => p.type !== 'same').length;

  return (
    <div style={style}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
        <Eyebrow>Red-pen corrections</Eyebrow>
        <span style={{ fontSize: fontSize.sm, color: color.textMuted }}>
          {fixes ? `${fixes} correction${fixes > 1 ? 's' : ''}` : 'No changes'} · ◯ changed · <s>crossed</s> removed · ‸ added
        </span>
      </div>
      <div style={{ background: color.surface, border: `1px solid ${color.border}`, borderRadius: radius.md, padding: '14px 16px', fontSize: fontSize.lg, lineHeight: 2.4, color: color.text }}>
        {parts.map((p, i) => (
          <span key={i}>
            {i > 0 && ' '}
            <Part part={p} />
          </span>
        ))}
      </div>
    </div>
  );
}

const pen = { color: color.danger, fontFamily: font.hand, fontSize: fontSize.xl, fontWeight: 400, lineHeight: 1.1 };
const ruby = { rubyAlign: 'center' }; // don't spread short words under a long fix

function Part({ part }) {
  if (part.type === 'same') return part.text;
  if (part.type === 'delete') {
    return <span style={{ textDecoration: 'line-through', textDecorationColor: color.danger, textDecorationThickness: 2 }}>{part.from}</span>;
  }
  if (part.type === 'insert') {
    return (
      <ruby style={ruby}>
        <span style={{ color: color.danger, fontWeight: 700 }}>‸</span>
        <rt style={pen}>{part.to}</rt>
      </ruby>
    );
  }
  return (
    <ruby style={ruby}>
      <span style={{ border: `1.5px solid ${color.danger}`, borderRadius: 999, padding: '0 4px' }}>{part.from}</span>
      <rt style={pen}>{part.to}</rt>
    </ruby>
  );
}
