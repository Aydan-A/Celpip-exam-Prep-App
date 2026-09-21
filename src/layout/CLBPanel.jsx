import { Eyebrow, Grid, Mono, color, fontSize, layout, radius } from '../design-system/index.js';

export default function CLBPanel({ bands }) {
  return (
    <div style={{ background: color.inverse, color: color.textOnInverse, padding: `18px clamp(16px, 4vw, ${layout.gutter}px)` }}>
      <div style={{ maxWidth: layout.maxWidth, margin: '0 auto' }}>
        <Eyebrow color={color.textOnInverseMuted} style={{ fontSize: fontSize.sm, letterSpacing: '0.04em', marginBottom: 10 }}>
          Canadian Language Benchmark (CLB) reference
        </Eyebrow>
        <Grid min={150} gap={10}>
          {bands.map((band, i) => (
            <div key={i} style={{ background: color.surfaceOnInverse, borderRadius: radius.md, padding: '12px 14px' }}>
              <Mono size={13} color={color.primaryOnInverse}>CLB {band.range}</Mono>
              <div style={{ fontSize: 12, color: color.textOnInverseMuted, marginTop: 4 }}>{band.label}</div>
            </div>
          ))}
        </Grid>
      </div>
    </div>
  );
}
