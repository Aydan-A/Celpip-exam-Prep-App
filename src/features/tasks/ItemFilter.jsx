import { useState } from 'react';
import { Button, Card, color, fontSize, fontWeight, radius } from '../../design-system/index.js';

// Practice filter: draw the next item from one category — writing email type
// (Complaint, Request, …), survey topic, or Giving Advice topic (Work & Career, …). Collapsed to one
// line so the question stays the first thing on screen.
export default function ItemFilter({ filter, active, onPick }) {
  const [open, setOpen] = useState(false);
  const all = `All ${filter.label.toLowerCase()}s`;
  const pick = (value) => {
    setOpen(false);
    onPick(value);
  };
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: color.textMuted }}>{filter.label}:</span>
        <Button variant="outline" size="sm" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {active || all} {open ? '▴' : '▾'}
        </Button>
        {active && <Button variant="ghost" size="sm" onClick={() => pick(null)}>Clear</Button>}
      </div>
      {open && (
        <Card style={{ padding: '12px 14px', marginTop: 8 }}>
          <div role="radiogroup" aria-label={filter.label} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Chip label={all} selected={!active} onClick={() => pick(null)} />
            {filter.values.map((value) => (
              <Chip key={value} label={value} selected={active === value} onClick={() => pick(value)} />
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className="ds-focusable"
      onClick={onClick}
      style={{
        fontSize: fontSize.sm,
        fontWeight: selected ? fontWeight.bold : fontWeight.medium,
        padding: '6px 12px',
        borderRadius: radius.pill,
        cursor: 'pointer',
        border: `1px solid ${selected ? color.primary : color.border}`,
        background: selected ? color.primarySoft : color.surface,
        color: selected ? color.primary : color.text,
      }}
    >
      {selected && '✓ '}{label}
    </button>
  );
}

// Survey option as a card: letter badge + the full option text.
function ChoiceCard({ letter, text, selected, onClick }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className="ds-focusable"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        width: '100%',
        padding: '12px 14px',
        textAlign: 'left',
        cursor: 'pointer',
        borderRadius: radius.md,
        border: `${selected ? 2 : 1}px solid ${selected ? color.primary : color.borderStrong}`,
        background: selected ? color.primarySoft : color.surface,
        color: color.text,
      }}
    >
      <span
        style={{
          flex: 'none',
          width: 26,
          height: 26,
          borderRadius: radius.pill,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: font.mono,
          fontSize: fontSize.sm,
          fontWeight: fontWeight.bold,
          background: selected ? color.primary : color.surfaceMuted,
          color: selected ? color.surface : color.textSecondary,
        }}
      >
        {letter}
      </span>
      <span style={{ fontSize: fontSize.lg, lineHeight: lineHeight.normal, paddingTop: 2 }}>
        <span style={{ fontWeight: fontWeight.bold }}>Option {letter}: </span>{text}
      </span>
    </button>
  );
}

function ModelAnswer({ item, task }) {
  return (
    <div style={{ borderTop: `1px solid ${color.divider}`, marginTop: 16, paddingTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <Badge tone="success" mono>CLB 10–12</Badge>
        <Badge mono>{countWords(item.sample)} words</Badge>
        {item.options && item.sampleChoice != null && <Badge tone="primary">Chose {optionName(item.sampleChoice)}</Badge>}
      </div>
      <div style={{ whiteSpace: 'pre-wrap', fontSize: fontSize.lg, lineHeight: lineHeight.loose, color: color.textBody, background: color.surfaceSubtle, border: `1px solid ${color.border}`, borderRadius: radius.md, padding: '16px 18px', marginBottom: 14 }}>
        {item.sample}
      </div>
      {task.sampleNotes && (
        <>
          <Eyebrow style={{ marginBottom: 8 }}>Why it scores high</Eyebrow>
          <GuideList items={task.sampleNotes} />
        </>
      )}
    </div>
  );
}
