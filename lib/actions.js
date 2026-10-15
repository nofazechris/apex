import { POOL, THEORY } from '@/lib/data';
import { MOCK_DEFS, buildSlots, catOf, elapsed, score, seedDemoAttempts, todayStr, uid } from '@/lib/exam';

export const STORAGE_KEY = 'apex_state_v1';

export const INITIAL_STATE = {
  hydrated: false,
  route: 'landing',
  appScreen: 'dashboard',
  authMode: 'signup',
  authEmail: '',
  authPassword: '',
  authName: '',
  pwVisible: false,
  authError: '',
  authLoading: false,
  ob: {
    step: 1,
    examType: null,
    name: '',
    course: '',
    targetScore: 280,
    examDate: '',
    classLevel: 'SS3',
    department: 'Science',
    targetGrades: '6 credits (A1–C6)',
    subjects: [],
  },
  profile: null,
  isDemo: false,
  attempts: [],
  session: null,
  confirmOpen: false,
  expandedReview: null,
  practiceFilterSubject: 'All',
  lastResult: null,
  updateCategory: 'All',
  now: 0,
  toast: '',
};

const scrollTop = () => window.scrollTo(0, 0);

/**
 * All state transitions for the app. `get` reads the latest state, `set` shallow-merges a patch.
 * Handlers are stable for the lifetime of the app (they never close over a render's state).
 */
