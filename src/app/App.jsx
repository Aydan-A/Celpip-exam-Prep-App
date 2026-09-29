import { useEffect, useReducer, useRef } from 'react';
import {
  SECTIONS,
  SECTION_LIST,
  EXAM_ORDER,
  getTask,
  randomItemIndex,
  buildFullExamSequence,
  mockPartStart,
  parseAnswerKey,
} from '../data/index.js';
import { fmtTime, clbFromPercent, clbBandInfo, CLB_BANDS } from '../lib/clb.js';
import { sectionSummary } from '../lib/scoring.js';
import { loadUser, saveUser, clearUser, loadScores, saveScores, loadAnswers, saveAnswers, loadProfile, saveProfile, loadVocab, saveVocab, loadExams, saveExams } from '../lib/storage.js';
import { color, sectionTone } from '../design-system/index.js';
import { startCapture, canRecord } from '../lib/recorder.js';
import { putAudio, deleteAudio } from '../lib/audioStore.js';

import AppShell from '../layout/AppShell.jsx';
import AuthScreen from '../features/auth/AuthScreen.jsx';
import Dashboard from '../features/dashboard/Dashboard.jsx';
import SectionList from '../features/practice/SectionList.jsx';
import TaskList from '../features/practice/TaskList.jsx';
import TaskScreen from '../features/tasks/TaskScreen.jsx';
import VideoMockScreen from '../features/listening/VideoMockScreen.jsx';
import ExamIntro from '../features/exam/ExamIntro.jsx';
import ReportScreen from '../features/exam/ReportScreen.jsx';
import ProfileScreen from '../features/profile/ProfileScreen.jsx';
import MyAnswersScreen from '../features/answers/MyAnswersScreen.jsx';

// Transient per-task state, keyed by the task's `kind`. In full-exam mode the
// timer starts running immediately; in practice it is off until toggled.
function freshTaskState(sectionId, taskIndex, mode) {
  const task = getTask(sectionId, taskIndex);
  const running = mode === 'full';
  if (task.kind === 'mcq') {
    return { kind: 'mcq', answers: [], submitted: false, timeLeft: (task.minutes || 10) * 60, timerEnabled: running, running };
  }
  if (task.kind === 'writing') {
    return { kind: 'writing', text: '', choice: null, savedId: null, showSample: false, timeLeft: (task.minutes || 27) * 60, timerEnabled: running, running };
  }
  // speaking
  return {
    kind: 'speaking',
    phase: 'idle', // idle → prep → response → review
    prepLeft: task.prepSec,
    respLeft: task.responseSec,
    running: false,
    notes: '',
    attempt: Math.random(), // ties async recorder results to this attempt
    transcript: '', // speech-to-text of the response (editable in review)
    audioBlob: null,
    audioUrl: null,
    recording: false,
    micError: null,
    savedId: null,
    endedEarly: false, // true when the user pressed "I'm done" before time ran out
    spokeSec: 0,
    improved: '', // the user's own improved version of the answer
    score: null, // CELPIP level (1–12) the user gives this answer
  };
}

function initialState() {
  return {
    screen: 'auth',
    authMode: 'signin',
    authEmail: '',
    authPassword: '',
    authName: '',
    authError: '',
    user: null,
    // dashboard | sectionList | taskList | task | videoMock | examIntro | report | profile | answers
    view: 'dashboard',
    mode: null, // null | practice | full
    activeSection: null,
    activeTaskIndex: null,
    itemIndex: null,
    itemFilter: null, // practice filter value on the task's `filter.key` (email type, survey topic); null = all
    task: null,
    mock: null, // videoMock state: { section, index, part: null | partIndex, answers: {qNum: letter}, checked, result }
    exam: { seq: [], step: 0, scope: null, results: {} }, // scope: null = full exam, else a single section id; results: this run's video mock scores by section
    scores: {}, // { [sectionId]: { [taskId]: result } }
    answers: [], // saved writing / speaking responses, newest first
    vocab: [], // the user's vocabulary collection, newest first
    exams: [], // finished full / section mock runs, newest first
    answersFilter: 'all', // My answers tab: all | writing | speaking
    showCLBPanel: false,
  };
}

