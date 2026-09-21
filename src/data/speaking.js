// Speaking — 8 official CELPIP tasks. Each task holds a bank of `speaking`
// items with prep/response timing. Image-based tasks carry an `image` field
// (null until a picture is supplied).
import { SPEAKING_PERSONAL_EXPERIENCE } from './banks/speaking-personal-experience.js';

const singleBank = (id, prompt, image = null) => [{ id, prompt, image }];

export const speaking = {
  id: 'speaking',
  name: 'Speaking',
  order: 3,
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
      bank: singleBank(
        'sa-001',
        'A friend is deciding between two job offers — one with higher pay but a long commute, and one closer to home with better work-life balance. Give your friend advice on which to choose and why.',
      ),
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
      bank: singleBank(
        'sc-001',
        "Describe what you imagine is happening in a busy farmers' market on a Saturday morning. Talk about the people, the setting, and what is going on.",
      ),
    },
    {
      id: 'spk-predictions',
      name: 'Making Predictions',
      kind: 'speaking',
      taskNumber: 4,
      prepSec: 30,
      responseSec: 60,
      instructions: 'Look at the picture and predict what will happen next.',
      bank: singleBank(
        'sp4-001',
        'Imagine a half-finished building site. Predict what the completed building will be used for and why, and what will happen there once it opens.',
      ),
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
