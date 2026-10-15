import Icon from '@/components/Icon';

export default function Auth({ vm }) {
  const {
    authEmail,
    authError,
    authHasError,
    authIsSignup,
    authLoading,
    authName,
    authPassword,
    authSwitchCta,
    authSwitchText,
    authTitle,
    backToLanding,
    pwIcon,
    pwType,
    setAuthEmail,
    setAuthName,
    setAuthPassword,
    submitAuth,
    switchAuth,
    togglePw,
  } = vm;
  return (
    <div className="r-auth" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div
        className="r-px r-auth-brand"
        style={{
          background: 'linear-gradient(160deg,#021024,#052659)',
          color: '#fff',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
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
              background: 'rgba(255,255,255,.1)',
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
          <span style={{ fontSize: '20px', fontWeight: '800' }}>apex</span>
        </div>
        <div>
          <h2
            className="r-h"
            style={{
              fontSize: '34px',
              fontWeight: '800',
              letterSpacing: '-.02em',
              lineHeight: '1.1',
              marginBottom: '14px',
              maxWidth: '380px',
            }}
          >
            Preparation that meets you where you are.
          </h2>
          <p style={{ color: '#bcd0ea', fontSize: '16px', lineHeight: '1.6', maxWidth: '360px' }}>
            Personalised practice, realistic mocks and honest analytics — built for JAMB and WAEC candidates.
          </p>
        </div>
        <p style={{ fontSize: '12.5px', color: '#73879f' }}>Demo prototype · not production authentication.</p>
      </div>
      <div className="r-px" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: '380px' }} className="apx-fade">
          <button
            onClick={backToLanding}
            style={{ color: '#5b6b82', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}
          >
            <Icon name="arrow-left" />
            {' Back'}
          </button>
          <h1 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-.02em', marginBottom: '6px' }}>{authTitle}</h1>
          <p style={{ color: '#5b6b82', fontSize: '15px', marginBottom: '26px' }}>Enter demo mode — no real credentials needed.</p>
          {authIsSignup ? (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '7px' }}>Full name</label>
              <input
                value={authName}
                onChange={setAuthName}
                placeholder="e.g. David Okafor"
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e3ebf4', borderRadius: '12px', fontSize: '15px' }}
              />
            </div>
          ) : null}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '7px' }}>Email</label>
            <input
              value={authEmail}
              onChange={setAuthEmail}
              type="email"
              placeholder="you@email.com"
              style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #e3ebf4', borderRadius: '12px', fontSize: '15px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '7px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                value={authPassword}
                onChange={setAuthPassword}
                type={pwType}
                placeholder="At least 6 characters"
                style={{
                  width: '100%',
                  padding: '12px 44px 12px 14px',
                  border: '1.5px solid #e3ebf4',
                  borderRadius: '12px',
                  fontSize: '15px',
                }}
              />
              <button
                onClick={togglePw}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#5b6b82' }}
              >
                <Icon name={pwIcon} />
              </button>
            </div>
          </div>
          {authHasError ? (
            <div
              style={{
                background: '#fbe9e2',
                color: '#a8441f',
                borderRadius: '10px',
                padding: '10px 13px',
                fontSize: '13.5px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Icon name="alert-circle" />
              {authError}
            </div>
          ) : null}
          <button
            onClick={submitAuth}
            style={{
              width: '100%',
              background: '#052659',
              color: '#fff',
              padding: '13px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {authLoading ? (
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255,255,255,.4)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'apxSpin .7s linear infinite',
                }}
              />
            ) : null}{' '}
            {authTitle}
          </button>
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#5b6b82' }}>
            {authSwitchText}{' '}
            <button onClick={switchAuth} style={{ color: '#052659', fontWeight: '700', fontSize: '14px' }}>
              {authSwitchCta}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
