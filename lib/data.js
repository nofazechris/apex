export const PALETTE = { navy: '#021024', deep: '#052659', steel: '#5483B3', mist: '#7DA0CA', ice: '#C1E8FF' };

export const JAMB_SUBJECTS = [
  'Use of English',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'Government',
  'Literature in English',
  'Geography',
  'Commerce',
  'Christian Religious Studies',
  'Agricultural Science',
];
export const WAEC_CATALOGUE = {
  Science: [
    'Mathematics',
    'English Language',
    'Civic Education',
    'Physics',
    'Biology',
    'Chemistry',
    'Further Mathematics',
    'Economics',
    'Geography',
    'Agricultural Science',
    'Digital Technology',
  ],
  Arts: [
    'Mathematics',
    'English Language',
    'Civic Education',
    'Christian Religious Studies',
    'Literature in English',
    'Yoruba',
    'Economics',
    'Government',
    'Visual Arts',
    'Digital Technology',
  ],
  Commercial: [
    'Mathematics',
    'English Language',
    'Civic Education',
    'ICT',
    'Government',
    'Economics',
    'Further Mathematics',
    'Commerce',
    'Digital Technology',
  ],
};

export const POOL = {
  English: [
    {
      text: 'Choose the word nearest in meaning to “candid”.',
      options: ['Dishonest', 'Frank', 'Careless', 'Reluctant'],
      correct: 1,
      topic: 'Lexis & Structure',
      explanation: '“Candid” means open and honest — i.e. frank.',
    },
    {
      text: 'Complete the sentence: “Neither of the boys ___ present at the assembly.”',
      options: ['are', 'were', 'was', 'be'],
      correct: 2,
      topic: 'Concord',
      explanation: '“Neither” is singular, so it takes the singular verb “was”.',
    },
    {
      text: 'Choose the antonym of “scarce”.',
      options: ['Rare', 'Abundant', 'Limited', 'Meagre'],
      correct: 1,
      topic: 'Antonyms',
      explanation: '“Scarce” means in short supply; its opposite is “abundant”.',
    },
    {
      text: 'Identify the figure of speech: “The wind whispered through the trees.”',
      options: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'],
      correct: 2,
      topic: 'Figures of Speech',
      explanation: 'Giving a human action (whispering) to the wind is personification.',
    },
  ],
  Mathematics: [
    {
      text: 'Simplify 3/4 + 1/8.',
      options: ['7/8', '5/8', '1/2', '7/12'],
      correct: 0,
      topic: 'Fractions',
      explanation: 'Common denominator 8: 6/8 + 1/8 = 7/8.',
    },
    {
      text: 'If 2x + 5 = 17, find x.',
      options: ['6', '11', '7', '5'],
      correct: 0,
      topic: 'Linear Equations',
      explanation: '2x = 12, so x = 6.',
    },
    { text: 'Evaluate 2⁵.', options: ['10', '25', '32', '16'], correct: 2, topic: 'Indices', explanation: '2×2×2×2×2 = 32.' },
    {
      text: 'Find the mean of 4, 8, 10 and 14.',
      options: ['9', '8', '10', '12'],
      correct: 0,
      topic: 'Statistics',
      explanation: 'Sum = 36, divided by 4 = 9.',
    },
  ],
  Physics: [
    {
      text: 'The SI unit of force is the',
      options: ['joule', 'newton', 'watt', 'pascal'],
      correct: 1,
      topic: 'Mechanics',
      explanation: 'Force is measured in newtons (N).',
    },
    {
      text: 'Which of the following is a vector quantity?',
      options: ['Speed', 'Distance', 'Velocity', 'Mass'],
      correct: 2,
      topic: 'Vectors',
      explanation: 'Velocity has both magnitude and direction, so it is a vector.',
    },
    {
      text: '“A body remains at rest unless acted upon by a force.” This states Newton’s',
      options: ['first law', 'second law', 'third law', 'law of gravitation'],
      correct: 0,
      topic: 'Newton’s Laws',
      explanation: 'This is the law of inertia — Newton’s first law.',
    },
  ],
  Chemistry: [
    {
      text: 'The chemical symbol for sodium is',
      options: ['S', 'So', 'Na', 'Sd'],
      correct: 2,
      topic: 'Periodic Table',
      explanation: 'Sodium’s symbol (from Latin natrium) is Na.',
    },
    {
      text: 'The pH of a neutral solution at 25°C is',
      options: ['0', '7', '14', '1'],
      correct: 1,
      topic: 'Acids & Bases',
      explanation: 'A neutral solution has a pH of 7.',
    },
    {
      text: 'Which gas is usually produced when a reactive metal reacts with a dilute acid?',
      options: ['Oxygen', 'Hydrogen', 'Carbon dioxide', 'Nitrogen'],
      correct: 1,
      topic: 'Reactions',
      explanation: 'Metal + dilute acid → salt + hydrogen gas.',
    },
  ],
  Biology: [
    {
      text: 'The organelle known as the powerhouse of the cell is the',
      options: ['nucleus', 'ribosome', 'mitochondrion', 'vacuole'],
      correct: 2,
      topic: 'Cell Biology',
      explanation: 'Mitochondria release energy through respiration.',
    },
    {
      text: 'Green plants manufacture food through the process of',
      options: ['respiration', 'photosynthesis', 'transpiration', 'digestion'],
      correct: 1,
      topic: 'Nutrition',
      explanation: 'Photosynthesis converts light energy into chemical energy.',
    },
  ],
  Economics: [
    {
      text: 'A situation where human wants exceed available resources is called',
      options: ['inflation', 'scarcity', 'surplus', 'demand'],
      correct: 1,
      topic: 'Basic Concepts',
      explanation: 'Scarcity is the fundamental economic problem.',
    },
    {
      text: 'The basic economic problem arises from',
      options: ['money', 'scarcity and choice', 'trade', 'taxation'],
      correct: 1,
      topic: 'Basic Concepts',
      explanation: 'Limited resources force choices to be made.',
    },
  ],
  Government: [
    {
      text: 'The principle of separation of powers was propounded by',
      options: ['Karl Marx', 'Montesquieu', 'John Locke', 'Rousseau'],
      correct: 1,
      topic: 'Political Theory',
      explanation: 'Baron de Montesquieu advocated separation of powers.',
    },
  ],
  Literature: [
    {
      text: 'A play on words used for comic or rhetorical effect is a',
      options: ['simile', 'pun', 'metaphor', 'hyperbole'],
      correct: 1,
      topic: 'Literary Devices',
      explanation: 'A pun exploits multiple meanings of a word.',
    },
  ],
};

