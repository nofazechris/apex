import Icon from '@/components/Icon';
import { css } from '@/lib/css';
import DashboardScreen from '@/components/views/screens/DashboardScreen';
import PracticeScreen from '@/components/views/screens/PracticeScreen';
import MockExamsScreen from '@/components/views/screens/MockExamsScreen';
import ResultsScreen from '@/components/views/screens/ResultsScreen';
import ProgressScreen from '@/components/views/screens/ProgressScreen';
import UpdatesScreen from '@/components/views/screens/UpdatesScreen';
import ProfileScreen from '@/components/views/screens/ProfileScreen';

export default function AppShell({ vm }) {
  const {
    examLabel,
    initials,
    isDemo,
    navItems,
    navMockBtn,
    pageTitle,
    profile,
    showDashboard,
    showMocks,
    showPractice,
    showProfile,
    showProgress,
    showResults,
    showUpdates,
  } = vm;
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '248px 1fr', background: '#f4f7fb' }}>
      <aside
        style={{
          background: '#021024',
          color: '#fff',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: '0',
          height: '100vh',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px 24px' }}>
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
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((n, _i) => (
            <button key={_i} onClick={n.onClick} style={css(n.navStyle)}>
              <Icon name={n.icon} />
              {n.label}
            </button>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,.06)', borderRadius: '14px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>{examLabel}</div>
          <div style={{ fontSize: '12.5px', color: '#9fb4d0', lineHeight: '1.5' }}>Keep practising — your next mock is one click away.</div>
          <button
            onClick={navMockBtn}
            style={{
              marginTop: '12px',
              width: '100%',
              background: '#C1E8FF',
              color: '#021024',
              padding: '9px',
              borderRadius: '9px',
              fontWeight: '700',
              fontSize: '13.5px',
            }}
          >
            Take a mock
          </button>
        </div>
      </aside>
      <div>
        <header
          style={{
            background: '#fff',
            borderBottom: '1px solid #e3ebf4',
            padding: '16px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: '0',
            zIndex: '20',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <h1 style={{ fontSize: '19px', fontWeight: '800' }}>{pageTitle}</h1>
            <span
              style={{
                fontSize: '12px',
                fontWeight: '700',
                color: '#052659',
                background: '#C1E8FF',
                padding: '5px 11px',
                borderRadius: '999px',
              }}
            >
              {examLabel}
            </span>
            {isDemo ? (
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: '700',
                  color: '#a8441f',
                  background: '#fbe9e2',
                  padding: '5px 11px',
                  borderRadius: '999px',
                }}
              >
                DEMO DATA
              </span>
            ) : null}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{ color: '#5b6b82' }}>
              <Icon name="bell" />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13.5px', fontWeight: '700' }}>{profile.name}</div>
                <div style={{ fontSize: '11.5px', color: '#5b6b82' }}>{profile.email}</div>
              </div>
              <span
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#052659',
                  color: '#fff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '14px',
                }}
              >
                {initials}
              </span>
            </div>
          </div>
        </header>
        <main style={{ padding: '32px 36px 60px', maxWidth: '1180px' }}>
          {showDashboard ? <DashboardScreen vm={vm} /> : null}
          {showPractice ? <PracticeScreen vm={vm} /> : null}
          {showMocks ? <MockExamsScreen vm={vm} /> : null}
          {showResults ? <ResultsScreen vm={vm} /> : null}
          {showProgress ? <ProgressScreen vm={vm} /> : null}
          {showUpdates ? <UpdatesScreen vm={vm} /> : null}
          {showProfile ? <ProfileScreen vm={vm} /> : null}
        </main>
      </div>
    </div>
  );
}
