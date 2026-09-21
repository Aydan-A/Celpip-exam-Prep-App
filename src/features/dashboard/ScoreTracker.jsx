import { Badge, Eyebrow, List, ListRow, color, fontSize } from '../../design-system/index.js';

// Per-section latest-result list, shown on the dashboard and the profile.
export default function ScoreTracker({ rows, style }) {
  return (
    <>
      <Eyebrow style={{ fontSize: 13, letterSpacing: '0.02em', marginBottom: 10 }}>Your score tracker</Eyebrow>
      <List style={style}>
        {rows.map((row, i) => (
          <ListRow key={i} last={i === rows.length - 1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: row.dotColor }} />
              <div style={{ fontSize: 14, fontWeight: 600 }}>{row.name}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ fontSize: fontSize.sm, color: color.textSecondary }}>{row.detail}</div>
              <Badge tone={row.tone} mono size="md">{row.clbLabel}</Badge>
            </div>
          </ListRow>
        ))}
      </List>
    </>
  );
}
