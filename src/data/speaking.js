// Speaking — 8 official CELPIP tasks. Each task holds a bank of `speaking`
// items with prep/response timing. Image-based tasks carry an `image` field
// (null until a picture is supplied).
import { SPEAKING_GIVING_ADVICE, GIVING_ADVICE_TOPICS } from './banks/speaking-giving-advice.js';
import { SPEAKING_PERSONAL_EXPERIENCE } from './banks/speaking-personal-experience.js';
import { SPEAKING_DIFFICULT_SITUATION, DIFFICULT_SITUATION_TOPICS } from './banks/speaking-difficult-situation.js';
import { SPEAKING_EXPRESSING_OPINIONS, EXPRESSING_OPINIONS_TOPICS } from './banks/speaking-expressing-opinions.js';

// Pictures supplied by the user. Parts 3 and 4 both draw from all of them.
const SCENE_PICTURES = [
  '/images/speaking/scene/scene-1-station.jpg',
  '/images/speaking/scene/scene-2-park.png',
  '/images/speaking/scene/scene-3-art-class.jpg',
  '/images/speaking/scene/scene-4-cinema.png',
  '/images/speaking/scene/scene-5-hotel-lobby.jpg',
];

const PREDICTION_PICTURES = [
  '/images/speaking/predictions/pred-01-family-park.webp',
  '/images/speaking/predictions/pred-02-living-room.png',
  '/images/speaking/predictions/pred-03-park-picnic.png',
  '/images/speaking/predictions/pred-04-clothes-shop.png',
  '/images/speaking/predictions/pred-05-park-pond.png',
  '/images/speaking/predictions/pred-06-kitchen.png',
  '/images/speaking/predictions/pred-07-garden.png',
  '/images/speaking/predictions/pred-08-night-campsite.png',
  '/images/speaking/predictions/pred-09-beach.jpg',
  '/images/speaking/predictions/pred-10-classroom.jpg',
  '/images/speaking/predictions/pred-11-snowy-street.webp',
  '/images/speaking/predictions/pred-12-riverside.jpg',
  '/images/speaking/predictions/pred-13-cafe.jpg',
];

// Option screens for Part 5 (supplied by the user).
const COMPARE_PICTURES = [
  '/images/speaking/compare/cmp-01-volleyball-biking.jpg',
  '/images/speaking/compare/cmp-02-delivery-food-court.jpg',
  '/images/speaking/compare/cmp-03-mini-fan-floor-fan.jpg',
  '/images/speaking/compare/cmp-04-consignment-food-court.jpg',
  '/images/speaking/compare/cmp-05-floor-fan-ceiling-fan.jpg',
  '/images/speaking/compare/cmp-06-motel-airport-inn.jpg',
  '/images/speaking/compare/cmp-07-social-media-sports.png',
  '/images/speaking/compare/cmp-08-house-charity.webp',
  '/images/speaking/compare/cmp-09-vegan-fast-food.webp',
  '/images/speaking/compare/cmp-10-hotel-bungalow.webp',
  '/images/speaking/compare/cmp-11-plane-train.jpg',
];

