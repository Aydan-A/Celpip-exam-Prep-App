import { useEffect, useRef, useState } from 'react';
import Button from './Button.jsx';

// Small outline button that copies `text` to the clipboard and briefly shows
// "✓ Copied". Disabled while there is nothing to copy.
export default function CopyButton({ text, label = '📋 Copy', style }) {
  const [done, setDone] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setDone(false), 1500);
    } catch {
      window.alert('Could not copy — allow clipboard access for this site.');
    }
  }

  return (
    <Button size="sm" variant="outline" onClick={copy} disabled={!text.trim()} style={style}>
      {done ? '✓ Copied' : label}
    </Button>
  );
}
