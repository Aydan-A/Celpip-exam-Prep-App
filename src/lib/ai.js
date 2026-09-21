// Client-side call to the AI feedback endpoint.
// kind: 'writing' | 'speaking'
export async function getFeedback({ kind, taskName, taskPrompt, text }) {
  const res = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind, taskName, taskPrompt, text }),
  });
  if (!res.ok) {
    let msg = 'Could not get AI feedback right now. Please try again.';
    try {
      const data = await res.json();
      if (data && data.error) msg = data.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  return res.json();
}
