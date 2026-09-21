import { BulletList, Eyebrow, Tag } from '../../design-system/index.js';

// A section's scoring criteria + CLB 9+ tips (Issue #2: all advice is visible
// before any task starts). Used on the task list and the full-exam intro.
export default function SectionGuide({ section }) {
  return (
    <>
      <Eyebrow style={{ marginBottom: 8 }}>Scoring criteria</Eyebrow>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {section.criteria.map((c, i) => <Tag key={i}>{c}</Tag>)}
      </div>
      {section.tips && section.tips.length > 0 && (
        <>
          <Eyebrow style={{ margin: '14px 0 6px' }}>CLB 9+ tips</Eyebrow>
          <BulletList items={section.tips} />
        </>
      )}
    </>
  );
}
