import { color, font, fontWeight, radius } from '../tokens.js';

// Horizontal bar. `value` is 0–1. `tone` is a {color, bg} tone object.
export function ProgressBar({ value, tone, height = 6, style }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div style={{ height, borderRadius: height / 2, background: tone ? tone.bg : color.track, ...style }}>
      <div style={{ height, borderRadius: height / 2, background: tone ? tone.color : color.primary, width: pct + '%', transition: 'width 300ms linear' }} />
    </div>
  );
}

export function Avatar({ initials, size = 28 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color.primarySoft, color: color.primary, fontSize: Math.round(size * 0.38), fontWeight: fontWeight.bold, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
      {initials}
    </div>
  );
}

export function Logo({ size = 30, showName = true, nameSize = 15.5, nameClassName }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: size, height: size, borderRadius: radius.md, background: color.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
        <span style={{ fontFamily: font.mono, fontWeight: fontWeight.bold, fontSize: Math.round(size * 0.4), color: '#fff', letterSpacing: '-0.5px' }}>CP</span>
      </div>
      {showName && <div className={nameClassName} style={{ fontSize: nameSize, fontWeight: fontWeight.bold, letterSpacing: '-0.2px' }}>CELPIP Prep</div>}
    </div>
  );
}

// Responsive grid: as many `min`-wide columns as fit, collapsing to one on phones.
export function Grid({ min = 300, gap = 16, style, children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}px, 100%), 1fr))`, gap, ...style }}>{children}</div>;
}

// Stacked list container with hairline dividers between rows.
export function List({ style, children }) {
  return <div style={{ background: color.surface, border: `1px solid ${color.border}`, borderRadius: radius.lg, overflow: 'hidden', ...style }}>{children}</div>;
}
export function ListRow({ last, style, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', padding: '14px 20px', borderBottom: last ? 'none' : `1px solid ${color.divider}`, ...style }}>
      {children}
    </div>
  );
}
