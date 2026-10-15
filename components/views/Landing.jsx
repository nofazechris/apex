import Icon from '@/components/Icon';

export default function Landing({ vm }) {
  const { onDemo, onJamb, onSignIn, onSignUp, onStart, onWaec } = vm;
  return (
    <div>
      <nav
        style={{
          position: 'sticky',
          top: '0',
          zIndex: '40',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 40px',
          background: 'rgba(255,255,255,.88)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e3ebf4',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              display: 'inline-flex',
              width: '30px',
              height: '30px',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#052659',
              borderRadius: '9px',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="#C1E8FF"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 18 L12 5 L20 18" />
              <path d="M8.5 18 L12 12.5 L15.5 18" />
            </svg>
          </span>
          <span style={{ fontSize: '21px', fontWeight: '800', letterSpacing: '-.02em' }}>apex</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px', fontSize: '14.5px', fontWeight: '500', color: '#33465e' }}>
          <a href="#how" style={{ color: '#33465e' }}>
            How it works
          </a>
          <a href="#features" style={{ color: '#33465e' }}>
            Features
          </a>
          <a href="#paths" style={{ color: '#33465e' }}>
            JAMB
          </a>
          <a href="#paths" style={{ color: '#33465e' }}>
            WAEC
          </a>
          <button onClick={onSignIn} style={{ color: '#052659', fontWeight: '600', fontSize: '14.5px' }}>
            Sign in
          </button>
          <button
            onClick={onStart}
            style={{
              background: '#052659',
              color: '#fff',
              padding: '10px 18px',
              borderRadius: '999px',
              fontWeight: '600',
              fontSize: '14.5px',
            }}
          >
            Start preparing
          </button>
        </div>
      </nav>
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(160deg,#021024 0%,#052659 60%,#063a73 100%)',
          color: '#fff',
          padding: '76px 40px 90px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(132,131,179,0),rgba(84,131,179,.35))',
            filter: 'blur(10px)',
          }}
        />
        <div
          style={{
            position: 'relative',
            maxWidth: '1180px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.05fr .95fr',
            gap: '56px',
            alignItems: 'center',
          }}
        >
          <div className="apx-fade">
            <span
              style={{
                display: 'inline-block',
                fontSize: '12px',
                letterSpacing: '.18em',
                fontWeight: '700',
                color: '#C1E8FF',
                background: 'rgba(193,232,255,.1)',
                border: '1px solid rgba(193,232,255,.25)',
                padding: '7px 14px',
                borderRadius: '999px',
              }}
            >
              EXAM PREPARATION, REIMAGINED
            </span>
            <h1
              style={{
                fontSize: '58px',
                lineHeight: '1.02',
                fontWeight: '800',
                letterSpacing: '-.03em',
                margin: '22px 0 18px',
                textWrap: 'balance',
              }}
            >
              Your next result starts here.
            </h1>
            <p style={{ fontSize: '18.5px', lineHeight: '1.55', color: '#c7d6ea', maxWidth: '500px' }}>
              Prepare smarter for JAMB and WAEC with personalised practice, realistic mock exams, and clear insight into your progress.
            </p>
            <div style={{ display: 'flex', gap: '14px', margin: '30px 0 18px', flexWrap: 'wrap' }}>
              <button
                onClick={onStart}
                style={{
                  background: '#C1E8FF',
                  color: '#021024',
                  padding: '14px 26px',
                  borderRadius: '999px',
                  fontWeight: '700',
                  fontSize: '15.5px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {'Start preparing '}
                <Icon name="arrow-right" />
              </button>
              <button
                onClick={onDemo}
                style={{
                  background: 'rgba(255,255,255,.08)',
                  border: '1px solid rgba(255,255,255,.28)',
                  color: '#fff',
                  padding: '14px 24px',
                  borderRadius: '999px',
                  fontWeight: '600',
                  fontSize: '15.5px',
                }}
              >
                Explore demo
              </button>
            </div>
            <p style={{ fontSize: '13.5px', color: '#93aaca', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="sparkles" />
              {' One platform. Your subjects. Your target.'}
            </p>
          </div>
          <div
            className="apx-fade"
            style={{
              background: '#fff',
              borderRadius: '22px',
              padding: '20px',
              boxShadow: '0 30px 70px -20px rgba(0,0,0,.55)',
              color: '#021024',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#5b6b82' }}>Good afternoon,</div>
                <div style={{ fontWeight: '700', fontSize: '16px' }}>David Okafor</div>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#052659',
                  background: '#C1E8FF',
                  padding: '5px 11px',
                  borderRadius: '999px',
                }}
              >
                JAMB UTME
              </span>
            </div>
            <div
              style={{
                background: 'linear-gradient(135deg,#052659,#0a3d78)',
                color: '#fff',
                borderRadius: '16px',
                padding: '18px',
                marginBottom: '14px',
              }}
            >
              <div style={{ fontSize: '12.5px', color: '#b9cde8' }}>Target UTME score</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '4px 0 12px' }}>
                <span style={{ fontSize: '38px', fontWeight: '800' }}>300</span>
                <span style={{ fontSize: '13px', color: '#9fbbdd' }}>current est. 288</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,.2)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '88%', background: '#C1E8FF', borderRadius: '999px' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
              <div style={{ border: '1px solid #e3ebf4', borderRadius: '13px', padding: '12px' }}>
                <div style={{ fontSize: '12px', color: '#5b6b82' }}>Mathematics</div>
                <div style={{ fontWeight: '700', fontSize: '15px', marginTop: '2px' }}>72%</div>
                <div style={{ height: '6px', background: '#eef3f9', borderRadius: '999px', marginTop: '7px' }}>
                  <div style={{ height: '100%', width: '72%', background: '#052659', borderRadius: '999px' }} />
                </div>
              </div>
              <div style={{ border: '1px solid #e3ebf4', borderRadius: '13px', padding: '12px' }}>
                <div style={{ fontSize: '12px', color: '#5b6b82' }}>Physics</div>
                <div style={{ fontWeight: '700', fontSize: '15px', marginTop: '2px' }}>54%</div>
                <div style={{ height: '6px', background: '#eef3f9', borderRadius: '999px', marginTop: '7px' }}>
                  <div style={{ height: '100%', width: '54%', background: '#5483B3', borderRadius: '999px' }} />
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #e3ebf4',
                borderRadius: '13px',
                padding: '13px 14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <span
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: '#C1E8FF',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#052659',
                  }}
                >
                  <Icon name="timer" />
                </span>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>Full Mock · 180 Q</div>
                  <div style={{ fontSize: '12px', color: '#5b6b82' }}>2 hr · Use of English + 3</div>
                </div>
              </div>
              <span style={{ color: '#052659' }}>
                <Icon name="chevron-right" />
              </span>
            </div>
          </div>
        </div>
      </section>
      <section id="paths" style={{ maxWidth: '1180px', margin: '0 auto', padding: '84px 40px' }}>
        <h2 style={{ fontSize: '38px', fontWeight: '800', letterSpacing: '-.02em', textAlign: 'center' }}>
          One goal. Two paths to get there.
        </h2>
        <p style={{ textAlign: 'center', color: '#5b6b82', fontSize: '17px', margin: '12px auto 44px', maxWidth: '560px' }}>
          Choose your examination and Apex shapes a preparation plan around your subjects and target.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '26px' }}>
          <div
            style={{
              border: '1px solid #e3ebf4',
              borderRadius: '20px',
              padding: '30px',
              background: '#fff',
              boxShadow: '0 1px 0 rgba(2,16,36,.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#052659',
                  color: '#fff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="graduation-cap" />
              </span>
              <span style={{ fontSize: '22px', fontWeight: '800' }}>JAMB UTME</span>
            </div>
            <p style={{ color: '#5b6b82', fontSize: '15.5px', lineHeight: '1.55' }}>
              Build confidence with objective practice, timed CBT simulations, subject combinations and performance tracking.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '18px 0' }}>
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: '#052659',
                  background: '#C1E8FF',
                  padding: '6px 12px',
                  borderRadius: '999px',
                }}
              >
                Use of English
              </span>
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: '#052659',
                  background: '#C1E8FF',
                  padding: '6px 12px',
                  borderRadius: '999px',
                }}
              >
                Mathematics
              </span>
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: '#052659',
                  background: '#C1E8FF',
                  padding: '6px 12px',
                  borderRadius: '999px',
                }}
              >
                Physics
              </span>
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: '#052659',
                  background: '#C1E8FF',
                  padding: '6px 12px',
                  borderRadius: '999px',
                }}
              >
                Chemistry
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#f4f7fb',
                borderRadius: '13px',
                padding: '13px 15px',
                marginBottom: '20px',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', color: '#5b6b82' }}>Sample score</div>
                <div style={{ fontWeight: '800', fontSize: '20px' }}>
                  288<span style={{ fontSize: '13px', color: '#5b6b82', fontWeight: '600' }}>/400</span>
                </div>
              </div>
              <div style={{ fontSize: '12.5px', color: '#5b6b82' }}>180 Q · 2 hr mock</div>
            </div>
            <button
              onClick={onJamb}
              style={{
                width: '100%',
                background: '#052659',
                color: '#fff',
                padding: '13px',
                borderRadius: '999px',
                fontWeight: '700',
                fontSize: '15px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {'Prepare for JAMB '}
              <Icon name="arrow-right" />
            </button>
          </div>
          <div
            style={{
              border: '1px solid #e3ebf4',
              borderRadius: '20px',
              padding: '30px',
              background: '#fff',
              boxShadow: '0 1px 0 rgba(2,16,36,.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#5483B3',
                  color: '#fff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="book-open-check" />
              </span>
              <span style={{ fontSize: '22px', fontWeight: '800' }}>WAEC / O-Level</span>
            </div>
            <p style={{ color: '#5b6b82', fontSize: '15.5px', lineHeight: '1.55' }}>
              Prepare across your subjects with objective questions, written theory practice and grade-focused progress tracking.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '18px 0' }}>
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: '#052659',
                  background: '#C1E8FF',
                  padding: '6px 12px',
                  borderRadius: '999px',
                }}
              >
                English
              </span>
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: '#052659',
                  background: '#C1E8FF',
                  padding: '6px 12px',
                  borderRadius: '999px',
                }}
              >
                Biology
              </span>
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: '#052659',
                  background: '#C1E8FF',
                  padding: '6px 12px',
                  borderRadius: '999px',
                }}
              >
                Chemistry
              </span>
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: '#fff',
                  background: '#5483B3',
                  padding: '6px 12px',
                  borderRadius: '999px',
                }}
              >
                Theory
              </span>
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: '#052659',
                  background: '#fff',
                  border: '1px solid #e3ebf4',
                  padding: '6px 12px',
                  borderRadius: '999px',
                }}
              >
                Objective
              </span>
            </div>
            <div style={{ background: '#f4f7fb', borderRadius: '13px', padding: '13px 15px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '7px' }}>
                <span style={{ color: '#5b6b82' }}>Subject progress</span>
                <span style={{ fontWeight: '700' }}>6 of 9</span>
              </div>
              <div style={{ height: '7px', background: '#e4ecf5', borderRadius: '999px' }}>
                <div style={{ height: '100%', width: '66%', background: '#5483B3', borderRadius: '999px' }} />
              </div>
            </div>
            <button
              onClick={onWaec}
              style={{
                width: '100%',
                background: '#5483B3',
                color: '#fff',
                padding: '13px',
                borderRadius: '999px',
                fontWeight: '700',
                fontSize: '15px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {'Prepare for WAEC '}
              <Icon name="arrow-right" />
            </button>
          </div>
        </div>
      </section>
      <section id="how" style={{ background: '#fff', borderTop: '1px solid #e3ebf4', borderBottom: '1px solid #e3ebf4' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '72px 40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-.02em', marginBottom: '38px' }}>How Apex works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '22px' }}>
            <div>
              <span
                style={{
                  display: 'inline-flex',
                  width: '46px',
                  height: '46px',
                  borderRadius: '13px',
                  background: '#C1E8FF',
                  color: '#052659',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <Icon name="user-plus" />
              </span>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#5483B3', letterSpacing: '.08em' }}>STEP 1</div>
              <div style={{ fontWeight: '700', fontSize: '17px', margin: '4px 0 6px' }}>Create your profile</div>
              <p style={{ color: '#5b6b82', fontSize: '14.5px', lineHeight: '1.5' }}>
                Tell us who you are and which examination you’re preparing for.
              </p>
            </div>
            <div>
              <span
                style={{
                  display: 'inline-flex',
                  width: '46px',
                  height: '46px',
                  borderRadius: '13px',
                  background: '#C1E8FF',
                  color: '#052659',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <Icon name="target" />
              </span>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#5483B3', letterSpacing: '.08em' }}>STEP 2</div>
              <div style={{ fontWeight: '700', fontSize: '17px', margin: '4px 0 6px' }}>{'Set your exam & target'}</div>
              <p style={{ color: '#5b6b82', fontSize: '14.5px', lineHeight: '1.5' }}>
                Pick subjects and a target score or grades to aim for.
              </p>
            </div>
            <div>
              <span
                style={{
                  display: 'inline-flex',
                  width: '46px',
                  height: '46px',
                  borderRadius: '13px',
                  background: '#C1E8FF',
                  color: '#052659',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <Icon name="pencil-ruler" />
              </span>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#5483B3', letterSpacing: '.08em' }}>STEP 3</div>
              <div style={{ fontWeight: '700', fontSize: '17px', margin: '4px 0 6px' }}>{'Practise & take mocks'}</div>
              <p style={{ color: '#5b6b82', fontSize: '14.5px', lineHeight: '1.5' }}>
                Work through questions and sit realistic timed CBT simulations.
              </p>
            </div>
            <div>
              <span
                style={{
                  display: 'inline-flex',
                  width: '46px',
                  height: '46px',
                  borderRadius: '13px',
                  background: '#C1E8FF',
                  color: '#052659',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <Icon name="trending-up" />
              </span>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#5483B3', letterSpacing: '.08em' }}>STEP 4</div>
              <div style={{ fontWeight: '700', fontSize: '17px', margin: '4px 0 6px' }}>{'Track & improve'}</div>
              <p style={{ color: '#5b6b82', fontSize: '14.5px', lineHeight: '1.5' }}>
                See your strengths, fix weak spots and watch your score climb.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="features" style={{ maxWidth: '1180px', margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center', marginBottom: '60px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '.14em', color: '#5483B3' }}>PERSONALISED PRACTICE</span>
            <h3 style={{ fontSize: '30px', fontWeight: '800', letterSpacing: '-.02em', margin: '10px 0 12px' }}>
              Questions that adapt to you.
            </h3>
            <p style={{ color: '#5b6b82', fontSize: '16px', lineHeight: '1.6' }}>
              Apex recommends topics based on where you lose marks, so every session targets the gaps between you and your goal.
            </p>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '22px' }}>
            <div style={{ fontSize: '12px', color: '#5b6b82', marginBottom: '6px' }}>Mathematics · Indices</div>
            <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '14px' }}>Evaluate 2⁵.</div>
            <div style={{ display: 'grid', gap: '9px' }}>
              <div style={{ border: '1.5px solid #e3ebf4', borderRadius: '11px', padding: '11px 14px', fontSize: '14.5px' }}>A · 10</div>
              <div
                style={{
                  border: '1.5px solid #052659',
                  background: '#C1E8FF',
                  borderRadius: '11px',
                  padding: '11px 14px',
                  fontSize: '14.5px',
                  fontWeight: '600',
                }}
              >
                C · 32
              </div>
              <div style={{ border: '1.5px solid #e3ebf4', borderRadius: '11px', padding: '11px 14px', fontSize: '14.5px' }}>D · 16</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center', marginBottom: '60px' }}>
          <div style={{ order: '2' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '.14em', color: '#5483B3' }}>REALISTIC MOCK EXAMS</span>
            <h3 style={{ fontSize: '30px', fontWeight: '800', letterSpacing: '-.02em', margin: '10px 0 12px' }}>
              Sit the real thing, safely.
            </h3>
            <p style={{ color: '#5b6b82', fontSize: '16px', lineHeight: '1.6' }}>
              Full-length CBT simulations with a resilient timer, a question palette, flagging and submit confirmation — the pressure of
              exam day, minus the stakes.
            </p>
          </div>
          <div
            style={{
              order: '1',
              background: 'linear-gradient(135deg,#021024,#063a73)',
              borderRadius: '18px',
              padding: '24px',
              color: '#fff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontWeight: '700' }}>JAMB Full Mock</span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '17px',
                  background: 'rgba(255,255,255,.1)',
                  padding: '5px 12px',
                  borderRadius: '8px',
                  color: '#C1E8FF',
                }}
              >
                01:58:24
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: '6px' }}>
              <span
                style={{
                  aspectRatio: '1',
                  borderRadius: '7px',
                  background: '#C1E8FF',
                  color: '#021024',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                }}
              >
                1
              </span>
              <span
                style={{
                  aspectRatio: '1',
                  borderRadius: '7px',
                  background: '#C1E8FF',
                  color: '#021024',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                }}
              >
                2
              </span>
              <span
                style={{
                  aspectRatio: '1',
                  borderRadius: '7px',
                  background: '#e4915f',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                }}
              >
                3
              </span>
              <span
                style={{
                  aspectRatio: '1',
                  borderRadius: '7px',
                  background: 'rgba(255,255,255,.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                }}
              >
                4
              </span>
              <span
                style={{
                  aspectRatio: '1',
                  borderRadius: '7px',
                  background: '#C1E8FF',
                  color: '#021024',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                }}
              >
                5
              </span>
              <span
                style={{
                  aspectRatio: '1',
                  borderRadius: '7px',
                  background: 'rgba(255,255,255,.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                }}
              >
                6
              </span>
              <span
                style={{
                  aspectRatio: '1',
                  borderRadius: '7px',
                  background: 'rgba(255,255,255,.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                }}
              >
                7
              </span>
              <span
                style={{
                  aspectRatio: '1',
                  borderRadius: '7px',
                  background: 'rgba(255,255,255,.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                }}
              >
                8
              </span>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '12px', color: '#b9cde8' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#C1E8FF' }} />
                Answered
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#e4915f' }} />
                Flagged
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '.14em', color: '#5483B3' }}>PERFORMANCE ANALYTICS</span>
            <h3 style={{ fontSize: '30px', fontWeight: '800', letterSpacing: '-.02em', margin: '10px 0 12px' }}>
              See exactly where you stand.
            </h3>
            <p style={{ color: '#5b6b82', fontSize: '16px', lineHeight: '1.6' }}>
              Accuracy by subject and topic, score trends over time and target progress — all from your own attempts, never invented
              numbers.
            </p>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '12px' }}>
              <span style={{ color: '#5b6b82' }}>Subject accuracy</span>
              <span style={{ fontWeight: '700' }}>This month</span>
            </div>
            <div style={{ display: 'grid', gap: '13px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '5px' }}>
                  <span>Mathematics</span>
                  <span style={{ fontWeight: '700' }}>72%</span>
                </div>
                <div style={{ height: '8px', background: '#eef3f9', borderRadius: '999px' }}>
                  <div style={{ height: '100%', width: '72%', background: '#052659', borderRadius: '999px' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '5px' }}>
                  <span>Chemistry</span>
                  <span style={{ fontWeight: '700' }}>61%</span>
                </div>
                <div style={{ height: '8px', background: '#eef3f9', borderRadius: '999px' }}>
                  <div style={{ height: '100%', width: '61%', background: '#5483B3', borderRadius: '999px' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '5px' }}>
                  <span>Physics</span>
                  <span style={{ fontWeight: '700' }}>54%</span>
                </div>
                <div style={{ height: '8px', background: '#eef3f9', borderRadius: '999px' }}>
                  <div style={{ height: '100%', width: '54%', background: '#d98a6a', borderRadius: '999px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: '1180px', margin: '0 auto 80px', padding: '0 40px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg,#021024,#052659)',
            borderRadius: '26px',
            padding: '60px 50px',
            textAlign: 'center',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '-100px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '500px',
              height: '260px',
              background: 'radial-gradient(circle,rgba(193,232,255,.25),transparent 70%)',
            }}
          />
          <h2
            style={{
              position: 'relative',
              fontSize: '40px',
              fontWeight: '800',
              letterSpacing: '-.025em',
              maxWidth: '620px',
              margin: '0 auto 14px',
              textWrap: 'balance',
            }}
          >
            Your target is within reach. Start preparing.
          </h2>
          <p style={{ position: 'relative', color: '#bcd0ea', fontSize: '17px', marginBottom: '28px' }}>
            Join Apex and turn practice into results.
          </p>
          <button
            onClick={onStart}
            style={{
              position: 'relative',
              background: '#C1E8FF',
              color: '#021024',
              padding: '15px 32px',
              borderRadius: '999px',
              fontWeight: '700',
              fontSize: '16px',
            }}
          >
            Create your free account
          </button>
        </div>
      </section>
      <footer style={{ background: '#021024', color: '#9fb4d0', padding: '54px 40px 34px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: '36px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '12px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  width: '28px',
                  height: '28px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#052659',
                  borderRadius: '8px',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="#C1E8FF"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 18 L12 5 L20 18" />
                  <path d="M8.5 18 L12 12.5 L15.5 18" />
                </svg>
              </span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>apex</span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6', maxWidth: '280px' }}>
              Your exam. Your target. Your next level. Personalised preparation for JAMB and WAEC.
            </p>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: '700', fontSize: '14px', marginBottom: '12px' }}>Product</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '14px' }}>
              <a href="#features" style={{ color: '#9fb4d0' }}>
                Features
              </a>
              <a href="#how" style={{ color: '#9fb4d0' }}>
                How it works
              </a>
              <button onClick={onDemo} style={{ color: '#9fb4d0', textAlign: 'left', fontSize: '14px' }}>
                Explore demo
              </button>
            </div>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: '700', fontSize: '14px', marginBottom: '12px' }}>Exams</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '14px' }}>
              <button onClick={onJamb} style={{ color: '#9fb4d0', textAlign: 'left', fontSize: '14px' }}>
                JAMB UTME
              </button>
              <button onClick={onWaec} style={{ color: '#9fb4d0', textAlign: 'left', fontSize: '14px' }}>
                WAEC / O-Level
              </button>
            </div>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: '700', fontSize: '14px', marginBottom: '12px' }}>Account</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '14px' }}>
              <button onClick={onSignIn} style={{ color: '#9fb4d0', textAlign: 'left', fontSize: '14px' }}>
                Sign in
              </button>
              <button onClick={onSignUp} style={{ color: '#9fb4d0', textAlign: 'left', fontSize: '14px' }}>
                Sign up
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            maxWidth: '1180px',
            margin: '32px auto 0',
            paddingTop: '22px',
            borderTop: '1px solid rgba(255,255,255,.1)',
            fontSize: '12.5px',
            color: '#73879f',
            lineHeight: '1.6',
          }}
        >
          Apex is an independent preparation platform and is not affiliated with, endorsed by, or connected to JAMB or WAEC. Always verify
          critical examination information with the relevant examination body. · Privacy · Terms
        </div>
      </footer>
    </div>
  );
}
