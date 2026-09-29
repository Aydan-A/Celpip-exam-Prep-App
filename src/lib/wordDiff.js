// Word-level diff between an answer and its improved version, used to draw
// red-pen corrections. Words are compared exactly (case and punctuation
// count); spacing and line breaks are ignored.
//
// Returns a list of parts in reading order:
//   { type: 'same', text }            unchanged word(s)
//   { type: 'replace', from, to }     words crossed out and rewritten
//   { type: 'delete', from }          words crossed out
//   { type: 'insert', to }            words added (a caret mark)
export function wordDiff(before, after) {
  const a = before.trim() ? before.trim().split(/\s+/) : [];
  const b = after.trim() ? after.trim().split(/\s+/) : [];

  // Longest common subsequence table, filled from the end.
  const lcs = Array.from({ length: a.length + 1 }, () => new Uint16Array(b.length + 1));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }

  const parts = [];
  let del = [];
  let ins = [];
  const flush = () => {
    if (del.length && ins.length) parts.push({ type: 'replace', from: del.join(' '), to: ins.join(' ') });
    else if (del.length) parts.push({ type: 'delete', from: del.join(' ') });
    else if (ins.length) parts.push({ type: 'insert', to: ins.join(' ') });
    del = [];
    ins = [];
  };

  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      flush();
      const last = parts[parts.length - 1];
      if (last && last.type === 'same') last.text += ` ${a[i]}`;
      else parts.push({ type: 'same', text: a[i] });
      i++;
      j++;
    } else if (j < b.length && (i === a.length || lcs[i][j + 1] >= lcs[i + 1][j])) {
      ins.push(b[j++]);
    } else {
      del.push(a[i++]);
    }
  }
  flush();
  return parts;
}
