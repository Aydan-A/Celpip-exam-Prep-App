// CLB (Canadian Language Benchmark) scoring helpers — ported from the prototype.
import { tone } from '../design-system/tokens.js';

export function fmtTime(sec) {
  sec = Math.max(0, Math.round(sec));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}

export function clbFromPercent(pct) {
  if (pct >= 90) return 10;
  if (pct >= 80) return 9;
  if (pct >= 70) return 8;
  if (pct >= 60) return 7;
  if (pct >= 50) return 6;
  if (pct >= 40) return 5;
  if (pct >= 30) return 4;
  return 3;
}

export function clbFromScore12(avg) {
  return Math.max(1, Math.min(12, Math.round(avg)));
}

export function clbBandInfo(clb) {
  if (clb >= 10) return { label: 'Advanced', ...tone.success };
  if (clb >= 8) return { label: 'Fluent', ...tone.primary };
  if (clb >= 6) return { label: 'Adequate', ...tone.warning };
  if (clb >= 4) return { label: 'Developing', ...tone.danger };
  return { label: 'Basic', ...tone.neutral };
}

export const CLB_BANDS = [
  { range: '1–3', label: 'Basic' },
  { range: '4–5', label: 'Developing' },
  { range: '6–7', label: 'Adequate' },
  { range: '8–9', label: 'Fluent' },
  { range: '10–12', label: 'Advanced' },
];
