import { useEffect, useReducer, useRef } from 'react';
import {
  SECTIONS,
  SECTION_LIST,
  EXAM_ORDER,
  getTask,
  randomItemIndex,
  buildFullExamSequence,
  VIDEO_MOCKS,
  parseAnswerKey,
} from '../data/index.js';
import { fmtTime, clbFromPercent, clbFromScore12, clbBandInfo, CLB_BANDS } from '../lib/clb.js';
import { sectionSummary } from '../lib/scoring.js';
import { loadUser, saveUser, clearUser, loadScores, saveScores } from '../lib/storage.js';
import { getFeedback } from '../lib/ai.js';
import { color, sectionTone } from '../design-system/index.js';

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

// Transient per-task state, keyed by the task's `kind`. In full-exam mode the
// timer starts running immediately; in practice it is off until toggled.
function freshTaskState(sectionId, taskIndex, mode) {
  const task = getTask(sectionId, taskIndex);
  const running = mode === 'full';
  if (task.kind === 'mcq') {
    return { kind: 'mcq', answers: [], submitted: false, timeLeft: (task.minutes || 10) * 60, timerEnabled: running, running };
  }
  if (task.kind === 'writing') {
    return { kind: 'writing', text: '', feedback: null, loading: false, error: null, timeLeft: (task.minutes || 27) * 60, timerEnabled: running, running };
  }
  // speaking
  return {
    kind: 'speaking',
    phase: 'idle', // idle → prep → response → review
    prepLeft: task.prepSec,
    respLeft: task.responseSec,
    running: false,
    notes: '',
    transcript: '',
    feedback: null,
    loading: false,
    error: null,
  };
}

function initialState() {
  return {
    screen: 'auth',
    authMode: 'signin',
    authEmail: '',
    authPassword: '',
    authError: '',
    user: null,
    // dashboard | sectionList | taskList | task | videoMock | examIntro | report | profile
    view: 'dashboard',
    mode: null, // null | practice | full
    activeSection: null,
    activeTaskIndex: null,
    itemIndex: null,
    task: null,
    mock: null, // videoMock state: { index, answers: {qNum: letter}, checked, result }
    exam: { seq: [], step: 0 },
    scores: {}, // { [sectionId]: { [taskId]: result } }
    showCLBPanel: false,
  };
}

