import { color, fontSize, fontWeight, radius } from '../tokens.js';

// variant: primary | secondary | outline | danger | ghost | onInverse
// size:    sm | md | lg
// `accent` recolours a primary button (e.g. a section's colour).
const SIZES = {
  sm: { fontSize: fontSize.sm, padding: '8px 12px', borderRadius: radius.md - 1 },
  md: { fontSize: fontSize.md, padding: '11px 18px', borderRadius: radius.md },
  lg: { fontSize: 14, padding: '13px 24px', borderRadius: radius.md + 1 },
};

function variantStyle(variant, accent, disabled) {
  const main = accent || color.primary;
  switch (variant) {
    case 'secondary':
      return { background: color.surface, color: color.text, border: `1px solid ${color.borderStrong}` };
    case 'outline':
      return { background: color.surface, color: main, border: `1px solid ${color.borderStrong}` };
    case 'danger':
      return { background: color.surface, color: color.danger, border: `1px solid ${color.borderStrong}` };
    case 'ghost':
      return { background: 'transparent', color: color.textMuted, border: 'none', padding: 0 };
    case 'onInverse':
      return { background: 'transparent', color: color.textOnInverse, border: `1px solid ${color.borderOnInverse}` };
    default:
      return { background: disabled ? color.primaryDisabled : main, color: '#fff', border: 'none' };
  }
}

export default function Button({ variant = 'primary', size = 'md', accent, block = false, disabled, style, children, ...rest }) {
  return (
    <button
      className="ds-btn"
      disabled={disabled}
      style={{
        fontWeight: fontWeight.bold,
        cursor: disabled ? 'default' : 'pointer',
        width: block ? '100%' : undefined,
        whiteSpace: 'nowrap',
        ...SIZES[size],
        ...variantStyle(variant, accent, disabled),
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

// "← Back" style text link used at the top of every inner screen.
export function BackLink({ children, style, ...rest }) {
  return (
    <Button variant="ghost" style={{ fontSize: 13, fontWeight: fontWeight.medium, marginBottom: 6, ...style }} {...rest}>
      ← {children}
    </Button>
  );
}
