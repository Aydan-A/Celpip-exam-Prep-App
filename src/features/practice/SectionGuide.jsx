import { Eyebrow, Grid, color, fontSize, fontWeight, lineHeight } from '../../design-system/index.js';

// A section's scoring criteria + CLB 9+ tips (Issue #2: all advice is visible
// before any task starts). Used on the task list and the full-exam intro.
export default function SectionGuide({ section }) {
  const hasTips = section.tips && section.tips.length > 0;
  return (
    <Grid min={280} gap={24}>
      <div>
        <Eyebrow style={{ marginBottom: 8 }}>Scoring criteria</Eyebrow>
        <GuideList items={section.criteria} />
      </div>
      {hasTips && (
        <div>
          <Eyebrow style={{ marginBottom: 8 }}>CLB 9+ tips</Eyebrow>
          <GuideList items={section.tips} />
        </div>
      )}
    </Grid>
  );
}

// "Term — explanation" items get the term in bold so each point scans quickly.
export function GuideList({ items, ordered = false }) {
  const List = ordered ? 'ol' : 'ul';
  return (
    <List style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, i) => {
        const [term, ...rest] = item.split(' — ');
        return (
          <li key={i} style={{ fontSize: fontSize.md, color: color.textBody, lineHeight: lineHeight.normal }}>
            {rest.length ? <><span style={{ fontWeight: fontWeight.bold, color: color.text }}>{term}</span> — {rest.join(' — ')}</> : item}
          </li>
        );
      })}
    </List>
  );
}
