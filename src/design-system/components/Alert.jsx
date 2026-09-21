import { fontSize, lineHeight, radius, tone as tones } from '../tokens.js';

// Inline message box. tone: warning | danger | success | primary
export default function Alert({ tone = 'warning', style, children }) {
  const t = tones[tone];
  return (
    <div style={{ fontSize: fontSize.sm, lineHeight: lineHeight.relaxed, background: t.bg, color: t.text || t.color, padding: '9px 12px', borderRadius: radius.md - 1, ...style }}>
      {children}
    </div>
  );
}
