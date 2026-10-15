import { PALETTE, POOL } from '@/lib/data';

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export const todayStr = () => new Date().toISOString().slice(0, 10);

export function fmt(sec) {
  sec = Math.max(0, sec);
  const m = Math.floor(sec / 60);
  const x = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(x).padStart(2, '0')}`;
}

export function fmtH(sec) {
  sec = Math.max(0, sec);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const x = sec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(x).padStart(2, '0')}`;
}

export function elapsed(s) {
  const ms = (s.submittedAt || Date.now()) - s.startedAt;
  return fmt(Math.floor(ms / 1000));
}

export function waecGrade(p) {
  if (p >= 75) return 'A1';
  if (p >= 70) return 'B2';
  if (p >= 65) return 'B3';
  if (p >= 60) return 'C4';
  if (p >= 55) return 'C5';
  if (p >= 50) return 'C6';
  if (p >= 45) return 'D7';
  if (p >= 40) return 'E8';
  return 'F9';
}

export function catOf(subject) {
  const map = { 'Use of English': 'English', 'English Language': 'English', 'Literature in English': 'Literature', 'Further Mathematics': 'Mathematics' };
  if (map[subject]) return map[subject];
  if (POOL[subject]) return subject;
  return 'English';
}

export function catColor(cat) {
  const m = { JAMB: PALETTE.deep, WAEC: PALETTE.steel, Registration: '#c67139', 'Study advice': PALETTE.mist };
  return m[cat] || PALETTE.steel;
}

export function buildSlots(spec) {
  const slots = [];
  spec.forEach((sec) => {
    const pool = POOL[sec.pool] || [];
    for (let i = 0; i < sec.count; i++) {
      const q = pool[i % pool.length];
      slots.push({ subject: sec.subject, cat: sec.pool, q: { ...q }, type: 'objective' });
    }
  });
  return slots;
}

export const MOCK_DEFS = [
  {
    id: 'jamb-demo',
    examType: 'JAMB',
    title: 'JAMB UTME — Quick Simulation',
    duration: 600,
    full: false,
    difficulty: 'Mixed',
    about: 'A fast 10-question CBT taste of the real thing — ideal for a quick benchmark.',
    spec: [
      { subject: 'Use of English', pool: 'English', count: 4 },
      { subject: 'Mathematics', pool: 'Mathematics', count: 3 },
      { subject: 'Physics', pool: 'Physics', count: 2 },
      { subject: 'Chemistry', pool: 'Chemistry', count: 1 },
    ],
  },
  {
    id: 'jamb-full',
    examType: 'JAMB',
    title: 'JAMB UTME — Full Mock (180)',
    duration: 7200,
    full: true,
    difficulty: 'Standard',
    about: 'Full-length structure: Use of English (60) plus three subjects (40 each), 2-hour timer.',
    spec: [
      { subject: 'Use of English', pool: 'English', count: 60 },
      { subject: 'Mathematics', pool: 'Mathematics', count: 40 },
      { subject: 'Physics', pool: 'Physics', count: 40 },
      { subject: 'Chemistry', pool: 'Chemistry', count: 40 },
    ],
  },
  {
    id: 'waec-obj',
    examType: 'WAEC',
    title: 'WAEC Objective — Science Sampler',
    duration: 720,
    full: false,
    difficulty: 'Mixed',
    about: 'Objective questions across core science subjects with instant scoring.',
    spec: [
      { subject: 'Biology', pool: 'Biology', count: 3 },
      { subject: 'Chemistry', pool: 'Chemistry', count: 3 },
      { subject: 'Physics', pool: 'Physics', count: 2 },
      { subject: 'Mathematics', pool: 'Mathematics', count: 2 },
    ],
  },
  {
    id: 'waec-theory',
    examType: 'WAEC',
    title: 'WAEC Theory — Written Practice',
    duration: 1800,
    full: false,
    difficulty: 'Theory',
    theory: true,
    about: 'Write full answers; receive a model answer and marking guide after submission.',
    theorySpec: ['Economics', 'Mathematics', 'English'],
  },
];

export function seedDemoAttempts() {
  return [
    {
      id: uid(), kind: 'mock', title: 'JAMB UTME — Quick Simulation', examType: 'JAMB', total: 10, correct: 7, score400: 280, when: '2026-10-11', timeUsed: '08:12',
      subjects: { 'Use of English': 3, Mathematics: 2, Physics: 1, Chemistry: 1 },
      subjectTotals: { 'Use of English': 4, Mathematics: 3, Physics: 2, Chemistry: 1 },
    },
    { id: uid(), kind: 'practice', title: 'Mathematics practice', examType: 'JAMB', subject: 'Mathematics', total: 10, correct: 6, when: '2026-10-12', timeUsed: '06:40' },
    { id: uid(), kind: 'practice', title: 'Physics practice', examType: 'JAMB', subject: 'Physics', total: 10, correct: 4, when: '2026-10-13', timeUsed: '07:05' },
    {
      id: uid(), kind: 'mock', title: 'JAMB UTME — Quick Simulation', examType: 'JAMB', total: 10, correct: 8, score400: 320, when: '2026-10-13', timeUsed: '07:48',
      subjects: { 'Use of English': 4, Mathematics: 2, Physics: 1, Chemistry: 1 },
      subjectTotals: { 'Use of English': 4, Mathematics: 3, Physics: 2, Chemistry: 1 },
    },
  ];
}

export function score(s, profile) {
  const subjectCorrect = {};
  const subjectTotal = {};
  let correct = 0;
  let answered = 0;
  let objectiveTotal = 0;
  let theoryAnswered = 0;
  let theoryTotal = 0;
  const review = s.slots.map((slot, i) => {
    if (slot.type === 'theory') {
      theoryTotal++;
      const txt = s.answers[i];
      if (txt && txt.trim()) theoryAnswered++;
      return { i, type: 'theory', subject: slot.subject, text: slot.q.text, marks: slot.q.marks, yourText: txt || '', modelAnswer: slot.q.modelAnswer, answered: !!(txt && txt.trim()) };
    }
    objectiveTotal++;
    subjectTotal[slot.subject] = (subjectTotal[slot.subject] || 0) + 1;
    const a = s.answers[i];
    const ok = a === slot.q.correct;
    if (a != null) answered++;
    if (ok) {
      correct++;
      subjectCorrect[slot.subject] = (subjectCorrect[slot.subject] || 0) + 1;
    }
    return { i, type: 'objective', subject: slot.subject, text: slot.q.text, options: slot.q.options, your: a, correct: slot.q.correct, ok, unanswered: a == null, explanation: slot.q.explanation };
  });
  const pct = objectiveTotal ? Math.round((correct / objectiveTotal) * 100) : 0;
  const result = {
    sessionTitle: s.title,
    examType: s.examType,
    isJamb: s.examType === 'JAMB',
    theory: !!s.theory,
    objectiveTotal,
    correct,
    incorrect: answered - correct,
    unanswered: objectiveTotal - answered,
    percentage: pct,
    score400: Math.round((correct / Math.max(objectiveTotal, 1)) * 400),
    grade: waecGrade(pct),
    timeUsed: elapsed(s),
    target: profile ? profile.targetScore : null,
    subjectCorrect,
    subjectTotal,
    review,
    theoryAnswered,
    theoryTotal,
    when: todayStr(),
  };
  result.meetsTarget = result.isJamb && result.target ? result.score400 >= result.target : pct >= 60;
  return result;
}