export const THEORY = {
  Economics: {
    text: 'Define scarcity and explain, with one example, why it is regarded as the central problem of economics.',
    marks: 6,
    topic: 'Basic Concepts',
    modelAnswer:
      'Scarcity is the condition in which limited resources are insufficient to satisfy unlimited human wants. Because resources (land, labour, capital) are finite, choices must be made — e.g. a government with a fixed budget must choose between building a hospital or a road. This necessity of choice, and the resulting opportunity cost, makes scarcity the central problem of economics.',
  },
  Mathematics: {
    text: 'A trader bought an item for ₦4,500 and sold it for ₦5,400. Calculate the percentage profit, showing your working.',
    marks: 5,
    topic: 'Percentages',
    modelAnswer: 'Profit = ₦5,400 − ₦4,500 = ₦900.\nPercentage profit = (Profit ÷ Cost price) × 100 = (900 ÷ 4,500) × 100 = 20%.',
  },
  English: {
    text: 'In not more than 120 words, write a letter to your principal requesting permission to organise an inter-house debate.',
    marks: 10,
    topic: 'Letter Writing',
    modelAnswer:
      'A strong response opens with the writer’s address and date, a clear salutation (“Dear Sir/Ma”), and a concise heading. The body states the purpose (requesting permission), gives the proposed date, theme and expected benefit to students, and closes politely with the writer’s name and class. Marks are awarded for format, clear purpose, appropriate register and correct mechanics.',
  },
};

export const ALL_UPDATES = [
  {
    headline: '2026 UTME registration — a preparation checklist',
    summary:
      'What candidates typically need to gather before the registration window opens. Always confirm dates on the official JAMB portal.',
    category: 'Registration',
    source: 'Apex Editorial (sample)',
    date: '2026-09-02',
    url: 'https://www.jamb.gov.ng',
    pinned: true,
  },
  {
    headline: 'Build a focused 3-month JAMB study plan',
    summary: 'A structured weekly plan that balances the four UTME subjects with regular mock exams and targeted revision.',
    category: 'Study advice',
    source: 'Apex Editorial (sample)',
    date: '2026-08-20',
    url: '#',
    pinned: false,
  },
  {
    headline: 'Understanding the WAEC grading scale (A1–F9)',
    summary: 'How WAEC grades map to performance bands, and what a “credit” means for admissions. Verify requirements with WAEC.',
    category: 'WAEC',
    source: 'Apex Editorial (sample)',
    date: '2026-08-11',
    url: 'https://www.waecnigeria.org',
    pinned: false,
  },
  {
    headline: 'Managing exam anxiety on the big day',
    summary: 'Simple, evidence-informed techniques to stay calm and think clearly during timed examinations.',
    category: 'Study advice',
    source: 'Apex Editorial (sample)',
    date: '2026-07-30',
    url: '#',
    pinned: false,
  },
  {
    headline: 'CBT practice: making the most of mock exams',
    summary: 'Why timed, full-length simulations matter — and how to review them so your score keeps climbing.',
    category: 'JAMB',
    source: 'Apex Editorial (sample)',
    date: '2026-07-18',
    url: '#',
    pinned: false,
  },
];
