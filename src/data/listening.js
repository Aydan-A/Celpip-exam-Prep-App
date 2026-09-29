// Listening — 6 official CELPIP parts. Each task holds a bank of `mcq` items.
// An item may carry `audio` (URL), `youtube` (fallback link), and/or a
// `passage` transcript. Until real audio is supplied, the transcript is shown.

export const listening = {
  id: 'listening',
  name: 'Listening',
  order: 0,
  // Official CELPIP-General figures (celpip.ca test format).
  official: { duration: '47–55 min', parts: 6, questions: 38 },
  criteria: [
    'Accuracy — selecting the option that matches the literal meaning of the audio',
    'Detail comprehension — catching specific facts, numbers, and names under time pressure',
  ],
  tips: [
    'Skim the questions and options before playback starts so you know what to listen for.',
    'Jot down numbers, names, and dates the moment you hear them.',
    'Watch for distractor options that repeat words from the audio but change the meaning.',
  ],
  tasks: [
    {
      id: 'lis-problem-solving',
      name: 'Listening to Problem Solving',
      kind: 'mcq',
      minutes: 6,
      instructions: 'Listen to a conversation in which two people work through a problem, then answer the questions.',
      bank: [
        {
          id: 'lis-ps-001',
          title: 'Community centre renovation',
          audio: null,
          youtube: null,
          passageLabel: 'Sample transcript',
          passage:
            "Woman: Hi Mark, did you get a chance to look at the budget proposal for the community centre renovation?\nMan: I did. I think the number for new flooring seems high — almost $18,000. Can we get a second quote?\nWoman: Good idea. I'll ask Facilities to reach out to two more contractors this week.\nMan: Also, the timeline says the gym floor won't be finished until the second week of November. That's after the youth basketball league starts.\nWoman: Let's flag that to the committee tomorrow. Maybe we can prioritize the gym first and do the lobby flooring later.\nMan: Sounds good. I'll draft an email tonight summarizing our concerns.",
          questions: [
            { text: "What is Mark's main concern about the flooring quote?", options: ["The colour doesn't match", 'The cost is too high', 'The contractor is unavailable', 'The material is low quality'], correct: 1, explanation: 'Mark says the number "seems high — almost $18,000," indicating a cost concern.' },
            { text: 'What does the woman propose doing about the quote?', options: ['Cancelling the renovation', 'Getting quotes from two more contractors', 'Reducing the budget', 'Delaying the whole project'], correct: 1, explanation: 'She says she\'ll "ask Facilities to reach out to two more contractors this week."' },
            { text: 'Why is the November timeline a problem?', options: ['It conflicts with a holiday', "It's after the youth basketball league starts", "It's too soon for budget approval", 'The contractor is on vacation then'], correct: 1, explanation: 'Mark notes the gym floor timeline is "after the youth basketball league starts."' },
            { text: 'What will Mark do that night?', options: ['Call the contractor', 'Meet with the committee', 'Draft a summary email', 'Revise the budget'], correct: 2, explanation: 'He says "I\'ll draft an email tonight summarizing our concerns."' },
          ],
        },
      ],
    },
    {
      id: 'lis-daily-conversation',
      name: 'Listening to a Daily Life Conversation',
      kind: 'mcq',
      minutes: 5,
      instructions: 'Listen to a casual conversation between two people, then answer the questions.',
      bank: [
        {
          id: 'lis-dc-001',
          title: 'Weekend plans',
          audio: null,
          youtube: null,
          passageLabel: 'Sample transcript',
          passage:
            "Priya: Are you still coming to the farmers' market on Saturday?\nLeo: I want to, but my sister's flight lands at 10, so I have to pick her up.\nPriya: No problem — the market runs until 2. Why don't we go after lunch?\nLeo: That works. Should I bring my reusable bags?\nPriya: Definitely. And bring cash — a lot of the stalls don't take cards.",
          questions: [
            { text: 'Why might Leo be late to the market?', options: ['He has to work', 'He is picking up his sister from the airport', 'He is feeling unwell', 'He forgot the date'], correct: 1, explanation: 'Leo says his sister\'s flight lands at 10 and he has to pick her up.' },
            { text: 'What does Priya suggest Leo bring?', options: ['An umbrella', 'A camera', 'Reusable bags and cash', 'A shopping list'], correct: 2, explanation: 'She tells him to bring reusable bags and cash because many stalls don\'t take cards.' },
          ],
        },
      ],
    },
    {
      id: 'lis-information',
      name: 'Listening for Information',
      kind: 'mcq',
      minutes: 6,
      instructions: 'Listen to a recorded message giving information, then answer the questions.',
      bank: [
        {
          id: 'lis-info-001',
          title: 'Clinic phone message',
          audio: null,
          youtube: null,
          passageLabel: 'Sample transcript',
          passage:
            "Thank you for calling Maple Family Clinic. Our office hours are Monday to Friday, 8 a.m. to 6 p.m., and Saturdays from 9 a.m. to 1 p.m. We are closed on Sundays and statutory holidays. To book or cancel an appointment, press 1. For prescription refills, please allow two business days and press 2. If this is a medical emergency, hang up and dial 911.",
          questions: [
            { text: 'When is the clinic open on Saturdays?', options: ['8 a.m. to 6 p.m.', '9 a.m. to 1 p.m.', 'It is closed on Saturdays', '9 a.m. to 6 p.m.'], correct: 1, explanation: 'The message states Saturdays from 9 a.m. to 1 p.m.' },
            { text: 'How long should you allow for a prescription refill?', options: ['The same day', 'One week', 'Two business days', 'Two weeks'], correct: 2, explanation: '"Please allow two business days" for refills.' },
          ],
        },
      ],
    },
    {
      id: 'lis-news',
      name: 'Listening to a News Item',
      kind: 'mcq',
      minutes: 5,
      instructions: 'Listen to a short news report, then answer the questions.',
      bank: [
        {
          id: 'lis-news-001',
          title: 'New bike lanes',
          audio: null,
          youtube: null,
          passageLabel: 'Sample transcript',
          passage:
            'The city announced today that it will add twelve kilometres of protected bike lanes downtown by next spring. The $4 million project is funded largely by a provincial transportation grant. Officials say the lanes are intended to reduce traffic congestion and encourage commuters to cycle. Some business owners have raised concerns about the temporary loss of on-street parking during construction.',
          questions: [
            { text: 'How is the project mainly funded?', options: ['City taxes only', 'A provincial transportation grant', 'Private donations', 'Federal loans'], correct: 1, explanation: 'It is "funded largely by a provincial transportation grant."' },
            { text: 'What concern did some business owners raise?', options: ['Higher taxes', 'Noise at night', 'Temporary loss of on-street parking', 'Increased rent'], correct: 2, explanation: 'They worry about the temporary loss of on-street parking during construction.' },
          ],
        },
      ],
    },
    {
      id: 'lis-discussion',
      name: 'Listening to a Discussion',
      kind: 'mcq',
      minutes: 8,
      instructions: 'Listen to a discussion between two or more speakers, then answer the questions.',
      bank: [
        {
          id: 'lis-disc-001',
          title: 'Remote work debate',
          audio: null,
          youtube: null,
          passageLabel: 'Sample transcript',
          passage:
            "Dana: I think we should keep the team fully remote. Productivity went up last quarter.\nOmar: It did, but new hires say they feel isolated and it takes longer to learn the systems.\nDana: That's fair. Maybe a hybrid model — two days in the office for training and collaboration?\nOmar: I'd support that, as long as the in-office days are consistent so people can plan around them.",
          questions: [
            { text: 'What is Omar\'s main concern about fully remote work?', options: ['It lowers productivity', 'New hires feel isolated and learn more slowly', 'It costs too much', 'Clients dislike it'], correct: 1, explanation: 'Omar says new hires feel isolated and it takes longer to learn the systems.' },
            { text: 'What compromise do they reach?', options: ['Return to the office full time', 'A hybrid model with consistent in-office days', 'Hire fewer people', 'End remote work for new hires only'], correct: 1, explanation: 'They agree on a hybrid model with consistent in-office days.' },
          ],
        },
      ],
    },
    {
      id: 'lis-viewpoints',
      name: 'Listening to Viewpoints',
      kind: 'mcq',
      minutes: 7,
      instructions: 'Listen to a speaker present a viewpoint on a topic, then answer the questions.',
      bank: [
        {
          id: 'lis-vp-001',
          title: 'Public transit funding',
          audio: null,
          youtube: null,
          passageLabel: 'Sample transcript',
          passage:
            'In my view, cities should invest in frequent, reliable buses before building expensive rail lines. Buses can be deployed quickly and rerouted as neighbourhoods change, whereas rail takes a decade to build and locks in a fixed route. Critics argue rail carries more people, and that is true on the busiest corridors. But for most mid-sized cities, a dense bus network serves more residents at a fraction of the cost.',
          questions: [
            { text: 'What does the speaker mainly argue?', options: ['Rail is always better than buses', 'Cities should prioritize frequent, reliable buses over rail', 'Public transit should be free', 'Cars should be banned downtown'], correct: 1, explanation: 'The speaker argues for investing in buses before expensive rail.' },
            { text: 'What advantage of buses does the speaker mention?', options: ['They never break down', 'They can be deployed quickly and rerouted', 'They carry more people than rail', 'They are quieter'], correct: 1, explanation: 'Buses "can be deployed quickly and rerouted as neighbourhoods change."' },
          ],
        },
      ],
    },
  ],
};
