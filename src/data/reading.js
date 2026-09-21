// Reading — 4 official CELPIP parts. Each task holds a bank of `mcq` items.
// A "diagram" item may carry an `image`; until one is supplied the details are
// given in the passage text.

export const reading = {
  id: 'reading',
  name: 'Reading',
  order: 1,
  criteria: [
    'Comprehension — identifying the main idea and supporting details',
    "Inference — drawing conclusions the passage implies but doesn't state directly",
    "Vocabulary in context — using surrounding sentences to determine a word's meaning",
  ],
  tips: [
    'Read the question stems first, then scan the passage for matching keywords.',
    "For inference questions, ask what the author implies rather than only what's written.",
    "When unsure of a word, substitute each answer choice and see which keeps the sentence's meaning.",
  ],
  tasks: [
    {
      id: 'read-correspondence',
      name: 'Reading Correspondence',
      kind: 'mcq',
      minutes: 11,
      instructions: 'Read a piece of correspondence (such as an email or letter), then answer the questions.',
      bank: [
        {
          id: 'read-corr-001',
          title: 'Email from a landlord',
          image: null,
          passageLabel: 'Email',
          passage:
            "Dear Tenants,\n\nPlease be advised that the building's water supply will be shut off on Thursday, June 12, from 9 a.m. to approximately 2 p.m. so that crews can replace an aging valve in the basement. We recommend storing drinking water in advance. The elevators will remain in service. If the work finishes early, we will post a notice in the lobby. We apologize for the inconvenience and thank you for your patience.\n\nSincerely,\nBuilding Management",
          questions: [
            { text: 'Why will the water be shut off?', options: ['To clean the tanks', 'To replace an aging valve', 'Because of a leak', 'For a scheduled inspection'], correct: 1, explanation: 'The email says crews will "replace an aging valve in the basement."' },
            { text: 'What are tenants advised to do?', options: ['Leave the building', 'Store drinking water in advance', 'Use the stairs', 'Contact a plumber'], correct: 1, explanation: '"We recommend storing drinking water in advance."' },
            { text: 'How will tenants know if the work finishes early?', options: ['By email', 'A notice in the lobby', 'A phone call', 'A text message'], correct: 1, explanation: 'The building will "post a notice in the lobby."' },
          ],
        },
      ],
    },
    {
      id: 'read-diagram',
      name: 'Reading to Apply a Diagram',
      kind: 'mcq',
      minutes: 9,
      instructions: 'Read information presented in a diagram or schedule together with a short message, then answer the questions.',
      bank: [
        {
          id: 'read-diag-001',
          title: 'Community centre class schedule',
          image: null,
          passageLabel: 'Schedule + message',
          passage:
            'FALL CLASS SCHEDULE — Riverside Community Centre\n• Yoga: Mon & Wed, 6:00–7:00 p.m. (Studio A)\n• Pottery: Tue, 5:30–7:30 p.m. (Craft Room)\n• Swimming (adult): Thu, 7:00–8:00 p.m. (Pool)\n• Guitar (beginner): Sat, 10:00–11:30 a.m. (Room 3)\n\nMessage from Sam:\n"Hi! I work until 6 p.m. on weekdays and I\'m away every Saturday this month. I\'d like one weekday evening class that starts at 6:30 or later. Which class fits?"',
          questions: [
            { text: 'Which class can Sam attend?', options: ['Yoga', 'Pottery', 'Swimming (adult)', 'Guitar (beginner)'], correct: 2, explanation: 'Sam needs a weekday class at 6:30 p.m. or later and is away Saturdays. Only adult swimming (Thu, 7:00 p.m.) fits.' },
            { text: 'Why can Sam not take the guitar class?', options: ['It is full', 'It is on Saturday, when Sam is away', 'It is too expensive', 'It starts too late'], correct: 1, explanation: 'Guitar is Saturday mornings and Sam is away every Saturday this month.' },
          ],
        },
      ],
    },
    {
      id: 'read-information',
      name: 'Reading for Information',
      kind: 'mcq',
      minutes: 10,
      instructions: 'Read an informational passage, then answer the questions.',
      bank: [
        {
          id: 'read-info-001',
          title: 'Library extends weekend hours',
          image: null,
          passageLabel: 'Passage',
          passage:
            'Riverside Public Library will extend its weekend hours starting next month, the city announced Tuesday. Branches will now open at 9 a.m. instead of 11 a.m. on Saturdays, and Sunday hours will be added for the first time in over a decade — from noon to 5 p.m. The change follows a survey in which nearly 70% of respondents said they wanted more weekend access, particularly parents looking for programming during school breaks. Library director Elena Ruiz said the extended hours will initially run as a six-month pilot. If usage numbers justify the added staffing costs, the schedule will become permanent. Some staff members have expressed concern about scheduling enough part-time workers to cover the new hours without cutting weekday programs.',
          questions: [
            { text: 'What is the main purpose of the passage?', options: ["To criticize the library's budget", 'To announce extended library hours', 'To describe a hiring shortage', "To promote a children's program"], correct: 1, explanation: 'The passage opens with the announcement that library hours will be extended.' },
            { text: 'What can be inferred about why Sunday hours are being added?', options: ['Staff requested a day off on Saturdays', 'A majority of survey respondents wanted more weekend access', 'The library was losing money', 'Other libraries already offer Sunday hours'], correct: 1, explanation: 'Survey data ("nearly 70%... wanted more weekend access") supports this inference.' },
            { text: 'What does "pilot" most nearly mean as used in the passage?', options: ['A permanent policy', 'A trial period', 'A staff training program', 'A financial audit'], correct: 1, explanation: '"Pilot" here refers to a temporary six-month trial before a permanent decision.' },
            { text: 'What concern do some staff members have?', options: ['The library will close early', 'Scheduling enough part-time coverage without cutting weekday programs', 'The survey results were inaccurate', 'Parents will complain about noise'], correct: 1, explanation: 'Directly stated: staff worry about "scheduling enough part-time workers... without cutting weekday programs."' },
          ],
        },
      ],
    },
    {
      id: 'read-viewpoints',
      name: 'Reading for Viewpoints',
      kind: 'mcq',
      minutes: 13,
      instructions: 'Read a passage that presents one or more viewpoints, then answer the questions.',
      bank: [
        {
          id: 'read-vp-001',
          title: 'Should homework be reduced?',
          image: null,
          passageLabel: 'Passage',
          passage:
            'A growing number of educators argue that elementary schools assign too much homework. They point to research suggesting little academic benefit before high school, and note that long assignments can crowd out sleep, play, and family time. Others counter that modest homework builds responsibility and lets parents see what children are learning. Most experts now favour a middle path: short, purposeful tasks tied directly to class lessons, rather than busywork assigned simply out of habit.',
          questions: [
            { text: 'What position do the educators in the first sentence take?', options: ['Homework should be increased', 'Elementary schools assign too much homework', 'Homework should be graded more strictly', 'Parents should assign homework'], correct: 1, explanation: 'They argue elementary schools assign too much homework.' },
            { text: 'What middle path do most experts favour?', options: ['No homework at all', 'Short, purposeful tasks tied to class lessons', 'Homework only on weekends', 'Longer assignments with rewards'], correct: 1, explanation: 'Experts favour "short, purposeful tasks tied directly to class lessons."' },
          ],
        },
      ],
    },
  ],
};
