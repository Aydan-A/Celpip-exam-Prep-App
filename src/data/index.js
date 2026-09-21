import { listening } from './listening.js';
import { reading } from './reading.js';
import { writing } from './writing.js';
import { speaking } from './speaking.js';
import { VIDEO_MOCKS } from './videoMocks.js';

// Listening practice runs on full video mock tests; the 6 task entries stay
// as informative cards (and still drive full-exam mode).
listening.videoMocks = VIDEO_MOCKS;

export const SECTIONS = { listening, reading, writing, speaking };
export { VIDEO_MOCKS, LISTENING_MOCK_PARTS, MOCK_OPTION_LETTERS, parseAnswerKey } from './videoMocks.js';
export const EXAM_ORDER = ['listening', 'reading', 'writing', 'speaking'];
export const SECTION_LIST = EXAM_ORDER.map((k) => SECTIONS[k]);

export const KIND_LABEL = { mcq: 'Multiple choice', writing: 'Written response', speaking: 'Spoken response' };

export function getTask(sectionId, taskIndex) {
  return SECTIONS[sectionId]?.tasks[taskIndex];
}

export function randomItemIndex(sectionId, taskIndex) {
  const bank = getTask(sectionId, taskIndex).bank;
  return Math.floor(Math.random() * bank.length);
}

// Full-length exam: every task in order, one random item per task.
export function buildFullExamSequence() {
  const seq = [];
  EXAM_ORDER.forEach((section) => {
    SECTIONS[section].tasks.forEach((task, taskIndex) => {
      seq.push({ section, taskIndex, itemIndex: Math.floor(Math.random() * task.bank.length) });
    });
  });
  return seq;
}