export function createActions({ get, set }) {
  const go = (route) => {
    set({ route });
    scrollTop();
  };
  const goScreen = (screen) => {
    set({ route: 'app', appScreen: screen });
    scrollTop();
  };

  const exploreDemo = () => {
    const profile = {
      name: 'David Okafor',
      email: 'david@demo.apex',
      examType: 'JAMB',
      course: 'Medicine & Surgery',
      targetScore: 300,
      examDate: '2026-04-18',
      subjects: ['Use of English', 'Mathematics', 'Physics', 'Chemistry'],
    };
    set({ profile, isDemo: true, attempts: seedDemoAttempts(), route: 'app', appScreen: 'dashboard' });
    scrollTop();
  };

  // ---- auth ----
  const submitAuth = () => {
    const { authEmail, authPassword, authMode, authName } = get();
    if (!authEmail || !/.+@.+\..+/.test(authEmail)) return set({ authError: 'Enter a valid email address.' });
    if (!authPassword || authPassword.length < 6) return set({ authError: 'Password must be at least 6 characters.' });
    if (authMode === 'signup' && !authName.trim()) return set({ authError: 'Enter your full name.' });
    set({ authError: '', authLoading: true });
    setTimeout(() => {
      if (authMode === 'signup') {
        set({ authLoading: false, route: 'onboarding', ob: { ...get().ob, name: authName } });
      } else {
        const profile = get().profile || {
          name: authName || 'Student',
          email: authEmail,
          examType: 'JAMB',
          course: '',
          targetScore: 280,
          examDate: '',
          subjects: ['Use of English', 'Mathematics', 'Physics', 'Chemistry'],
        };
        set({ authLoading: false, profile, route: 'app', appScreen: 'dashboard' });
      }
      scrollTop();
    }, 650);
  };

  // ---- onboarding ----
  const obSet = (k, v) => set({ ob: { ...get().ob, [k]: v } });
  const obChooseExam = (t) => {
    const d = t === 'JAMB' ? { subjects: ['Use of English'] } : { subjects: [] };
    set({ ob: { ...get().ob, examType: t, ...d } });
  };
  const obToggleSubject = (s) => {
    const { ob } = get();
    if (ob.examType === 'JAMB' && s === 'Use of English') return;
    let subs = ob.subjects.slice();
    if (subs.includes(s)) subs = subs.filter((x) => x !== s);
    else {
      const cap = ob.examType === 'JAMB' ? 4 : 9;
      if (subs.length >= cap) {
        set({ toast: `You can select up to ${cap} subjects.` });
        setTimeout(() => set({ toast: '' }), 2200);
        return;
      }
      subs.push(s);
    }
    obSet('subjects', subs);
  };
  const obCanContinue = () => {
    const { ob } = get();
    if (ob.step === 1) return !!ob.examType;
    if (ob.step === 2) {
      if (!ob.name.trim()) return false;
      return ob.examType === 'JAMB' ? ob.subjects.length === 4 : ob.subjects.length >= 4;
    }
    return true;
  };
  const obFinish = () => {
    const { ob, authEmail } = get();
    const profile = {
      name: ob.name.trim(),
      email: authEmail || 'student@apex',
      examType: ob.examType,
      course: ob.course,
      targetScore: ob.targetScore,
      examDate: ob.examDate,
      subjects: ob.subjects,
      classLevel: ob.classLevel,
      department: ob.department,
      targetGrades: ob.targetGrades,
    };
    set({ profile, isDemo: false, attempts: [], route: 'app', appScreen: 'dashboard' });
    scrollTop();
  };
  const obNext = () => {
    if (!obCanContinue()) return;
    const { ob } = get();
    if (ob.step < 3) set({ ob: { ...ob, step: ob.step + 1 } });
    else obFinish();
    scrollTop();
  };
  const obBack = () => {
    const { ob } = get();
    if (ob.step > 1) set({ ob: { ...ob, step: ob.step - 1 } });
    else go('landing');
  };

  // ---- sessions ----
  const startMock = (id) => {
    const def = MOCK_DEFS.find((m) => m.id === id);
    if (!def) return;
    const slots = def.theory
      ? def.theorySpec.map((cat) => ({ subject: cat === 'English' ? 'English Language' : cat, cat, type: 'theory', q: { ...THEORY[cat] } }))
      : buildSlots(def.spec);
    const session = {
      id: uid(),
      mode: 'exam',
      mockId: id,
      title: def.title,
      examType: def.examType,
      theory: !!def.theory,
      slots,
      answers: {},
      flags: {},
      current: 0,
      startedAt: Date.now(),
      endTime: Date.now() + def.duration * 1000,
      durationSec: def.duration,
    };
    set({ session, route: 'exam', confirmOpen: false });
    scrollTop();
  };

  const startPractice = (opts) => {
    const subject = opts.subject && opts.subject !== 'All' ? opts.subject : null;
    const cat = subject ? catOf(subject) : null;
    const pools = cat ? [cat] : Object.keys(POOL);
    let bank = [];
    pools.forEach((p) => (POOL[p] || []).forEach((q) => bank.push({ subject: subject || p, cat: p, type: 'objective', q: { ...q } })));
    bank = bank.sort(() => Math.random() - 0.5);
    const count = Math.min(opts.count, Math.max(bank.length, 1));
    const slots = [];
    for (let i = 0; i < count; i++) slots.push(bank[i % bank.length]);
    set({
      session: { id: uid(), mode: 'practice', title: opts.title, examType: get().profile.examType, slots, answers: {}, revealed: {}, current: 0, startedAt: Date.now() },
      route: 'app',
      appScreen: 'practice',
    });
    scrollTop();
  };

  const startTheoryPractice = (cat) => {
    const slots = [{ subject: cat === 'English' ? 'English Language' : cat, cat, type: 'theory', q: { ...THEORY[cat] } }];
    set({
      session: {
        id: uid(),
        mode: 'practice',
        title: `${cat} theory practice`,
        examType: get().profile.examType,
        slots,
        answers: {},
        revealed: {},
        current: 0,
        startedAt: Date.now(),
        theory: true,
      },
      route: 'app',
      appScreen: 'practice',
    });
  };

  const exitPractice = () => set({ session: null });

  const selectAnswer = (choice) => {
    const s = get().session;
    if (!s) return;
    const answers = { ...s.answers, [s.current]: choice };
    const ns = { ...s, answers };
    if (s.mode === 'practice') ns.revealed = { ...s.revealed, [s.current]: true };
    set({ session: ns });
  };
  const setTheory = (text) => {
    const s = get().session;
    if (!s) return;
    set({ session: { ...s, answers: { ...s.answers, [s.current]: text } } });
  };
  const revealTheory = () => {
    const s = get().session;
    set({ session: { ...s, revealed: { ...s.revealed, [s.current]: true } } });
  };
  const gotoQ = (i) => {
    const s = get().session;
    set({ session: { ...s, current: i } });
    scrollTop();
  };
  const nextQ = () => {
    const s = get().session;
    if (s.current < s.slots.length - 1) gotoQ(s.current + 1);
  };
  const prevQ = () => {
    const s = get().session;
    if (s.current > 0) gotoQ(s.current - 1);
  };
  const toggleFlag = () => {
    const s = get().session;
    const flags = { ...s.flags };
    flags[s.current] = !flags[s.current];
    set({ session: { ...s, flags } });
  };

  const openSubmit = () => set({ confirmOpen: true });
  const cancelSubmit = () => set({ confirmOpen: false });

  const submitPractice = () => {
    const { session: s, profile, attempts } = get();
    const result = score(s, profile);
    const att = {
      id: uid(),
      kind: 'practice',
      title: s.title,
      examType: s.examType,
      subject: s.slots[0] && s.slots[0].subject,
      total: result.objectiveTotal,
      correct: result.correct,
      when: todayStr(),
      timeUsed: elapsed(s),
      theory: !!s.theory,
    };
    set({ attempts: [...attempts, att], lastResult: result, session: null, route: 'app', appScreen: 'results', confirmOpen: false, expandedReview: null });
    scrollTop();
  };

  const submitExam = (auto) => {
    const { session: s, profile, attempts } = get();
    if (!s) return;
    const result = score(s, profile);
    const att = {
      id: uid(),
      kind: 'mock',
      title: s.title,
      examType: s.examType,
      total: result.objectiveTotal,
      correct: result.correct,
      score400: result.score400,
      when: todayStr(),
      timeUsed: elapsed(s),
      subjects: result.subjectCorrect,
      subjectTotals: result.subjectTotal,
      theory: !!s.theory,
      auto: !!auto,
    };
    set({ attempts: [...attempts, att], lastResult: result, session: null, route: 'app', appScreen: 'results', confirmOpen: false, expandedReview: null });
    scrollTop();
  };

  // ---- profile ----
  const profileSet = (k, v) => set({ profile: { ...get().profile, [k]: v } });
  const resetAll = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    set({ profile: null, attempts: [], session: null, isDemo: false, route: 'landing' });
  };

  return {
    set,
    go,
    goScreen,
    exploreDemo,
    submitAuth,
    obSet,
    obChooseExam,
    obToggleSubject,
    obCanContinue,
    obNext,
    obBack,
    startMock,
    startPractice,
    startTheoryPractice,
    exitPractice,
    selectAnswer,
    setTheory,
    revealTheory,
    gotoQ,
    nextQ,
    prevQ,
    toggleFlag,
    openSubmit,
    cancelSubmit,
    submitPractice,
    submitExam,
    profileSet,
    resetAll,
  };
}
