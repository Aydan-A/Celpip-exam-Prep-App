import { color, fontSize, fontWeight, lineHeight } from '../tokens.js';

// Uppercase overline label ("SCORING CRITERIA", "FULL EXAM MODE").
export function Eyebrow({ color: c = color.textMuted, style, children }) {
  return (
    <div style={{ fontSize: fontSize.xs, fontWeight: fontWeight.bold, letterSpacing: '0.05em', textTransform: 'uppercase', color: c, ...style }}>
      {children}
    </div>
  );
}

// level: page (screen title) | hero (centred screen title) | card | section
const HEADING = {
  hero: { fontSize: fontSize['4xl'], letterSpacing: '-0.3px' },
  page: { fontSize: fontSize['3xl'], letterSpacing: '-0.3px' },
  card: { fontSize: fontSize.xl },
  section: { fontSize: 15 },
};
export function Heading({ level = 'page', style, children }) {
  return <div style={{ fontWeight: fontWeight.bold, lineHeight: lineHeight.tight, ...HEADING[level], ...style }}>{children}</div>;
}

// Secondary paragraph copy.
export function Text({ size = 'md', muted = true, style, children }) {
  return (
    <div style={{ fontSize: fontSize[size], color: muted ? color.textSecondary : color.text, lineHeight: lineHeight.normal, ...style }}>
      {children}
    </div>
  );
}

// Title + optional subtitle + optional right-hand actions.
export function PageHeader({ title, subtitle, eyebrow, actions, centered = false, level, style }) {
  return (
    <div style={{ textAlign: centered ? 'center' : undefined, marginBottom: 20, ...style }}>
      {eyebrow && <Eyebrow color={color.primary} style={{ fontSize: 12, marginBottom: 8, letterSpacing: '0.06em' }}>{eyebrow}</Eyebrow>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: centered ? 'center' : 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 4 }}>
        <Heading level={level || (centered ? 'hero' : 'page')}>{title}</Heading>
        {actions && <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>{actions}</div>}
      </div>
      {subtitle && (
        <Text size="md" style={{ fontSize: 14, maxWidth: centered ? 620 : undefined, margin: centered ? '0 auto' : undefined, lineHeight: lineHeight.relaxed }}>
          {subtitle}
        </Text>
      )}
    </div>
  );
}

// "• tip" list used for CLB tips and feedback suggestions.
export function BulletList({ items, style }) {
  return (
    <div style={style}>
      {items.map((t, i) => (
        <div key={i} style={{ fontSize: fontSize.sm, color: color.textSecondary, lineHeight: 1.6 }}>• {t}</div>
      ))}
    </div>
  );
}

export function Mono({ size = 'sm', color: c, style, children }) {
  return <span style={{ fontFamily: 'var(--font-mono)', fontSize: fontSize[size] || size, fontWeight: fontWeight.bold, color: c, ...style }}>{children}</span>;
}
