import { font, fontSize, fontWeight, radius, tone as tones, color } from '../tokens.js';

// Small coloured label. `tone` is a key of tokens.tone or a {color, bg} object
// (e.g. sectionTone.reading). `mono` for scores / codes like "CLB 9".
export default function Badge({ tone = 'neutral', mono = false, size = 'sm', style, children, ...rest }) {
  const t = typeof tone === 'string' ? tones[tone] : tone;
  const big = size === 'md';
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: mono ? font.mono : undefined,
        fontSize: big ? fontSize.sm : fontSize.xs,
        fontWeight: fontWeight.bold,
        lineHeight: 1.4,
        padding: big ? '4px 10px' : '3px 8px',
        borderRadius: big ? radius.sm : radius.sm - 1,
        background: t.bg,
        color: t.color,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}

// Neutral, regular-weight chip for lists of criteria, survey options, etc.
export function Tag({ style, children, ...rest }) {
  return (
    <span
      style={{ fontSize: fontSize.sm, background: color.surfaceMuted, color: color.text, padding: '6px 11px', borderRadius: radius.md - 1, lineHeight: 1.4, ...style }}
      {...rest}
    >
      {children}
    </span>
  );
}
