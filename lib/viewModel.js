import { ALL_UPDATES, JAMB_SUBJECTS, PALETTE, POOL, THEORY, WAEC_CATALOGUE } from '@/lib/data';
import { MOCK_DEFS, catColor, catOf, fmt, fmtH } from '@/lib/exam';

function obSubjectList(st, actions) {
  const ob = st.ob;
  if (!ob.examType) return [];
  const list = ob.examType === 'JAMB' ? JAMB_SUBJECTS : WAEC_CATALOGUE[ob.department] || [];
  return list.map((s) => {
    const sel = ob.subjects.includes(s);
    const locked = ob.examType === 'JAMB' && s === 'Use of English';
    return {
      name: locked ? s + ' · required' : s,
      selected: sel,
      onClick: () => actions.obToggleSubject(s),
      style: `padding:9px 15px;border:1.5px solid;border-radius:999px;font-size:13.5px;font-weight:600;cursor:pointer;${sel ? `border-color:${PALETTE.deep};background:${PALETTE.ice};color:${PALETTE.navy}` : 'border-color:#e3ebf4;background:#fff;color:#334'}${locked ? ';opacity:.85' : ''}`,
    };
  });
}

/** Turns app state + actions into the flat view-model the screens render from. */
export function buildViewModel(st, actions) {
  const p = st.profile;
  const route = st.route;
  const screen = st.appScreen;
  const examType = p ? p.examType : null;
  const examLabel = examType === 'JAMB' ? 'JAMB UTME' : examType === 'WAEC' ? 'WAEC / O-Level' : '';
  const initials = p
    ? p.name
        .split(' ')
        .map((x) => x[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const navDefs = [
    { key: 'dashboard', label: 'Overview', icon: 'layout-dashboard' },
    { key: 'practice', label: 'Practice', icon: 'book-open' },
    { key: 'mock-exams', label: 'Mock exams', icon: 'timer' },
    { key: 'progress', label: 'Progress', icon: 'trending-up' },
    { key: 'updates', label: 'Exam updates', icon: 'megaphone' },
    { key: 'profile', label: 'Profile', icon: 'user-round' },
  ];
  const navItems = navDefs.map((it) => {
    const active = screen === it.key || (screen === 'results' && it.key === 'mock-exams');
    return {
      ...it,
      onClick: () => actions.goScreen(it.key),
      navStyle: `display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:11px;font-size:14.5px;font-weight:600;text-align:left;cursor:pointer;${active ? 'background:rgba(255,255,255,.12);color:#fff' : 'background:transparent;color:#c7d6ea'}`,
    };
  });
  const pageTitles = {
    dashboard: 'Overview',
    practice: 'Practice',
    'mock-exams': 'Mock exams',
    results: 'Results',
    progress: 'Progress',
    updates: 'Exam updates',
    profile: 'Profile & settings',
  };

  const att = st.attempts;
  const mocks = att.filter((a) => a.kind === 'mock');
  const hasHistory = att.length > 0;
  const totalQuestions = att.reduce((n, a) => n + (a.total || 0), 0);
  const totalCorrect = att.reduce((n, a) => n + (a.correct || 0), 0);
  const avgAccuracy = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const latestMock = mocks[mocks.length - 1];
  const estScore = latestMock && latestMock.score400 != null ? latestMock.score400 : null;

  const subjAgg = {};
  att.forEach((a) => {
    if (a.subjects) {
      Object.keys(a.subjects).forEach((k) => {
        subjAgg[k] = subjAgg[k] || { c: 0, t: 0 };
        subjAgg[k].c += a.subjects[k];
        subjAgg[k].t += (a.subjectTotals && a.subjectTotals[k]) || 0;
      });
    } else if (a.subject) {
      subjAgg[a.subject] = subjAgg[a.subject] || { c: 0, t: 0 };
      subjAgg[a.subject].c += a.correct || 0;
      subjAgg[a.subject].t += a.total || 0;
    }
  });
  const subjectPerf = Object.keys(subjAgg).map((k) => {
    const o = subjAgg[k];
    const pct = o.t ? Math.round((o.c / o.t) * 100) : 0;
    const col = pct >= 65 ? PALETTE.deep : pct >= 50 ? PALETTE.steel : '#d98a6a';
    const sc = pct >= 65 ? PALETTE.deep : pct >= 50 ? PALETTE.steel : '#c15f3c';
    return {
      name: k,
      pct,
      label: pct + '%',
      status: pct >= 65 ? 'Strong' : pct >= 50 ? 'Fair' : 'Needs work',
      statusStyle: `font-size:12px;font-weight:700;color:${sc}`,
      barStyle: `height:100%;border-radius:999px;width:${pct}%;background:${col}`,
    };
  });

  const targetScore = p ? p.targetScore : 0;
  const targetProgressPct = p && estScore != null ? Math.min(100, Math.round((estScore / Math.max(targetScore, 1)) * 100)) : 0;
  const waecPract = p && examType === 'WAEC' ? Object.keys(subjAgg).length : 0;
  const waecPct = p && examType === 'WAEC' && p.subjects.length ? Math.round((waecPract / p.subjects.length) * 100) : 0;
  const targetCard = p
    ? examType === 'JAMB'
      ? {
          isJamb: true,
          isWaec: false,
          label: 'Target UTME score',
          target: targetScore,
          est: estScore != null ? estScore : '—',
          estNote: estScore != null ? (hasHistory ? 'Estimated from your latest mock' : '') : 'Take a mock to estimate your score',
          barStyle: `height:100%;background:${PALETTE.ice};border-radius:999px;width:${targetProgressPct}%;transition:width .8s ease`,
          cta: 'Take a mock exam',
          ctaAction: () => actions.goScreen('mock-exams'),
        }
      : {
          isJamb: false,
          isWaec: true,
          label: 'Target grades',
          targetGrades: p.targetGrades,
          subjectsPractised: waecPract,
          subjectsTotal: p.subjects.length,
          barStyle: `height:100%;background:${PALETTE.ice};border-radius:999px;width:${waecPct}%;transition:width .8s ease`,
          cta: 'Continue studying',
          ctaAction: () => actions.goScreen('practice'),
        }
    : { isJamb: false, isWaec: false };

  let recSubject = p ? p.subjects.find((x) => POOL[catOf(x)]) || 'Mathematics' : 'Mathematics';
  if (subjectPerf.length) {
    const weak = [...subjectPerf].sort((a, b) => a.pct - b.pct)[0];
    if (weak) recSubject = weak.name;
  }
  const recCat = catOf(recSubject);
  const dailyPractice = p
    ? {
        subject: recSubject,
        topic: (POOL[recCat] && POOL[recCat][0] && POOL[recCat][0].topic) || 'Mixed topics',
        duration: '12 min',
        count: 10,
        onStart: () => actions.startPractice({ subject: recSubject, count: 10, title: `${recSubject} practice` }),
      }
    : {};

  const recentActivity = [...att]
    .reverse()
    .slice(0, 4)
    .map((a) => ({
      title: a.title,
      meta: `${a.kind === 'mock' ? 'Mock exam' : 'Practice'} · ${a.when}`,
      score: a.kind === 'mock' && a.score400 != null ? a.score400 + '/400' : a.total ? `${a.correct}/${a.total}` : 'Submitted',
      icon: a.kind === 'mock' ? 'timer' : 'book-open',
    }));

  const catChip = (cat) => `font-size:11px;font-weight:700;color:#fff;padding:3px 10px;border-radius:999px;background:${catColor(cat)}`;
  const updCatsArr = ['All', 'JAMB', 'WAEC', 'Registration', 'Study advice'];
  const updatesList = ALL_UPDATES.filter((u) => st.updateCategory === 'All' || u.category === st.updateCategory).map((u) => ({
    ...u,
    catStyle: catChip(u.category),
  }));
  const dashUpdates = ALL_UPDATES.slice(0, 3).map((u) => ({ ...u, catStyle: catChip(u.category) }));

  // session / question view
  const s = st.session;
  let qv = null,
    exam = null,
    practice = null;
  if (s) {
    const slot = s.slots[s.current];
    const q = slot.q;
    const isTheory = slot.type === 'theory';
    const revealed = s.mode === 'practice' ? !!(s.revealed && s.revealed[s.current]) : false;
    const canPrev = s.current > 0,
      canNext = s.current < s.slots.length - 1;
    qv = {
      number: s.current + 1,
      total: s.slots.length,
      subject: slot.subject,
      topic: q.topic || '',
      text: q.text,
      isTheory,
      marks: q.marks,
      theoryText: isTheory ? s.answers[s.current] || '' : '',
      setThEvt: (e) => actions.setTheory(e.target.value),
      options: isTheory
        ? []
        : q.options.map((opt, idx) => {
            const sel = s.answers[s.current] === idx;
            let bg = '#fff',
              bd = '#e3ebf4';
            if (s.mode === 'practice' && revealed) {
              if (idx === q.correct) {
                bg = PALETTE.ice;
                bd = PALETTE.deep;
              } else if (sel) {
                bg = '#fbe9e2';
                bd = '#c15f3c';
              }
            } else if (sel) {
              bg = PALETTE.ice;
              bd = PALETTE.deep;
            }
            return {
              letter: ['A', 'B', 'C', 'D'][idx],
              text: opt,
              selected: sel,
              showTick: s.mode === 'practice' && sel,
              onSelect: () => (s.mode === 'exam' || !revealed) && actions.selectAnswer(idx),
              style: `display:flex;align-items:center;gap:13px;text-align:left;padding:14px 17px;border-radius:12px;font-size:15px;cursor:pointer;color:${PALETTE.navy};border:1.5px solid ${bd};background:${bg};`,
            };
          }),
      revealed,
      canReveal: s.mode === 'practice' && isTheory && !revealed,
      onRevealTheory: actions.revealTheory,
      explanation: q.explanation,
      correctLetter: isTheory ? '' : ['A', 'B', 'C', 'D'][q.correct],
      modelAnswer: q.modelAnswer,
      progressBar: `height:100%;background:${PALETTE.deep};border-radius:999px;transition:width .3s;width:${Math.round(((s.current + 1) / s.slots.length) * 100)}%`,
      onPrev: actions.prevQ,
      onNext: actions.nextQ,
      canPrev,
      canNext,
      prevStyle: `padding:12px 22px;border:1.5px solid #e3ebf4;border-radius:999px;font-weight:600;font-size:15px;background:#fff;color:${PALETTE.navy};display:flex;align-items:center;gap:7px;cursor:pointer;${canPrev ? '' : 'opacity:.4;pointer-events:none'}`,
      nextStyle: `padding:12px 24px;border-radius:999px;font-weight:700;font-size:15px;background:${PALETTE.deep};color:#fff;display:flex;align-items:center;gap:8px;cursor:pointer;${canNext ? '' : 'opacity:.4;pointer-events:none'}`,
    };
    if (s.mode === 'exam') {
      const remaining = Math.floor((s.endTime - (st.now || Date.now())) / 1000);
      const warn = remaining <= 300;
      exam = {
        title: s.title,
        theory: !!s.theory,
        timer: s.durationSec >= 3600 ? fmtH(remaining) : fmt(remaining),
        timerStyle: `display:flex;align-items:center;gap:8px;font-family:monospace;font-size:18px;font-weight:700;padding:7px 15px;border-radius:10px;background:${warn ? 'rgba(193,95,60,.2)' : 'rgba(255,255,255,.08)'};color:${warn ? '#ffb59c' : PALETTE.ice}`,
        palette: s.slots.map((sl, i) => {
          const ans = s.answers[i] != null && s.answers[i] !== '';
          const fl = !!s.flags[i];
          const cur = i === s.current;
          let bg = '#fff',
            bd = '#e3ebf4',
            col = PALETTE.navy;
          if (ans) {
            bg = PALETTE.deep;
            bd = PALETTE.deep;
            col = '#fff';
          }
          if (fl) {
            bg = '#fff3e8';
            bd = '#e4915f';
            col = '#c15f3c';
          }
          return {
            n: i + 1,
            onClick: () => actions.gotoQ(i),
            style: `aspect-ratio:1;border:1.5px solid ${bd};border-radius:9px;font-size:12.5px;font-weight:700;cursor:pointer;background:${bg};color:${col};${cur ? `box-shadow:0 0 0 2px ${PALETTE.steel}` : ''}`,
          };
        }),
        onFlag: actions.toggleFlag,
        flagStyle: `display:flex;align-items:center;gap:7px;font-size:13.5px;font-weight:600;padding:8px 14px;border-radius:999px;border:1.5px solid;cursor:pointer;${s.flags[s.current] ? 'border-color:#e4915f;background:#fff3e8;color:#c15f3c' : `border-color:#e3ebf4;background:#fff;color:${PALETTE.navy}`}`,
        answeredCount: Object.keys(s.answers).filter((k) => s.answers[k] != null && s.answers[k] !== '').length,
        total: s.slots.length,
        unanswered: s.slots.length - Object.keys(s.answers).filter((k) => s.answers[k] != null && s.answers[k] !== '').length,
        onSubmit: actions.openSubmit,
      };
    } else {
      practice = { title: s.title, onExit: actions.exitPractice, onFinish: actions.submitPractice };
    }
  }

  const practiceSubjectsArr = ['All', ...(p ? p.subjects.filter((x) => POOL[catOf(x)] || THEORY[catOf(x)]) : Object.keys(POOL))];
  const chip = (active) =>
    `padding:8px 16px;border:1.5px solid;border-radius:999px;font-size:13.5px;font-weight:600;cursor:pointer;${active ? `border-color:${PALETTE.deep};background:${PALETTE.ice};color:${PALETTE.navy}` : 'border-color:#e3ebf4;background:#fff;color:#334'}`;
  const practiceSubjects = practiceSubjectsArr.map((x) => ({
    name: x,
    onClick: () => actions.set({ practiceFilterSubject: x }),
    chipStyle: chip(x === st.practiceFilterSubject),
  }));
  const practiceModes = [
    { title: 'Quick practice', desc: '5 questions · instant feedback', count: 5, icon: 'zap' },
    { title: 'Standard practice', desc: '10 questions · build consistency', count: 10, icon: 'layers' },
    { title: 'Extended set', desc: '20 questions · exam stamina', count: 20, icon: 'list-checks' },
  ].map((m) => ({
    ...m,
    onStart: () =>
      actions.startPractice({
        subject: st.practiceFilterSubject,
        count: m.count,
        title: `${st.practiceFilterSubject === 'All' ? 'Mixed' : st.practiceFilterSubject} practice`,
      }),
  }));
  const theoryAvailable = examType === 'WAEC';
  const theoryModes = ['Economics', 'Mathematics', 'English'].map((c) => ({
    label: `${c === 'English' ? 'English Language' : c} theory`,
    onStart: () => actions.startTheoryPractice(c),
  }));

  const mockList = MOCK_DEFS.filter((m) => !examType || m.examType === examType).map((m) => {
    const done = mocks.filter((a) => a.title === m.title).length;
    return {
      ...m,
      qcount: m.full ? 180 : m.theory ? 3 : 10,
      durLabel: m.duration >= 3600 ? `${Math.round(m.duration / 3600)} hr` : `${Math.round(m.duration / 60)} min`,
      statusLabel: done ? `Attempted ${done}×` : 'Not attempted',
      onStart: () => actions.startMock(m.id),
    };
  });

  const r = st.lastResult;
  let results = null;
  if (r) {
    const subjRows = Object.keys(r.subjectTotal).map((k) => {
      const c = r.subjectCorrect[k] || 0,
        t = r.subjectTotal[k];
      const pct = Math.round((c / t) * 100);
      return {
        subject: k,
        correct: c,
        total: t,
        label: pct + '%',
        barStyle: `height:100%;border-radius:999px;width:${pct}%;background:${pct >= 65 ? PALETTE.deep : pct >= 50 ? PALETTE.steel : '#d98a6a'}`,
      };
    });
    const reviewItems = r.review.map((it) => ({
      ...it,
      num: it.i + 1,
      open: st.expandedReview === it.i,
      onToggle: () => actions.set({ expandedReview: st.expandedReview === it.i ? null : it.i }),
      isObjective: it.type === 'objective',
      isTheory: it.type === 'theory',
      yourTextShown: it.type === 'theory' ? (it.yourText && it.yourText.trim() ? it.yourText : '(left blank)') : '',
      statusLabel: it.type === 'objective' ? (it.unanswered ? 'Skipped' : it.ok ? 'Correct' : 'Incorrect') : it.answered ? 'Submitted' : 'Blank',
      statusStyle: `font-size:12px;font-weight:700;padding:4px 10px;border-radius:999px;flex-shrink:0;color:#fff;background:${it.type === 'objective' ? (it.unanswered ? '#8aa0bb' : it.ok ? PALETTE.deep : '#c15f3c') : PALETTE.steel}`,
      optionRows:
        it.type === 'objective'
          ? it.options.map((o, idx) => ({
              letter: ['A', 'B', 'C', 'D'][idx],
              text: o,
              isCorrect: idx === it.correct,
              yoursWrong: idx === it.your && !it.ok,
              rowStyle: `display:flex;align-items:center;gap:11px;padding:11px 15px;border:1.5px solid;border-radius:11px;font-size:14px;${idx === it.correct ? `background:${PALETTE.ice};border-color:${PALETTE.deep}` : idx === it.your && !it.ok ? 'background:#fbe9e2;border-color:#c15f3c' : 'border-color:#e3ebf4'}`,
            }))
          : [],
    }));
    const ringPct = r.isJamb ? Math.round((r.score400 / 400) * 100) : r.percentage;
    results = {
      ...r,
      subjRows,
      reviewItems,
      hasSubjects: subjRows.length > 0,
      ringDash: `${ringPct * 2.76} 276`,
      bigNumber: r.isJamb ? r.score400 : r.percentage + '%',
      bigLabel: r.isJamb ? 'out of 400' : `Grade ${r.grade}`,
      targetLabel: r.isJamb && r.target ? `Target ${r.target}` : '',
      verdict: r.meetsTarget ? 'On track for your target' : 'Keep practising to close the gap',
      onAnother: () => actions.goScreen('mock-exams'),
    };
  }

  const trend = mocks.map((m) => ({ v: m.score400 != null ? m.score400 : Math.round((m.correct / Math.max(m.total, 1)) * 400) }));
  const trendPts = trend.length > 1 ? trend.map((t, i) => `${40 + i * (520 / (trend.length - 1))},${180 - (t.v / 400) * 150}`).join(' ') : '';
  const recommendations = [];
  subjectPerf
    .filter((x) => x.pct < 65)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 2)
    .forEach((x) => recommendations.push({ text: `Prioritise ${x.name} — accuracy is ${x.pct}%.`, icon: 'target' }));
  if (p)
    p.subjects
      .filter((x) => !subjAgg[x])
      .slice(0, 2)
      .forEach((x) => recommendations.push({ text: `You haven’t practised ${x} yet — start a quick set.`, icon: 'sparkles' }));
  if (!recommendations.length) recommendations.push({ text: 'Great consistency — keep taking full mocks to hold your score.', icon: 'thumbs-up' });
  const progress = {
    stats: [
      { label: 'Questions attempted', value: totalQuestions, icon: 'list-checks' },
      { label: 'Average accuracy', value: avgAccuracy + '%', icon: 'percent' },
      { label: 'Mock exams', value: mocks.length, icon: 'timer' },
      { label: 'Est. UTME score', value: estScore != null ? estScore : '—', icon: 'gauge' },
    ],
    subjectPerf,
    recommendations,
    hasTrend: trend.length > 1,
    noTrend: trend.length <= 1,
    trendPts,
    trendDots: trend.map((t, i) => ({ cx: 40 + i * (520 / Math.max(trend.length - 1, 1)), cy: 180 - (t.v / 400) * 150 })),
  };

  return {
    isLanding: route === 'landing',
    isAuth: route === 'auth',
    isOnboarding: route === 'onboarding',
    isExam: route === 'exam',
    isApp: route === 'app',
    showDashboard: screen === 'dashboard',
    showPractice: screen === 'practice',
    showMocks: screen === 'mock-exams',
    showResults: screen === 'results',
    showProgress: screen === 'progress',
    showUpdates: screen === 'updates',
    showProfile: screen === 'profile',
    pageTitle: pageTitles[screen] || '',
    examLabel,
    initials,
    greet,
    navItems,
    profile: p ? { ...p, firstName: p.name.split(' ')[0] } : {},
    isDemo: st.isDemo,
    onStart: () => actions.go('onboarding'),
    onSignIn: () => actions.set({ route: 'auth', authMode: 'login', authError: '' }),
    onSignUp: () => actions.set({ route: 'auth', authMode: 'signup', authError: '' }),
    onDemo: actions.exploreDemo,
    onJamb: () => {
      actions.set({ ob: { ...st.ob, examType: 'JAMB', subjects: ['Use of English'] }, route: 'onboarding' });
      window.scrollTo(0, 0);
    },
    onWaec: () => {
      actions.set({ ob: { ...st.ob, examType: 'WAEC', subjects: [] }, route: 'onboarding' });
      window.scrollTo(0, 0);
    },
    authIsSignup: st.authMode === 'signup',
    authEmail: st.authEmail,
    authPassword: st.authPassword,
    authName: st.authName,
    pwType: st.pwVisible ? 'text' : 'password',
    pwIcon: st.pwVisible ? 'eye-off' : 'eye',
    authError: st.authError,
    authHasError: !!st.authError,
    authLoading: st.authLoading,
    authTitle: st.authMode === 'signup' ? 'Create your account' : 'Welcome back',
    authSwitchText: st.authMode === 'signup' ? 'Already have an account?' : 'New to Apex?',
    authSwitchCta: st.authMode === 'signup' ? 'Sign in' : 'Create account',
    setAuthEmail: (e) => actions.set({ authEmail: e.target.value }),
    setAuthPassword: (e) => actions.set({ authPassword: e.target.value }),
    setAuthName: (e) => actions.set({ authName: e.target.value }),
    togglePw: () => actions.set({ pwVisible: !st.pwVisible }),
    submitAuth: actions.submitAuth,
    switchAuth: () => actions.set({ authMode: st.authMode === 'signup' ? 'login' : 'signup', authError: '' }),
    backToLanding: () => actions.go('landing'),
    obStep: st.ob.step,
    obIsJamb: st.ob.examType === 'JAMB',
    obIsWaec: st.ob.examType === 'WAEC',
    obStep1: st.ob.step === 1,
    obStep2: st.ob.step === 2,
    obStep3: st.ob.step === 3,
    obProgressBar: `height:100%;background:${PALETTE.deep};width:${(st.ob.step / 3) * 100}%;transition:width .4s ease`,
    obChooseJamb: () => actions.obChooseExam('JAMB'),
    obChooseWaec: () => actions.obChooseExam('WAEC'),
    obJambSelected: st.ob.examType === 'JAMB',
    obWaecSelected: st.ob.examType === 'WAEC',
    obJambCardStyle: `text-align:left;border:2px solid;border-radius:18px;padding:26px;background:#fff;cursor:pointer;${st.ob.examType === 'JAMB' ? `border-color:${PALETTE.deep};background:#eef5fd` : 'border-color:#e3ebf4'}`,
    obWaecCardStyle: `text-align:left;border:2px solid;border-radius:18px;padding:26px;background:#fff;cursor:pointer;${st.ob.examType === 'WAEC' ? `border-color:${PALETTE.deep};background:#eef5fd` : 'border-color:#e3ebf4'}`,
    obSubjectList: obSubjectList(st, actions),
    obName: st.ob.name,
    obNameSet: (e) => actions.obSet('name', e.target.value),
    obCourse: st.ob.course,
    obCourseSet: (e) => actions.obSet('course', e.target.value),
    obTarget: st.ob.targetScore,
    obTargetSet: (e) => actions.obSet('targetScore', Number(e.target.value)),
    obDate: st.ob.examDate,
    obDateSet: (e) => actions.obSet('examDate', e.target.value),
    obClassOpts: ['SS1', 'SS2', 'SS3'].map((c) => ({
      label: c,
      onClick: () => actions.obSet('classLevel', c),
      style: `flex:1;padding:10px;border:1.5px solid;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;${st.ob.classLevel === c ? `border-color:${PALETTE.deep};background:${PALETTE.ice};color:${PALETTE.navy}` : 'border-color:#e3ebf4;background:#fff;color:#334'}`,
    })),
    obDeptOpts: ['Science', 'Arts', 'Commercial'].map((d) => ({
      label: d,
      onClick: () => actions.set({ ob: { ...st.ob, department: d, subjects: [] } }),
      style: `flex:1;padding:10px;border:1.5px solid;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;${st.ob.department === d ? `border-color:${PALETTE.deep};background:${PALETTE.ice};color:${PALETTE.navy}` : 'border-color:#e3ebf4;background:#fff;color:#334'}`,
    })),
    obGrades: st.ob.targetGrades,
    obGradesSet: (e) => actions.obSet('targetGrades', e.target.value),
    obSubjectCount: st.ob.subjects.length,
    obSubjectsText: st.ob.subjects.join(', ') || 'None yet',
    obNextLabel: st.ob.step === 3 ? 'Build my dashboard' : 'Continue',
    obNext: actions.obNext,
    obBack: actions.obBack,
    obNextStyle: `padding:12px 26px;border-radius:999px;font-weight:700;font-size:15px;color:#fff;display:flex;align-items:center;gap:8px;cursor:pointer;${actions.obCanContinue() ? `background:${PALETTE.deep}` : 'background:#9fb4d0;pointer-events:none'}`,
    obStepHint: st.ob.examType === 'JAMB' ? 'Select Use of English + 3 subjects (4 total).' : 'Select at least 4 subjects to practise.',
    examLabelOb: st.ob.examType === 'JAMB' ? 'JAMB UTME' : 'WAEC / O-Level',
    obTargetLabel: st.ob.examType === 'JAMB' ? `${st.ob.targetScore} / 400` : st.ob.targetGrades,
    toast: st.toast,
    hasToast: !!st.toast,
    targetCard,
    dailyPractice,
    subjectPerf,
    hasSubjectPerf: subjectPerf.length > 0,
    noSubjectPerf: subjectPerf.length === 0,
    recentActivity,
    hasActivity: recentActivity.length > 0,
    noActivity: recentActivity.length === 0,
    dashUpdates,
    navMockBtn: () => actions.goScreen('mock-exams'),
    navUpdatesBtn: () => actions.goScreen('updates'),
    navProgressBtn: () => actions.goScreen('progress'),
    practiceInactive: !(s && s.mode === 'practice'),
    practiceActive: !!(s && s.mode === 'practice'),
    practiceSubjects,
    practiceModes,
    theoryAvailable,
    theoryModes,
    qv: qv || {},
    qvIsTheory: qv ? qv.isTheory : false,
    qvIsObjective: qv ? !qv.isTheory : false,
    qvRevealed: qv ? qv.revealed : false,
    qvLast: qv ? qv.number === qv.total : false,
    exam: exam || {},
    practice: practice || {},
    confirmOpen: st.confirmOpen,
    confirmSubmit: () => actions.submitExam(false),
    cancelSubmit: actions.cancelSubmit,
    mockList,
    results: results || {},
    hasResults: !!results,
    noResults: !results,
    progress,
    updatesList,
    updCats: updCatsArr.map((c) => ({ name: c, onClick: () => actions.set({ updateCategory: c }), chipStyle: chip(c === st.updateCategory) })),
    profileIsJamb: examType === 'JAMB',
    setName: (e) => actions.profileSet('name', e.target.value),
    setEmail: (e) => actions.profileSet('email', e.target.value),
    setTarget: (e) => actions.profileSet('targetScore', Number(e.target.value)),
    setDate: (e) => actions.profileSet('examDate', e.target.value),
    resetAll: actions.resetAll,
    profileSubjects: p ? p.subjects : [],
  };
}
