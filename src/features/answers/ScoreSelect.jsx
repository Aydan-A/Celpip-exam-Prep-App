import { Select, color, fontSize, fontWeight } from '../../design-system/index.js';

const LEVELS = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

// The CELPIP level (1–12) the user gives one of their own answers.
export default function ScoreSelect({ value, onChange }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: color.textSecondary }}>
      Your CELPIP score
      <Select value={value || ''} onChange={onChange} style={{ padding: '6px 8px', fontSize: fontSize.sm }}>
        <option value="">—</option>
        {LEVELS.map((n) => <option key={n} value={n}>Level {n}</option>)}
      </Select>
    </label>
  );
}
