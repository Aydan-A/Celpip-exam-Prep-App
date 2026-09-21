// Writing — 2 official CELPIP tasks. Each task holds a bank of `writing` items.
export const writing = {
  id: 'writing',
  name: 'Writing',
  order: 2,
  criteria: ['Content/Coherence', 'Vocabulary', 'Readability', 'Task Fulfillment'],
  tips: [
    'Use topic sentences and clear transitions between ideas.',
    'Vary sentence structure and use precise, less common vocabulary.',
    'Address every part of the prompt directly.',
  ],
  tasks: [
    {
      id: 'write-email',
      name: 'Writing an Email',
      kind: 'writing',
      minutes: 27,
      wordMin: 150,
      wordMax: 200,
      instructions: 'Read the situation and write an email of about 150–200 words that addresses every point.',
      bank: [
        { id: 'we-001', prompt: 'Your neighbour has been parking a large truck across your shared driveway, blocking your access several times this month. Write an email to your neighbour explaining the problem and proposing a solution.' },
        { id: 'we-002', prompt: 'For the past two weeks, construction near your apartment building has started at 6 a.m. every day. Write an email to the building manager describing the problem, explaining how it affects you, and requesting a solution.' },
        { id: 'we-003', prompt: 'You would like to work from home two days a week. Write an email to your manager explaining your reasons, proposing a schedule, and addressing any concerns they might have.' },
        { id: 'we-004', prompt: 'A laptop you ordered online arrived with a cracked screen. Write an email to the online store describing the problem, explaining how it has affected you, and requesting a resolution.' },
        { id: 'we-005', prompt: 'A friend is visiting your city for the first time next month. Write an email giving suggestions on where to stay, places to visit, and things to do.' },
      ],
    },
    {
      id: 'write-survey',
      name: 'Responding to Survey Questions',
      kind: 'writing',
      minutes: 26,
      wordMin: 150,
      wordMax: 200,
      instructions: 'Read the survey, choose ONE option, and write about 150–200 words explaining your choice with clear reasons.',
      bank: [
        { id: 'ws-001', prompt: 'Your city is deciding what to do with a downtown parking lot. Choose ONE: (A) replace it with a community garden, or (B) keep it as parking. Write a response giving your opinion and reasons.', options: ['A — Community garden', 'B — Keep it as parking'] },
        { id: 'ws-002', prompt: 'Your city council is choosing one project for a new budget. Choose ONE: (A) build a public swimming pool, or (B) build a community sports complex. Write a response giving your opinion and reasons.', options: ['A — Swimming pool', 'B — Sports complex'] },
        { id: 'ws-003', prompt: 'Your city can improve public transit in one way. Choose ONE: (A) add more bus-only lanes, or (B) reduce bus fares by 10%. Write a response explaining which helps commuters more and why.', options: ['A — More bus lanes', 'B — Lower fares'] },
        { id: 'ws-004', prompt: 'Your employer will introduce one new benefit. Choose ONE: (A) flexible working hours, or (B) free professional training. Write a response giving your opinion and reasons.', options: ['A — Flexible hours', 'B — Free training'] },
      ],
    },
  ],
};
