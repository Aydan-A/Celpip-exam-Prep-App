// Microphone capture for speaking tasks: records the audio (MediaRecorder)
// and, where the browser supports it, turns speech into text as you talk
// (Web Speech API — Chrome, Edge and Safari; not Firefox).

const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

export const canTranscribe = !!SpeechRecognition;
export const canRecord = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined';

// Starts capturing. `onTranscript(text)` fires with the full transcript so far
// (final + in-progress words). Resolves to a handle whose stop() resolves to
// { blob, transcript } and whose abort() discards everything.
export async function startCapture({ onTranscript }) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  const chunks = [];
  const recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
  recorder.start();

  let finalText = '';
  let interim = '';
  let active = true;
  let recognition = null;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-CA';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (e) => {
      interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += (finalText ? ' ' : '') + r[0].transcript.trim();
        else interim += r[0].transcript;
      }
      onTranscript(join(finalText, interim));
    };
    // Browsers end recognition after a pause; keep it going until we stop.
    recognition.onend = () => { if (active) try { recognition.start(); } catch { /* already running */ } };
    recognition.onerror = () => {};
    try { recognition.start(); } catch { /* ignore */ }
  }

  function release() {
    active = false;
    if (recognition) try { recognition.stop(); } catch { /* ignore */ }
    stream.getTracks().forEach((t) => t.stop());
  }

  return {
    stop() {
      return new Promise((resolve) => {
        recorder.onstop = () => resolve({ blob: chunks.length ? new Blob(chunks, { type: recorder.mimeType || 'audio/webm' }) : null, transcript: join(finalText, interim) });
        release();
        if (recorder.state !== 'inactive') recorder.stop();
        else recorder.onstop();
      });
    },
    abort() {
      recorder.onstop = null;
      release();
      if (recorder.state !== 'inactive') recorder.stop();
    },
  };
}

function join(a, b) {
  return [a, b.trim()].filter(Boolean).join(' ');
}
