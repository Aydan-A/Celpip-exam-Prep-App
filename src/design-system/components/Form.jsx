import { color, fontSize, fontWeight, lineHeight, radius } from '../tokens.js';

const fieldBase = {
  width: '100%',
  border: `1px solid ${color.borderStrong}`,
  borderRadius: radius.md,
  background: color.surface,
  color: color.text,
  outline: 'none',
};

export function Field({ label, children }) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{ fontSize: 12, fontWeight: fontWeight.medium, color: color.textSecondary, marginBottom: 6 }}>{label}</div>
      {children}
    </label>
  );
}

export function TextInput({ style, ...rest }) {
  return <input className="ds-field" style={{ ...fieldBase, padding: '11px 12px', fontSize: 14, ...style }} {...rest} />;
}

export function TextArea({ minHeight = 120, style, ...rest }) {
  return (
    <textarea
      className="ds-field"
      style={{ ...fieldBase, minHeight, padding: 14, fontSize: fontSize.md, lineHeight: 1.6, resize: 'vertical', ...style }}
      {...rest}
    />
  );
}

export function Select({ style, children, ...rest }) {
  return (
    <select className="ds-field" style={{ ...fieldBase, width: 'auto', fontSize: fontSize.sm, fontWeight: fontWeight.medium, padding: '8px 10px', cursor: 'pointer', ...style }} {...rest}>
      {children}
    </select>
  );
}

// On/off switch with an optional label to its left.
export function Toggle({ checked, onChange, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {label && <span style={{ fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: color.textSecondary }}>{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className="ds-focusable"
        onClick={onChange}
        style={{ width: 38, height: 22, borderRadius: 11, border: 'none', padding: 0, background: checked ? color.primary : color.borderStrong, position: 'relative', cursor: 'pointer', transition: 'background 120ms ease' }}
      >
        <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: checked ? 18 : 2, boxShadow: 'var(--shadow-knob)', transition: 'left 120ms ease' }} />
      </button>
    </div>
  );
}

// Pill-style tab switcher (auth Sign in / Create account).
export function SegmentedControl({ options, value, onChange, style }) {
  return (
    <div style={{ display: 'flex', background: color.surfaceMuted, borderRadius: radius.md + 1, padding: 3, ...style }}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            className="ds-focusable"
            onClick={() => onChange(o.value)}
            style={{ flex: 1, border: 'none', background: active ? color.surface : 'transparent', color: active ? color.text : color.textSecondary, fontWeight: fontWeight.medium, fontSize: 13, padding: '9px 0', borderRadius: radius.md - 1, cursor: 'pointer', lineHeight: lineHeight.normal }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
