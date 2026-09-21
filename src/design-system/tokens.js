// JS handle on the design tokens in tokens.css. Colours and fonts resolve to
// CSS variables so theming stays in one file; sizes are plain numbers because
// React inline styles treat numbers as px.

export const color = {
  bg: 'var(--color-bg)',
  surface: 'var(--color-surface)',
  surfaceMuted: 'var(--color-surface-muted)',
  surfaceSubtle: 'var(--color-surface-subtle)',
  inverse: 'var(--color-inverse)',

  text: 'var(--color-text)',
  textBody: 'var(--color-text-body)',
  textSecondary: 'var(--color-text-secondary)',
  textMuted: 'var(--color-text-muted)',
  textFaint: 'var(--color-text-faint)',
  textOnInverse: 'var(--color-text-on-inverse)',
  textOnInverseMuted: 'var(--color-text-on-inverse-muted)',

  border: 'var(--color-border)',
  borderStrong: 'var(--color-border-strong)',
  divider: 'var(--color-divider)',
  borderOnInverse: 'var(--color-border-on-inverse)',
  surfaceOnInverse: 'var(--color-surface-on-inverse)',
  track: 'var(--color-track)',

  primary: 'var(--color-primary)',
  primarySoft: 'var(--color-primary-soft)',
  primaryDisabled: 'var(--color-primary-disabled)',
  primaryOnInverse: 'var(--color-primary-on-inverse)',
  success: 'var(--color-success)',
  successSoft: 'var(--color-success-soft)',
  warning: 'var(--color-warning)',
  warningSoft: 'var(--color-warning-soft)',
  warningText: 'var(--color-warning-text)',
  danger: 'var(--color-danger)',
  dangerSoft: 'var(--color-danger-soft)',
};

export const font = {
  sans: 'var(--font-sans)',
  mono: 'var(--font-mono)',
};

// Type scale (px). Pick the nearest step instead of inventing new sizes.
export const fontSize = {
  xs: 11, // eyebrows, badges
  sm: 12.5, // secondary copy, chips, helper text
  md: 13.5, // body copy, buttons
  lg: 14.5, // emphasised body, question text
  xl: 16.5, // card titles
  '2xl': 19, // hero card titles
  '3xl': 23, // page titles
  '4xl': 25, // centred screen titles
  display: 44, // speaking countdown
};

export const fontWeight = { regular: 400, medium: 600, bold: 700 };
export const lineHeight = { tight: 1.3, normal: 1.5, relaxed: 1.65, loose: 1.75 };

// Spacing scale (px) — 4px grid.
export const space = { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 28, 8: 32, 10: 40, 12: 48 };

export const radius = { sm: 6, md: 8, lg: 12, xl: 14, pill: 999 };

export const shadow = {
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  knob: 'var(--shadow-knob)',
};

export const layout = { maxWidth: 1040, navHeight: 64, gutter: 28 };

// Semantic tones shared by Badge, Alert, ProgressBar, etc.
export const tone = {
  neutral: { color: color.textSecondary, bg: color.surfaceMuted },
  primary: { color: color.primary, bg: color.primarySoft },
  success: { color: color.success, bg: color.successSoft },
  warning: { color: color.warning, bg: color.warningSoft, text: color.warningText },
  danger: { color: color.danger, bg: color.dangerSoft },
  inverse: { color: color.textOnInverse, bg: color.inverse },
};

// Each CELPIP section has a fixed accent so it's recognisable everywhere.
export const sectionTone = {
  listening: tone.primary,
  reading: tone.success,
  writing: tone.warning,
  speaking: tone.danger,
};
