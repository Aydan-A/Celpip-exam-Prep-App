import { listening } from './listening.js';
import { reading } from './reading.js';
import { writing } from './writing.js';
import { speaking } from './speaking.js';
import { VIDEO_MOCKS, LISTENING_MOCK_PARTS, parseAnswerKey } from './videoMocks.js';
import { READING_VIDEO_MOCKS, READING_MOCK_PARTS } from './readingVideoMocks.js';

// Listening and Reading run on full video mock tests (whole test or one part),
// in Test Yourself and in full-exam mode alike.
listening.videoMocks = VIDEO_MOCKS;
listening.mockParts = LISTENING_MOCK_PARTS;
reading.videoMocks = READING_VIDEO_MOCKS;
reading.mockParts = READING_MOCK_PARTS;

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

// Full-length exam: every task in order, one random item per task. Sections
// with video mocks (Listening, Reading) are one step each: a random whole
// mock test that has an answer key. Pass a section id to run just that
// section's parts in order.
export function buildFullExamSequence(onlySection) {
  const seq = [];
  (onlySection ? [onlySection] : EXAM_ORDER).forEach((section) => {
    const { videoMocks } = SECTIONS[section];
    if (videoMocks) {
      const keyed = videoMocks.map((_, i) => i).filter((i) => parseAnswerKey(videoMocks[i].answers));
      seq.push({ section, mockIndex: keyed[Math.floor(Math.random() * keyed.length)] });
      return;
    }
    SECTIONS[section].tasks.forEach((task, taskIndex) => {
      const itemIndex = Math.floor(Math.random() * task.bank.length);
      seq.push({ section, taskIndex, itemIndex });
    });
  });
  return seq;
}

// First question number (1-based) of a video mock part.
export function mockPartStart(parts, partIndex) {
  return parts.slice(0, partIndex).reduce((n, p) => n + p.count, 0) + 1;
}