export default function App() {
  // Class-component-style mutable state: a ref is the source of truth so nested
  // setState calls and post-commit callbacks read the latest value; a reducer
  // forces re-renders.
  const stateRef = useRef(initialState());
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
      setState({ screen: 'app', user: savedUser, scores: loadScores(savedUser.email) });
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
        else setState({ task: { ...t, phase: 'response', prepLeft: 0, respLeft: task.responseSec, running: true } });
      } else if (t.phase === 'response') {
        if (t.respLeft > 1) setState({ task: { ...t, respLeft: t.respLeft - 1 } });
        else setState({ task: { ...t, phase: 'review', respLeft: 0, running: false } });
      }
    }
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
    const namePart = email.split('@')[0].replace(/[._]/g, ' ');
    const name = namePart.replace(/\b\w/g, (c) => c.toUpperCase());
    const user = { name, email };
    saveUser(user);
    setState({ screen: 'app', user, scores: loadScores(email), authError: '' });
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
    setState({ view: 'dashboard', mode: null, activeSection: null, activeTaskIndex: null, task: null });
  }
  function goSectionList() {
    setState({ view: 'sectionList', mode: null });
  }
  function goProfile() {
    setState({ view: 'profile' });
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
    setState({ view: 'task', mode: 'practice', activeTaskIndex: taskIndex, itemIndex, task: freshTaskState(sectionId, taskIndex, 'practice') });
  }
  // Practice-only: swap in a different random item from the same task bank.
  function rerollItem() {
    const s = stateRef.current;
    const bank = getTask(s.activeSection, s.activeTaskIndex).bank;
    let next = s.itemIndex;
    if (bank.length > 1) while (next === s.itemIndex) next = Math.floor(Math.random() * bank.length);
    setState({ itemIndex: next, task: freshTaskState(s.activeSection, s.activeTaskIndex, 'practice') });
  }

  // ---------- VIDEO MOCK (Listening) ----------
  function startVideoMock(index) {
    const i = index != null ? index : Math.floor(Math.random() * VIDEO_MOCKS.length);
    setState({ view: 'videoMock', mode: 'practice', mock: { index: i, answers: {}, checked: false, result: null } });
  }
  function selectVideoMock(index) {
    setState({ mock: { index, answers: {}, checked: false, result: null } });
  }
  function setMockAnswer(qNum, letter) {
    setState((s) => {
      if (!s.mock || s.mock.checked) return null;
      return { mock: { ...s.mock, answers: { ...s.mock.answers, [qNum]: letter } } };
    });
  }
  function checkVideoMock() {
    const s = stateRef.current;
    const item = VIDEO_MOCKS[s.mock.index];
    const key = parseAnswerKey(item.answers);
    if (!key) return;
    const correct = key.filter((letter, i) => s.mock.answers[i + 1] === letter).length;
    const total = key.length;
    const clb = clbFromPercent(Math.round((correct / total) * 100));
    setState({ mock: { ...s.mock, checked: true, result: { correct, total, clb } } });
    saveScore('listening', item.id, { type: 'mcq', correct, total, clb, date: new Date().toISOString() });
  }

  // ---------- FULL EXAM ----------
  function startFullExam() {
    setState({ view: 'examIntro' });
  }
  function beginFullExam() {
    const seq = buildFullExamSequence();
    setState({ view: 'task', mode: 'full', exam: { seq, step: 0 } }, () => loadExamStep(0));
  }
  function loadExamStep(step) {
    const s = stateRef.current;
    const { section, taskIndex, itemIndex } = s.exam.seq[step];
    setState({ activeSection: section, activeTaskIndex: taskIndex, itemIndex, task: freshTaskState(section, taskIndex, 'full') });
  }
  function continueExam() {
    const s = stateRef.current;
    const step = s.exam.step;
    if (step >= s.exam.seq.length - 1) {
      setState({ view: 'report', mode: null });
      return;
    }
    const next = step + 1;
    setState({ exam: { ...s.exam, step: next } }, () => loadExamStep(next));
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
  async function getWritingFeedback() {
    const s = stateRef.current;
    const t = s.task;
    const task = getTask(s.activeSection, s.activeTaskIndex);
    const item = task.bank[s.itemIndex];
    const text = t.text.trim();
    if (text.length < 20) {
      setState({ task: { ...t, error: 'Write at least a few sentences before requesting feedback.' } });
      return;
    }
    setState({ task: { ...t, loading: true, error: null } });
    try {
      const json = await getFeedback({ kind: 'writing', taskName: task.name, taskPrompt: item.prompt, text });
      setState(
        (st) => ({ task: { ...st.task, feedback: json, loading: false, running: false } }),
        () => {
          const avg = json.criteria.reduce((a, c) => a + c.score, 0) / json.criteria.length;
          saveScore(s.activeSection, task.id, { type: 'ai', avg: Math.round(avg * 10) / 10, clb: clbFromScore12(avg), date: new Date().toISOString() });
        },
      );
    } catch (e) {
      setState((st) => ({ task: { ...st.task, loading: false, error: e.message || 'Could not get AI feedback right now. Please try again.' } }));
    }
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
    setState({ task: { ...s.task, phase: 'response', running: true, respLeft: task.responseSec } });
  }
  function endSpeakingResponse() {
    setState((s) => ({ task: { ...s.task, phase: 'review', running: false } }));
  }
  function onTranscriptChange(e) {
    const val = e.target.value;
    setState((s) => ({ task: { ...s.task, transcript: val } }));
  }
  async function getSpeakingFeedback() {
    const s = stateRef.current;
    const t = s.task;
    const task = getTask(s.activeSection, s.activeTaskIndex);
    const item = task.bank[s.itemIndex];
    const text = t.transcript.trim();
    if (text.length < 20) {
      setState({ task: { ...t, error: 'Paste a transcript of at least a couple of sentences.' } });
      return;
    }
    setState({ task: { ...t, loading: true, error: null } });
    try {
      const json = await getFeedback({ kind: 'speaking', taskName: task.name, taskPrompt: item.prompt, text });
      setState(
        (st) => ({ task: { ...st.task, feedback: json, loading: false } }),
        () => {
          const avg = json.criteria.reduce((a, c) => a + c.score, 0) / json.criteria.length;
          saveScore(s.activeSection, task.id, { type: 'ai', avg: Math.round(avg * 10) / 10, clb: clbFromScore12(avg), date: new Date().toISOString() });
        },
      );
    } catch (e) {
      setState((st) => ({ task: { ...st.task, loading: false, error: e.message || 'Could not get AI feedback right now. Please try again.' } }));
    }
  }

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
          hasAuthError: !!s.authError,
          authError: s.authError,
          authSubmitLabel: s.authMode === 'signin' ? 'Sign in' : 'Create account',
          submitAuth,
        }}
      />
    );
  }

  const scoreRows = SECTION_LIST.map((sec) => {
    const summary = sectionSummary(s.scores[sec.id]);
    if (!summary) return { name: sec.name, detail: 'No attempts yet', clbLabel: '—', tone: { bg: color.surfaceMuted, color: color.textMuted }, dotColor: color.borderStrong };
    return { name: sec.name, detail: summary.detail, clbLabel: 'CLB ' + summary.clb, tone: clbBandInfo(summary.clb), dotColor: color.primary };
  });

  const activeSectionObj = s.activeSection ? SECTIONS[s.activeSection] : null;
  const activeTask = s.activeTaskIndex != null && activeSectionObj ? activeSectionObj.tasks[s.activeTaskIndex] : null;
  const activeItem = activeTask && s.itemIndex != null ? activeTask.bank[s.itemIndex] : null;

  // Exam continue-gating.
  let continueDisabled = false;
  if (s.mode === 'full' && s.task) {
    const t = s.task;
    if (t.kind === 'mcq') continueDisabled = !t.submitted;
    else if (t.kind === 'writing') continueDisabled = !(t.feedback || t.timeLeft === 0);
    else if (t.kind === 'speaking') continueDisabled = !(t.feedback || t.phase === 'review');
  }
  const isLastExamStep = s.mode === 'full' && s.exam.step >= s.exam.seq.length - 1;

  // Report rows.
  const reportRows = SECTION_LIST.map((sec) => {
    const summary = sectionSummary(s.scores[sec.id]);
    return { name: sec.name, clb: summary ? summary.clb : '—', detail: summary ? summary.detail : 'Not attempted', tone: clbBandInfo(summary ? summary.clb : 0) };
  });
  const clbNums = reportRows.map((r) => r.clb).filter((x) => typeof x === 'number');
  const overallClb = clbNums.length ? Math.round(clbNums.reduce((a, b) => a + b, 0) / clbNums.length) : '—';

  const v = {
    // user / nav
    userName: s.user ? s.user.name : '',
    userEmail: s.user ? s.user.email : '',
    userInitials: s.user ? s.user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase() : '',
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
    startFullExam,
    openSection,

    // task list
    activeSectionObj,
    openTask,

    // video mock (listening)
    videoMocks: VIDEO_MOCKS,
    mock: s.mock,
    mockItem: s.mock ? VIDEO_MOCKS[s.mock.index] : null,
    mockKey: s.mock ? parseAnswerKey(VIDEO_MOCKS[s.mock.index].answers) : null,
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
    taskState: s.task,
    fmtTime,
    clbFromPercent,
    clbFromScore12,
    handlers: {
      selectOption,
      submitMcq,
      toggleTimer,
      rerollItem,
      onWritingText,
      getWritingFeedback,
      onNotesChange,
      startSpeakingPrep,
      startSpeakingResponse,
      endSpeakingResponse,
      onTranscriptChange,
      getSpeakingFeedback,
    },

    // exam
    examStep: s.exam.step + 1,
    examTotal: s.exam.seq.length,
    beginFullExam,
    continueExam,
    continueDisabled,
    continueBtnLabel: isLastExamStep ? 'Finish exam & see report' : 'Continue to next task →',

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
    </AppShell>
  );
}