// "today" / "yesterday" / "5 days ago" for an ISO timestamp.
function daysAgoLabel(iso) {
  const start = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const days = Math.round((start(new Date()) - start(new Date(iso))) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${days} days ago`;
}

export default function App() {
  // Class-component-style mutable state: a ref is the source of truth so nested
  // setState calls and post-commit callbacks read the latest value; a reducer
  // forces re-renders.
  const stateRef = useRef(initialState());
  const captureRef = useRef(null); // live microphone capture, if any
  const audioUrlRef = useRef(null); // object URL of the recording on screen
  const [, forceRender] = useReducer((x) => x + 1, 0);

  function setState(update, cb) {
    const prev = stateRef.current;
    const partial = typeof update === 'function' ? update(prev) : update;
    if (partial === null || partial === undefined) {
      if (cb) cb();
      return;
    }
    stateRef.current = { ...prev, ...partial };
    forceRender();
    if (cb) cb();
  }

  // ---- lifecycle ----
  useEffect(() => {
    const savedUser = loadUser();
    if (savedUser && savedUser.email) {
      setState({ screen: 'app', user: withProfile(savedUser.email), scores: loadScores(savedUser.email), answers: loadAnswers(savedUser.email), vocab: loadVocab(savedUser.email), exams: loadExams(savedUser.email) });
    }
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- timers ----
  function tick() {
    const s = stateRef.current;
    if (s.screen !== 'app' || s.view !== 'task' || !s.task) return;
    const t = s.task;

    if (t.kind === 'mcq' || t.kind === 'writing') {
      if (!t.running) return;
      if (t.timeLeft > 1) {
        setState({ task: { ...t, timeLeft: t.timeLeft - 1 } });
      } else {
        // Time is up. MCQ auto-submits (and therefore saves its score);
        // writing simply stops so the response can still be scored on demand.
        if (t.kind === 'mcq') {
          setState({ task: { ...t, timeLeft: 0, running: false } }, () => submitMcq());
        } else {
          setState({ task: { ...t, timeLeft: 0, running: false } });
        }
      }
      return;
    }

    if (t.kind === 'speaking' && t.running) {
      const task = getTask(s.activeSection, s.activeTaskIndex);
      if (t.phase === 'prep') {
        if (t.prepLeft > 1) setState({ task: { ...t, prepLeft: t.prepLeft - 1 } });
        else setState({ task: { ...t, phase: 'response', prepLeft: 0, respLeft: task.responseSec, running: true } }, beginCapture);
      } else if (t.phase === 'response') {
        if (t.respLeft > 1) setState({ task: { ...t, respLeft: t.respLeft - 1 } });
        else {
          finishCapture();
          setState({ task: { ...t, phase: 'review', respLeft: 0, running: false } });
        }
      }
    }
  }

  // Forget every recorded score for one section (from the profile).
  function resetSectionScores(sectionId) {
    setState((s) => {
      const scores = { ...s.scores };
      delete scores[sectionId];
      if (s.user) saveScores(s.user.email, scores);
      return { scores };
    });
  }
  function saveScore(sectionId, taskId, result) {
    setState((s) => {
      const sectionScores = { ...(s.scores[sectionId] || {}), [taskId]: result };
      const scores = { ...s.scores, [sectionId]: sectionScores };
      if (s.user) saveScores(s.user.email, scores);
      return { scores };
    });
  }

  // ---------- AUTH ----------
  function setAuthMode(mode) {
    setState({ authMode: mode, authError: '' });
  }
  function submitAuth() {
    const s = stateRef.current;
    const email = s.authEmail.trim();
    const pw = s.authPassword;
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setState({ authError: 'Enter a valid email address.' });
      return;
    }
    if (pw.length < 6) {
      setState({ authError: 'Password must be at least 6 characters.' });
      return;
    }
    const name = s.authName.trim();
    if (s.authMode === 'signup' && !name) {
      setState({ authError: 'Enter your name.' });
      return;
    }
    if (name) saveProfile(email, { ...loadProfile(email), name });
    saveUser({ email });
    setState({ screen: 'app', user: withProfile(email), scores: loadScores(email), answers: loadAnswers(email), vocab: loadVocab(email), exams: loadExams(email), authError: '' });
  }
  // The signed-in user is { email, name, target, testDate }; name and target come from the
  // per-email profile so they survive sign-out.
  function withProfile(email) {
    const profile = loadProfile(email);
    return { email, name: profile.name || '', target: profile.target || null, testDate: profile.testDate || null };
  }
  function updateProfile({ name, target, testDate }) {
    const s = stateRef.current;
    if (!s.user) return;
    const profile = { name: name.trim(), target: target || null, testDate: testDate || null };
    saveProfile(s.user.email, profile);
    setState({ user: { ...s.user, ...profile } });
  }
  function signOut() {
    clearUser();
    setState({ ...initialState() });
  }
  function toggleCLBPanel() {
    setState((s) => ({ showCLBPanel: !s.showCLBPanel }));
  }

  // ---------- NAV ----------
  function goDashboard() {
    setState({ view: 'dashboard', mode: null, activeSection: null, activeTaskIndex: null, task: null, mock: null });
  }
  function goSectionList() {
    setState({ view: 'sectionList', mode: null });
  }
  function goProfile() {
    setState({ view: 'profile' });
  }
  function goAnswers(filter = 'all') {
    setState({ view: 'answers', answersFilter: filter, task: null });
  }
  function openSection(sectionId) {
    setState({ view: 'taskList', activeSection: sectionId, mode: 'practice' });
  }
  function goTaskList() {
    setState({ view: 'taskList', task: null, activeTaskIndex: null, mock: null });
  }
  function openTask(taskIndex) {
    const sectionId = stateRef.current.activeSection;
    const itemIndex = randomItemIndex(sectionId, taskIndex);
    setState({ view: 'task', mode: 'practice', activeTaskIndex: taskIndex, itemIndex, itemFilter: null, task: freshTaskState(sectionId, taskIndex, 'practice') });
  }
  // Practice-only: swap in a different random item from the same task bank,
  // limited to the active filter value (task.filter) when one is set.
  function rerollItem() {
    drawItem(stateRef.current.itemFilter);
  }
  function pickItemFilter(value) {
    drawItem(value);
  }
  function drawItem(itemFilter) {
    const s = stateRef.current;
    const task = getTask(s.activeSection, s.activeTaskIndex);
    const bank = task.bank;
    const pool = bank.map((_, i) => i).filter((i) => !itemFilter || bank[i][task.filter.key] === itemFilter);
    const others = pool.filter((i) => i !== s.itemIndex);
    const choices = others.length ? others : pool;
    const next = choices[Math.floor(Math.random() * choices.length)];
    setState({ itemFilter, itemIndex: next, task: freshTaskState(s.activeSection, s.activeTaskIndex, 'practice') });
  }

  // ---------- VIDEO MOCK (Listening / Reading) ----------
  // Runs in the active section. `part` limits the answer sheet (and score) to
  // one part; null = whole test.
  function startVideoMock(index, part = null) {
    const section = stateRef.current.activeSection;
    const mocks = SECTIONS[section].videoMocks;
    const i = index != null ? index : Math.floor(Math.random() * mocks.length);
    setState({ view: 'videoMock', mode: 'practice', mock: { section, index: i, part, answers: {}, checked: false, result: null } });
  }
  function selectVideoMock(index, part = stateRef.current.mock.part) {
    setState((s) => ({ mock: { section: s.mock.section, index, part, answers: {}, checked: false, result: null } }));
  }
  function setMockAnswer(qNum, letter) {
    setState((s) => {
      if (!s.mock || s.mock.checked) return null;
      return { mock: { ...s.mock, answers: { ...s.mock.answers, [qNum]: letter } } };
    });
  }
  function checkVideoMock() {
    const s = stateRef.current;
    const sec = SECTIONS[s.mock.section];
    const item = sec.videoMocks[s.mock.index];
    const key = parseAnswerKey(item.answers);
    if (!key) return;
    const { part } = s.mock;
    const first = part == null ? 1 : mockPartStart(sec.mockParts, part);
    const total = part == null ? key.length : sec.mockParts[part].count;
    let correct = 0;
    let answered = 0;
    for (let n = first; n < first + total; n++) {
      if (s.mock.answers[n]) answered++;
      if (s.mock.answers[n] === key[n - 1]) correct++;
    }
    const clb = clbFromPercent(Math.round((correct / total) * 100));
    setState({ mock: { ...s.mock, checked: true, result: { correct, total, clb } } });
    if (s.mode === 'full') {
      setState({ exam: { ...s.exam, results: { ...s.exam.results, [sec.id]: { correct, total, clb, label: item.label } } } });
    }
    // A blank sheet is not a real attempt — keep it out of the score tracker.
    if (!answered) return;
    const scoreId = part == null ? item.id : `${item.id}-p${part + 1}`;
    // Keep the answer sheet so My answers can show it against the key.
    const sheet = {};
    for (let n = first; n < first + total; n++) if (s.mock.answers[n]) sheet[n] = s.mock.answers[n];
    saveScore(sec.id, scoreId, { type: 'mcq', correct, total, clb, date: new Date().toISOString(), mockId: item.id, part, first, answers: sheet });
  }
  // Remove one Listening / Reading result (from My answers).
  function deleteScore(sectionId, scoreId) {
    setState((s) => {
      const sectionScores = { ...(s.scores[sectionId] || {}) };
      delete sectionScores[scoreId];
      const scores = { ...s.scores, [sectionId]: sectionScores };
      if (s.user) saveScores(s.user.email, scores);
      return { scores };
    });
  }

  // ---------- FULL EXAM ----------
  function startFullExam() {
    setState({ view: 'examIntro' });
  }
  function beginFullExam() {
    const seq = buildFullExamSequence();
    setState({ mode: 'full', exam: { seq, step: 0, scope: null, results: {}, startedAt: new Date().toISOString() } }, () => loadExamStep(0));
  }
  // One section's parts back to back, timed like the real exam.
  function startSectionRun(sectionId) {
    const seq = buildFullExamSequence(sectionId);
    setState({ mode: 'full', exam: { seq, step: 0, scope: sectionId, results: {}, startedAt: new Date().toISOString() } }, () => loadExamStep(0));
  }
  // A step is either a whole video mock (Listening / Reading, same as Test
  // Yourself) or one task item.
  function loadExamStep(step) {
    const s = stateRef.current;
    const { section, taskIndex, itemIndex, mockIndex } = s.exam.seq[step];
    if (mockIndex != null) {
      setState({ view: 'videoMock', activeSection: section, activeTaskIndex: null, itemIndex: null, task: null, mock: { section, index: mockIndex, part: null, answers: {}, checked: false, result: null } });
      return;
    }
    setState({ view: 'task', activeSection: section, activeTaskIndex: taskIndex, itemIndex, mock: null, task: freshTaskState(section, taskIndex, 'full') });
  }
  function exitExam() {
    if (!window.confirm('Leave the exam? Your progress in this run will be lost.')) return;
    const scope = stateRef.current.exam.scope;
    if (scope) setState({ view: 'taskList', mode: 'practice', activeSection: scope, activeTaskIndex: null, task: null, mock: null });
    else goDashboard();
  }
  function continueExam() {
    const s = stateRef.current;
    const step = s.exam.step;
    if (step >= s.exam.seq.length - 1) {
      if (s.task && s.task.kind === 'writing') saveWritingAnswer();
      if (s.task && s.task.kind === 'speaking') saveSpeakingAnswer();
      setState({ view: 'report', mode: null, mock: null });
      recordExam();
      return;
    }
    if (s.task && s.task.kind === 'writing') saveWritingAnswer();
    if (s.task && s.task.kind === 'speaking') saveSpeakingAnswer();
    const next = step + 1;
    setState({ exam: { ...s.exam, step: next } }, () => loadExamStep(next));
  }

  // Keep a finished run for My answers → Full mocks: when it ran, what it
  // covered and this run's Listening / Reading results. Writing and Speaking
  // answers from the run are already in the saved answers.
  function recordExam() {
    setState((s) => {
      const entry = { id: `exam-${Date.now()}`, scope: s.exam.scope, startedAt: s.exam.startedAt, date: new Date().toISOString(), results: s.exam.results };
      const exams = [entry, ...s.exams];
      if (s.user) saveExams(s.user.email, exams);
      return { exams };
    });
  }
  function deleteExam(id) {
    setState((s) => {
      const exams = s.exams.filter((e) => e.id !== id);
      if (s.user) saveExams(s.user.email, exams);
      return { exams };
    });
  }

  // ---------- MCQ (Listening / Reading) ----------
  function toggleTimer() {
    setState((s) => {
      const t = s.task;
      const enabled = !t.timerEnabled;
      const task = getTask(s.activeSection, s.activeTaskIndex);
      return { task: { ...t, timerEnabled: enabled, running: enabled && !t.submitted, timeLeft: (task.minutes || 10) * 60 } };
    });
  }
  function selectOption(qIndex, optIndex) {
    setState((s) => {
      const t = s.task;
      if (t.submitted) return null;
      const answers = [...t.answers];
      answers[qIndex] = optIndex;
      return { task: { ...t, answers } };
    });
  }
  function submitMcq() {
    const s = stateRef.current;
    const t = s.task;
    if (!t || t.kind !== 'mcq' || t.submitted) return; // idempotent
    const task = getTask(s.activeSection, s.activeTaskIndex);
    const item = task.bank[s.itemIndex];
    const correct = item.questions.filter((q, i) => t.answers[i] === q.correct).length;
    const total = item.questions.length;
    const clb = clbFromPercent(Math.round((correct / total) * 100));
    setState({ task: { ...t, submitted: true, running: false } });
    saveScore(s.activeSection, task.id, { type: 'mcq', correct, total, clb, date: new Date().toISOString() });
  }

  // ---------- WRITING ----------
  function onWritingText(e) {
    const val = e.target.value;
    setState((s) => ({ task: { ...s.task, text: val } }));
  }
  function chooseSurveyOption(i) {
    setState((s) => ({ task: { ...s.task, choice: i } }));
  }
  function toggleSample() {
    setState((s) => ({ task: { ...s.task, showSample: !s.task.showSample } }));
  }
  // Store the current response in the saved-answers list. Re-saving the same
  // attempt updates its entry instead of duplicating.
  function saveWritingAnswer() {
    const s = stateRef.current;
    const t = s.task;
    if (!t || t.kind !== 'writing' || !t.text.trim()) return;
    const task = getTask(s.activeSection, s.activeTaskIndex);
    const item = task.bank[s.itemIndex];
    const id = t.savedId || `ans-${Date.now()}`;
    const entry = {
      id,
      taskId: task.id,
      itemId: item.id,
      choice: t.choice,
      text: t.text,
      words: (t.text.trim().match(/\S+/g) || []).length,
      date: new Date().toISOString(),
    };
    const answers = [entry, ...s.answers.filter((a) => a.id !== id)];
    if (s.user) saveAnswers(s.user.email, answers);
    setState((st) => ({ answers, task: { ...st.task, savedId: id } }));
  }
  // Edit a saved answer from My answers / the section page. `field` is 'text'
  // (the original answer), 'improved' (the user's own rewrite) or 'score'
  // (the CELPIP level the user gives it).
  function updateSavedAnswer(id, field, value) {
    const patch = field === 'text'
      ? { text: value, words: (value.trim().match(/\S+/g) || []).length, edited: new Date().toISOString() }
      : { [field]: value };
    setState((s) => {
      const answers = s.answers.map((a) => (a.id === id ? { ...a, ...patch } : a));
      if (s.user) saveAnswers(s.user.email, answers);
      return { answers };
    });
  }
  function deleteSavedAnswer(id) {
    deleteAudio(id).catch(() => {});
    setState((s) => {
      const answers = s.answers.filter((a) => a.id !== id);
      if (s.user) saveAnswers(s.user.email, answers);
      return { answers };
    });
  }
  // ---------- VOCABULARY ----------
  // Add a note to the collection. On a task it belongs to the current
  // question (so each question keeps its own notes); from the profile it has
  // no question. The same note twice on one question is skipped.
  function addVocab(word) {
    const text = word.trim();
    if (!text) return;
    setState((s) => {
      const task = s.view === 'task' && s.activeTaskIndex != null ? getTask(s.activeSection, s.activeTaskIndex) : null;
      const taskId = task ? task.id : undefined;
      const itemId = task && task.bank[s.itemIndex] ? task.bank[s.itemIndex].id : undefined;
      if (s.vocab.some((w) => w.taskId === taskId && w.itemId === itemId && w.word.toLowerCase() === text.toLowerCase())) return null;
      const entry = { id: `voc-${Date.now()}`, word: text, taskId, itemId, date: new Date().toISOString() };
      const vocab = [entry, ...s.vocab];
      if (s.user) saveVocab(s.user.email, vocab);
      return { vocab };
    });
  }
  function deleteVocab(id) {
    setState((s) => {
      const vocab = s.vocab.filter((w) => w.id !== id);
      if (s.user) saveVocab(s.user.email, vocab);
      return { vocab };
    });
  }

  // ---------- SPEAKING ----------
  // Issue #6: the prep timer starts the moment the user begins writing notes.
  function onNotesChange(e) {
    const val = e.target.value;
    const s = stateRef.current;
    const t = s.task;
    if (t.phase === 'idle') {
      const task = getTask(s.activeSection, s.activeTaskIndex);
      setState({ task: { ...t, notes: val, phase: 'prep', running: true, prepLeft: task.prepSec } });
    } else {
      setState({ task: { ...t, notes: val } });
    }
  }
  function startSpeakingPrep() {
    const s = stateRef.current;
    const task = getTask(s.activeSection, s.activeTaskIndex);
    setState({ task: { ...s.task, phase: 'prep', running: true, prepLeft: task.prepSec } });
  }
  function startSpeakingResponse() {
    const s = stateRef.current;
    const task = getTask(s.activeSection, s.activeTaskIndex);
    setState({ task: { ...s.task, phase: 'response', running: true, respLeft: task.responseSec } }, beginCapture);
  }
  function endSpeakingResponse() {
    finishCapture();
    setState((s) => {
      const task = getTask(s.activeSection, s.activeTaskIndex);
      return { task: { ...s.task, phase: 'review', running: false, endedEarly: s.task.respLeft > 0, spokeSec: task.responseSec - s.task.respLeft } };
    });
  }
  // Patch the speaking task only if it is still the same attempt (recorder
  // results arrive asynchronously).
  function patchAttempt(attempt, patch) {
    setState((s) => (s.task && s.task.attempt === attempt ? { task: { ...s.task, ...patch } } : null));
  }
  // Mic on when the response phase starts: record audio + live transcript.
  function beginCapture() {
    const t = stateRef.current.task;
    if (!t || t.kind !== 'speaking' || captureRef.current) return;
    const { attempt } = t;
    if (!canRecord) {
      patchAttempt(attempt, { micError: 'This browser cannot record audio. Try Chrome, Edge or Safari.' });
      return;
    }
    startCapture({ onTranscript: (text) => patchAttempt(attempt, { transcript: text }) })
      .then((handle) => {
        const cur = stateRef.current.task;
        if (!cur || cur.attempt !== attempt || cur.phase !== 'response') { handle.abort(); return; }
        captureRef.current = handle;
        patchAttempt(attempt, { recording: true, micError: null });
      })
      .catch(() => patchAttempt(attempt, { micError: 'Microphone access was blocked. Allow the microphone for this site (address bar → site settings) and try again.' }));
  }
  // Mic off: keep the recording and the final transcript for review.
  function finishCapture() {
    const handle = captureRef.current;
    const t = stateRef.current.task;
    if (!handle || !t) return;
    captureRef.current = null;
    const { attempt } = t;
    handle.stop().then(({ blob, transcript }) => {
      const cur = stateRef.current.task;
      patchAttempt(attempt, {
        recording: false,
        audioBlob: blob,
        audioUrl: blob ? URL.createObjectURL(blob) : null,
        transcript: transcript || (cur ? cur.transcript : ''),
      });
    });
  }
  function onTranscriptChange(e) {
    const val = e.target.value;
    setState((s) => ({ task: { ...s.task, transcript: val } }));
  }
  function onImprovedChange(e) {
    const val = e.target.value;
    setState((s) => ({ task: { ...s.task, improved: val } }));
  }
  function onScoreChange(e) {
    const val = Number(e.target.value) || null;
    setState((s) => ({ task: { ...s.task, score: val } }));
  }
  // Save the spoken response (transcript + recording) to the saved-answers
  // list; the audio goes to IndexedDB under the same id.
  function saveSpeakingAnswer() {
    const s = stateRef.current;
    const t = s.task;
    if (!t || t.kind !== 'speaking' || !(t.transcript.trim() || t.audioBlob || t.improved.trim())) return;
    const task = getTask(s.activeSection, s.activeTaskIndex);
    const item = task.bank[s.itemIndex];
    const id = t.savedId || `ans-${Date.now()}`;
    if (t.audioBlob && !t.savedId) putAudio(id, t.audioBlob).catch(() => {});
    const entry = {
      id,
      taskId: task.id,
      itemId: item.id,
      text: t.transcript,
      words: (t.transcript.trim().match(/\S+/g) || []).length,
      audio: !!t.audioBlob,
      improved: t.improved.trim() ? t.improved : undefined,
      score: t.score || undefined,
      date: new Date().toISOString(),
    };
    const answers = [entry, ...s.answers.filter((a) => a.id !== id)];
    if (s.user) saveAnswers(s.user.email, answers);
    setState((st) => ({ answers, task: { ...st.task, savedId: id } }));
  }
  // Practice-only: run the same question again from the start, keeping the
  // prep notes the user already wrote.
  function retryTask() {
    const s = stateRef.current;
    const notes = s.task && s.task.kind === 'speaking' ? s.task.notes : '';
    setState({ task: { ...freshTaskState(s.activeSection, s.activeTaskIndex, 'practice'), notes } });
  }
  // Practice-only: throw this speaking attempt away (recording, transcript and
  // its saved answer, if any) and start the same question again.
  function deleteSpeakingAttempt() {
    const t = stateRef.current.task;
    if (!t || t.kind !== 'speaking') return;
    if (!window.confirm('Delete this recording? It cannot be undone.')) return;
    if (t.savedId) deleteSavedAnswer(t.savedId);
    retryTask();
  }

  // Leaving a speaking response any other way (back link, new question, exam
  // step) discards the live capture so the mic is released.
  useEffect(() => {
    const t = stateRef.current.task;
    const live = stateRef.current.view === 'task' && t && t.kind === 'speaking' && t.phase === 'response';
    if (captureRef.current && !live) {
      captureRef.current.abort();
      captureRef.current = null;
    }
    // Free the previous recording's object URL once the task no longer shows
    // it (retry, new question, leaving the task).
    const url = t && t.audioUrl ? t.audioUrl : null;
    if (audioUrlRef.current && audioUrlRef.current !== url) URL.revokeObjectURL(audioUrlRef.current);
    audioUrlRef.current = url;
  });

  // ---------- VIEW MODEL ----------
  const s = stateRef.current;

  if (s.screen === 'auth') {
    return (
      <AuthScreen
        v={{
          authMode: s.authMode,
          setAuthMode,
          authEmail: s.authEmail,
          authPassword: s.authPassword,
          onAuthEmailChange: (e) => setState({ authEmail: e.target.value }),
          onAuthPasswordChange: (e) => setState({ authPassword: e.target.value }),
          authName: s.authName,
          onAuthNameChange: (e) => setState({ authName: e.target.value }),
          hasAuthError: !!s.authError,
          authError: s.authError,
          authSubmitLabel: s.authMode === 'signin' ? 'Sign in' : 'Create account',
          submitAuth,
        }}
      />
    );
  }

  const target = s.user ? s.user.target : null;
  const scoreRows = SECTION_LIST.map((sec) => {
    const summary = sectionSummary(s.scores[sec.id]);
    // Writing and Speaking aren't scored, so show practice activity instead.
    if (!sec.tasks.some((t) => t.kind === 'mcq')) {
      const saved = s.answers.filter((a) => sec.tasks.some((t) => t.id === a.taskId));
      if (!saved.length) return { name: sec.name, detail: 'No answers saved yet', clbLabel: '—', tone: { bg: color.surfaceMuted, color: color.textMuted }, dotColor: color.borderStrong };
      const last = saved.reduce((m, a) => (a.date > m ? a.date : m), saved[0].date);
      const detail = `${saved.length} answer${saved.length > 1 ? 's' : ''} saved · last ${daysAgoLabel(last)}`;
      // Levels the user gave their own answers, averaged.
      const rated = saved.filter((a) => a.score);
      if (rated.length) {
        const avg = Math.round(rated.reduce((n, a) => n + a.score, 0) / rated.length);
        return { name: sec.name, detail: `${detail} · your average of ${rated.length} rated`, clbLabel: `Level ${avg}`, tone: clbBandInfo(avg), dotColor: color.primary };
      }
      return { name: sec.name, detail, clbLabel: 'Not scored', tone: { bg: color.surfaceMuted, color: color.textSecondary }, dotColor: color.primary };
    }
    if (!summary) return { name: sec.name, detail: 'No attempts yet', clbLabel: '—', tone: { bg: color.surfaceMuted, color: color.textMuted }, dotColor: color.borderStrong };
    let targetNote = null;
    if (target) {
      const gap = target - summary.clb;
      targetNote = gap <= 0 ? { label: 'Target met', color: color.success } : { label: `${gap} to target`, color: color.textMuted };
    }
    return { id: sec.id, name: sec.name, detail: summary.detail, clbLabel: 'CLB ' + summary.clb, tone: clbBandInfo(summary.clb), dotColor: color.primary, targetNote, resettable: true };
  });

  // Suggest the scored section furthest below target (or lowest, with no
  // target); an unattempted scored section comes first. Null when all are met.
  let focusSection = null;
  let focusGap = 0;
  for (const sec of SECTION_LIST) {
    if (!sec.tasks.some((t) => t.kind === 'mcq')) continue;
    const summary = sectionSummary(s.scores[sec.id]);
    if (!summary) {
      focusSection = { id: sec.id, name: sec.name, note: 'not tried yet' };
      break;
    }
    const gap = (target || 13) - summary.clb;
    if (gap > focusGap) {
      focusGap = gap;
      focusSection = { id: sec.id, name: sec.name, note: target ? `${gap} to target` : `CLB ${summary.clb}` };
    }
  }

  const activityDates = [
    ...Object.values(s.scores).flatMap((byTask) => Object.values(byTask).map((r) => r.date)),
    ...s.answers.map((a) => a.date),
  ].filter(Boolean);
  const lastPractice = activityDates.length ? daysAgoLabel(activityDates.reduce((m, d) => (d > m ? d : m))) : null;

  const activeSectionObj = s.activeSection ? SECTIONS[s.activeSection] : null;
  const activeTask = s.activeTaskIndex != null && activeSectionObj ? activeSectionObj.tasks[s.activeTaskIndex] : null;
  const activeItem = activeTask && s.itemIndex != null ? activeTask.bank[s.itemIndex] : null;

  // Exam continue-gating.
  let continueDisabled = false;
  if (s.mode === 'full' && s.task) {
    const t = s.task;
    if (t.kind === 'mcq') continueDisabled = !t.submitted;
    else if (t.kind === 'writing') continueDisabled = !(t.text.trim() || t.timeLeft === 0);
    else if (t.kind === 'speaking') continueDisabled = t.phase !== 'review';
  }
  if (s.mode === 'full' && s.view === 'videoMock' && s.mock) continueDisabled = !s.mock.checked;
  const isLastExamStep = s.mode === 'full' && s.exam.step >= s.exam.seq.length - 1;

  // Report rows.
  const mockSection = s.mock ? SECTIONS[s.mock.section] : null;
  const mockItem = mockSection ? mockSection.videoMocks[s.mock.index] : null;

  const examScope = s.exam.scope ? SECTIONS[s.exam.scope] : null;
  // Listening / Reading are scored from this run's video mocks only.
  const reportRows = (examScope ? [examScope] : SECTION_LIST).map((sec) => {
    const res = s.exam.results[sec.id];
    const detail = res ? `${res.correct} / ${res.total} correct · ${res.label}` : sec.videoMocks ? 'Not attempted' : 'Not scored — compare your answers with the model answers';
    return { name: sec.name, clb: res ? res.clb : '—', detail, tone: clbBandInfo(res ? res.clb : 0) };
  });
  const clbNums = reportRows.map((r) => r.clb).filter((x) => typeof x === 'number');
  const overallClb = clbNums.length ? Math.round(clbNums.reduce((a, b) => a + b, 0) / clbNums.length) : '—';

  const v = {
    // user / nav
    userName: s.user ? s.user.name : '',
    vocab: s.vocab,
    addVocab,
    deleteVocab,
    userFirstName: s.user && s.user.name ? s.user.name.split(' ')[0] : '',
    userEmail: s.user ? s.user.email : '',
    userInitials: s.user ? (s.user.name || s.user.email).split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase() : '',
    userTarget: target,
    userTestDate: s.user ? s.user.testDate : null,
    focusSection,
    lastPractice,
    updateProfile,
    signOut,
    goDashboard,
    goSectionList,
    goProfile,
    goTaskList,
    toggleCLBPanel,
    showCLBPanel: s.showCLBPanel,
    clbBands: CLB_BANDS,

    // dashboard
    sections: SECTION_LIST,
    sectionStyle: sectionTone,
    examOrderLabels: EXAM_ORDER.map((k) => SECTIONS[k].name),
    scoreRows,
    resetSectionScores,
    startFullExam,
    openSection,

    // task list
    activeSectionObj,
    openTask,
    startSectionRun,
    savedAnswers: s.answers,
    scores: s.scores,
    deleteScore,
    exams: s.exams,
    deleteExam,
    deleteSavedAnswer,
    updateSavedAnswer,
    goAnswers,
    answersFilter: s.answersFilter,
    setAnswersFilter: (f) => setState({ answersFilter: f }),

    // video mock (listening)
    mockSection,
    videoMocks: mockSection ? mockSection.videoMocks : [],
    mock: s.mock,
    mockItem: mockItem,
    mockKey: mockItem ? parseAnswerKey(mockItem.answers) : null,
    mockPart: s.mock ? s.mock.part : null,
    mockParts: !mockSection ? [] : s.mock.part != null ? [mockSection.mockParts[s.mock.part]] : mockSection.mockParts,
    mockFirstQ: mockSection && s.mock.part != null ? mockPartStart(mockSection.mockParts, s.mock.part) : 1,
    startVideoMock,
    selectVideoMock,
    setMockAnswer,
    checkVideoMock,

    // task
    mode: s.mode,
    isFull: s.mode === 'full',
    isPractice: s.mode === 'practice',
    section: activeSectionObj,
    task: activeTask,
    item: activeItem,
    itemFilter: s.itemFilter,
    taskState: s.task,
    fmtTime,
    clbFromPercent,
    handlers: {
      selectOption,
      submitMcq,
      toggleTimer,
      rerollItem,
      pickItemFilter,
      onWritingText,
      chooseSurveyOption,
      toggleSample,
      saveWritingAnswer,
      onNotesChange,
      startSpeakingPrep,
      startSpeakingResponse,
      endSpeakingResponse,
      onTranscriptChange,
      onImprovedChange,
      onScoreChange,
      saveSpeakingAnswer,
      retryTask,
      deleteSpeakingAttempt,
    },

    // exam
    examStep: s.exam.step + 1,
    exitExam,
    examTotal: s.exam.seq.length,
    beginFullExam,
    continueExam,
    continueDisabled,
    examScope,
    continueBtnLabel: isLastExamStep ? (examScope ? 'Finish section & see results' : 'Finish exam & see report') : 'Continue to next task →',

    // report
    reportRows,
    overallClb,
  };

  return (
    <AppShell v={v}>
      {s.view === 'dashboard' && <Dashboard v={v} />}
      {s.view === 'sectionList' && <SectionList v={v} />}
      {s.view === 'taskList' && <TaskList v={v} />}
      {s.view === 'task' && <TaskScreen v={v} />}
      {s.view === 'videoMock' && s.mock && <VideoMockScreen v={v} />}
      {s.view === 'examIntro' && <ExamIntro v={v} />}
      {s.view === 'report' && <ReportScreen v={v} />}
      {s.view === 'profile' && <ProfileScreen v={v} />}
      {s.view === 'answers' && <MyAnswersScreen v={v} />}
    </AppShell>
  );
}