// Unusual objects and places for Part 8 (supplied by the user).
const UNUSUAL_PICTURES = [
  '/images/speaking/unusual/un-01-deer-antlers.webp',
  '/images/speaking/unusual/un-02-upside-down-house.jpg',
  '/images/speaking/unusual/un-03-dancing-house.jpg',
  '/images/speaking/unusual/un-04-fish-phone-booth.jpg',
  '/images/speaking/unusual/un-05-egg-roof.jpg',
  '/images/speaking/unusual/un-06-river-rock-house.jpg',
  '/images/speaking/unusual/un-07-zigzag-bed.jpg',
  '/images/speaking/unusual/un-08-watermelon-table.webp',
  '/images/speaking/unusual/un-09-suitcase-aquarium.png',
  '/images/speaking/unusual/un-10-upside-down-room.png',
  '/images/speaking/unusual/un-11-sidewalk-chalk-art.png',
  '/images/speaking/unusual/un-12-octopus-balloon.png',
  '/images/speaking/unusual/un-13-car-garden.png',
  '/images/speaking/unusual/un-14-fairy-on-robin.webp',
  '/images/speaking/unusual/un-15-fish-building.jpg',
  '/images/speaking/unusual/un-16-castle-tower.jpg',
  '/images/speaking/unusual/un-17-snail-house.png',
  '/images/speaking/unusual/un-18-candy-playground.jpg',
  '/images/speaking/unusual/un-19-blue-reading-chair.webp',
  '/images/speaking/unusual/un-20-basket-building.jpg',
];

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
      tips: [
        'Speak to the person directly — Use their name or role and "you": "Hi Anna, I know you are worried about…". Do not describe the advice to the examiner.',
        'Show you understand the problem — Open by restating their situation in one sentence so the listener knows you heard them.',
        'Give 2–3 pieces of advice — Each one needs a reason and an example or result: "You should talk to your manager first, because…".',
        'Vary how you advise — Mix "You should…", "I would suggest…", "Why don\'t you…", "It might be a good idea to…" and "If I were you, I would…".',
        'Use the 90 seconds — Plan your points in the 30-second prep; spend about 30 seconds on each idea rather than rushing through a list.',
        'Close warmly — Finish with encouragement: "I am sure it will work out. Let me know how it goes!"',
      ],
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
      tips: [
        'Pick one real moment fast — Choose a specific event you remember well in the first few seconds of prep; a simple true story is easier to tell in detail.',
        'Set the scene — Say when, where and who was there: "Two years ago, when I had just moved to Toronto, my neighbour…".',
        'Tell it in order — Use time words to guide the listener: "At first…", "Then…", "After that…", "In the end…".',
        'Use past tenses correctly — Simple past for events, past continuous for background: "I was waiting for the bus when it started to snow."',
        'Add feelings and details — Say how you felt at each stage and include one or two vivid details that make the story real.',
        'Answer every part of the question — If it asks what you learned or how it changed you, finish with that in one or two clear sentences.',
      ],
    },
    {
      id: 'spk-scene',
      name: 'Describing a Scene',
      kind: 'speaking',
      taskNumber: 3,
      prepSec: 30,
      responseSec: 60,
      instructions: 'Describe what you see in the picture in as much detail as you can.',
      // Picture-only, like the real test.
      bank: [...SCENE_PICTURES, ...PREDICTION_PICTURES].map((image, i) => ({ id: `sc-${String(i + 1).padStart(3, '0')}`, prompt: null, image })),
      tips: [
        'Open with a summary — One sentence that sums up the scene: where it is and what is going on overall.',
        'Follow a clear order — Move through the picture left to right, or front to back, and say where things are: "on the left", "in the background", "next to the ticket counter".',
        'Use the present continuous — Describe what people are doing: "a woman is rushing onto the train", "two children are painting".',
        'Add what you can guess — Mention feelings and reasons: "she looks stressed; she is probably running late".',
        'Choose 4–5 details — Describe a few interesting things well instead of listing everything you see.',
        'Use precise words — Name the place and objects (platform, turnstile, easel, box office) rather than "thing" or "stuff".',
        'Fill the full 60 seconds — Speak to someone who cannot see the picture; if you finish early, add colours, clothes, or background details.',
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
      // Same pictures as Part 3, in a different order so earlier saved ids still match.
      bank: [...PREDICTION_PICTURES, ...SCENE_PICTURES].map((image, i) => ({ id: `pr-${String(i + 1).padStart(3, '0')}`, prompt: null, image })),
      tips: [
        'Talk about the future — Not what you see now; use "is going to", "will", "might", and "will probably".',
        'Pick 3–4 people or groups — Predict what happens to each of them next.',
        'Base predictions on clues — Say what the clue in the picture is: "because the pot is boiling over, she will probably…".',
        'Mix certain and uncertain — "she is definitely going to miss…", "he might…", "it is likely that…".',
        'Add a consequence — Give a result for each prediction to make your answer longer and more detailed.',
        'Keep a clear order — Move around the picture from left to right, or front to back.',
        'Fill the full 60 seconds — If you run out, predict what happens later that day.',
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
      // Screenshots supplied by the user; each shows both options and the task text.
      bank: COMPARE_PICTURES.map((image, i) => ({ id: `sp5-${String(i + 1).padStart(3, '0')}`, prompt: null, image })),
      tips: [
        'State your choice at once — Open with which option you prefer so the listener knows your position from the first sentence.',
        'Compare, do not just describe — Put the options side by side on the same features: price, size, location, time, quality.',
        'Use the details shown — Quote the actual numbers and facts in the picture: "It is $200 cheaper and only ten minutes from our home."',
        'Use comparative language — "cheaper than", "much more convenient", "not as expensive as", "whereas", "on the other hand".',
        'Answer the other side — Admit one advantage of the other option, then explain why yours is still better.',
        'Persuade the listener — Speak to them directly and link your reasons to their needs: "Since you work from home, you would really benefit from…".',
        'Finish with a clear request — "So I really think we should go with…. What do you say?"',
      ],
    },
    {
      id: 'spk-difficult',
      name: 'Dealing with a Difficult Situation',
      kind: 'speaking',
      taskNumber: 6,
      prepSec: 60,
      responseSec: 60,
      instructions: 'You are in a difficult situation. Choose ONE of the two options and talk to that person.',
      filter: { key: 'topic', label: 'Topic', values: DIFFICULT_SITUATION_TOPICS },
      bank: SPEAKING_DIFFICULT_SITUATION.map((q, i) => ({ id: `sd-${String(i + 1).padStart(3, '0')}`, ...q, image: null })),
      tipsTitle: '4-Step Response Structure',
      tipsOrdered: true,
      tips: [
        'Acknowledge the problem — Start by showing you understand what went wrong or what the dilemma is.',
        'Show empathy / Apologize — Use polite, respectful language to express regret for the inconvenience.',
        'Make a clear decision — State your choice clearly and explain your reasoning with natural phrasing.',
        'Offer a solution / Friendly closing — Suggest a next step or alternative, and finish with a warm closing like "Thank you for understanding."',
      ],
    },
    {
      id: 'spk-opinions',
      name: 'Expressing Opinions',
      kind: 'speaking',
      taskNumber: 7,
      prepSec: 30,
      responseSec: 90,
      instructions: 'Answer the following question. Give your opinion and support it with reasons.',
      filter: { key: 'topic', label: 'Topic', values: EXPRESSING_OPINIONS_TOPICS },
      bank: SPEAKING_EXPRESSING_OPINIONS.map((q, i) => ({ id: `so-${String(i + 1).padStart(3, '0')}`, ...q, image: null })),
      tipsTitle: 'Top Strategies for Task 7',
      tips: [
        'Pick a firm side immediately — Do not say "it depends". Choose "yes" or "no" and defend that stance completely.',
        'Use the 1-3-1 structure — Start with your clear opinion, give two main points with examples or a brief concession to the opposing view, and finish with a strong final sentence.',
        'Manage the 90-second duration — 90 seconds is a long time to fill. Avoid diving too deep into just one single point, which leads to repeating yourself. Instead, spread your time across two or three distinct reasons.',
        'Use the ESP brainstorming trick — During your 30-second prep, quickly think of Economic (money/cost), Social (relationships/people), and Personal (health/daily life) angles to build distinct talking points.',
        'Upgrade your vocabulary — Use precise, natural everyday language and transition markers like "First," "Secondly," "On top of that," and "To wrap it all up" rather than over-complicated idioms or poetic proverbs.',
      ],
    },
    {
      id: 'spk-unusual',
      name: 'Describing an Unusual Situation',
      kind: 'speaking',
      taskNumber: 8,
      prepSec: 30,
      responseSec: 60,
      instructions: 'Describe the unusual situation in the picture to someone who cannot see it.',
      // Picture-only, like the real test.
      bank: UNUSUAL_PICTURES.map((image, i) => ({ id: `su-${String(i + 1).padStart(3, '0')}`, prompt: null, image })),
      tips: [
        'Imagine a phone call — The listener cannot see the picture, so they must be able to picture it from your words alone.',
        'Say what makes it unusual — Start with one sentence: "It is a bed, but the mattress is shaped like a zigzag."',
        'Describe shape, size, colours and materials — Then say where the parts are: "on top", "underneath", "on the left side".',
        'Compare it with something ordinary — "it looks like a normal phone booth, but it is full of water and fish".',
        'Point out what is strange and why — What is missing, upside down, or in the wrong place.',
        'Describe reactions — If people appear in the picture, say how they are reacting to it.',
        'Fill the full 60 seconds — Add small details like signs, labels or the setting around it.',
      ],
    },
  ],
};
