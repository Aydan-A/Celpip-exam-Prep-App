// Speaking — 8 official CELPIP tasks. Each task holds a bank of `speaking`
// items with prep/response timing. Image-based tasks carry an `image` field
// (null until a picture is supplied).
import { SPEAKING_GIVING_ADVICE, GIVING_ADVICE_TOPICS } from './banks/speaking-giving-advice.js';
import { SPEAKING_PERSONAL_EXPERIENCE } from './banks/speaking-personal-experience.js';

// Scene pictures (supplied by the user), shared by Parts 3 and 4.
const SCENE_PICTURES = [
  '/images/speaking/scene/scene-1-station.jpg',
  '/images/speaking/scene/scene-2-park.png',
  '/images/speaking/scene/scene-3-art-class.jpg',
  '/images/speaking/scene/scene-4-cinema.png',
];

const singleBank = (id, prompt, image = null) => [{ id, prompt, image }];

export const speaking = {
  id: 'speaking',
  name: 'Speaking',
  order: 3,
  official: { duration: '15–20 min', parts: 8, questions: 8 },
  criteria: ['Content', 'Vocabulary', 'Listenability', 'Task Fulfillment'],
  tips: [
    'Structure your response with a clear beginning, middle, and end.',
    'Use a range of vocabulary rather than repeating the same words.',
    'Make sure you fully answer what the prompt asks.',
  ],
  tasks: [
    {
      id: 'spk-advice',
      name: 'Giving Advice',
      kind: 'speaking',
      taskNumber: 1,
      prepSec: 30,
      responseSec: 90,
      instructions: 'A friend or family member has a problem. Give them advice on what to do.',
      // Every question has one `topic`, used by the practice filter.
      filter: { key: 'topic', label: 'Topic', values: GIVING_ADVICE_TOPICS },
      bank: SPEAKING_GIVING_ADVICE.map(({ topic, prompt }, i) => ({ id: `sa-${String(i + 1).padStart(3, '0')}`, topic, prompt, image: null })),
    },
    {
      id: 'spk-personal',
      name: 'Talking about a Personal Experience',
      kind: 'speaking',
      taskNumber: 2,
      prepSec: 30,
      responseSec: 60,
      instructions: 'Talk about a personal experience. Describe what happened and how it affected you.',
      bank: SPEAKING_PERSONAL_EXPERIENCE.map((prompt, i) => ({ id: `sp-${String(i + 1).padStart(3, '0')}`, prompt, image: null })),
    },
    {
      id: 'spk-scene',
      name: 'Describing a Scene',
      kind: 'speaking',
      taskNumber: 3,
      prepSec: 30,
      responseSec: 60,
      instructions: 'Describe what you see in the picture in as much detail as you can.',
      // Pictures supplied by the user; the task is picture-only, like the real test.
      bank: SCENE_PICTURES.map((image, i) => ({ id: `sc-${String(i + 1).padStart(3, '0')}`, prompt: null, image })),
      tips: [
        'Open with one sentence that sums up the scene — where it is and what is going on overall.',
        'Move through the picture in a clear order (left to right, or front to back) and say where things are: "on the left", "in the background", "next to the ticket counter".',
        'Describe what people are doing with the present continuous: "a woman is rushing onto the train", "two children are painting".',
        'Add what you can guess from the picture: feelings and reasons ("she looks stressed — she is probably running late").',
        'Choose 4–5 interesting details and describe them well instead of listing everything you see.',
        'Use precise words for the place (platform, turnstile, easel, box office) rather than "thing" or "stuff".',
        'Speak to someone who cannot see the picture, and keep going for the full 60 seconds — if you finish early, add colours, clothes, or background details.',
      ],
    },
    {
      id: 'spk-predictions',
      name: 'Making Predictions',
      kind: 'speaking',
      taskNumber: 4,
      prepSec: 30,
      responseSec: 60,
      instructions: 'Look at the picture and predict what will happen next.',
      // As in the real test, Part 4 uses the same pictures as Part 3; in a full
      // mock it shows the very picture you just described.
      sameItemAs: 'spk-scene',
      bank: SCENE_PICTURES.map((image, i) => ({ id: `sp4-${String(i + 1).padStart(3, '0')}`, prompt: null, image })),
      tips: [
        'Talk about the future, not what you see now — use "is going to", "will", "might", and "will probably".',
        'Pick 3–4 people or groups from the picture and predict what happens to each of them next.',
        'Base each prediction on a clue in the picture and say what it is: "because the train doors are closing, she will probably…".',
        'Mix certain and uncertain predictions: "she is definitely going to miss…", "he might…", "it is likely that…".',
        'Add a result or consequence for each prediction to make your answer longer and more detailed.',
        'Keep a clear order — move around the picture the same way you did in Part 3.',
        'Keep speaking for the full 60 seconds; if you run out, predict what happens later that day.',
      ],
    },
    {
      id: 'spk-compare',
      name: 'Comparing and Persuading',
      kind: 'speaking',
      taskNumber: 5,
      prepSec: 60,
      responseSec: 60,
      instructions: 'Compare the two options, choose one, and persuade the listener to agree with your choice.',
      bank: singleBank(
        'sp5-001',
        'Compare living in a large city versus a small town. Choose one and persuade a friend that they should move there.',
      ),
    },
    {
      id: 'spk-difficult',
      name: 'Dealing with a Difficult Situation',
      kind: 'speaking',
      taskNumber: 6,
      prepSec: 60,
      responseSec: 60,
      instructions: 'You are in a difficult situation. Explain the situation and how you would deal with it.',
      bank: singleBank(
        'sp6-001',
        "You booked a hotel room online, but on arrival there is no record of your reservation. Explain the situation to the front desk and how you would like it resolved.",
      ),
    },
    {
      id: 'spk-opinions',
      name: 'Expressing Opinions',
      kind: 'speaking',
      taskNumber: 7,
      prepSec: 30,
      responseSec: 90,
      instructions: 'Give your opinion on the topic and support it with reasons.',
      bank: singleBank(
        'sp7-001',
        'Some people believe employees should be allowed to work from home permanently. Give your opinion on this and explain your reasons.',
      ),
    },
    {
      id: 'spk-unusual',
      name: 'Describing an Unusual Situation',
      kind: 'speaking',
      taskNumber: 8,
      prepSec: 30,
      responseSec: 60,
      instructions: 'Describe the unusual situation in the picture to someone who cannot see it.',
      bank: singleBank(
        'sp8-001',
        'Describe an unusual situation where a delivery arrived at the wrong address with an unexpected item inside. Explain what happened and what was strange about it.',
      ),
    },
  ],
};
