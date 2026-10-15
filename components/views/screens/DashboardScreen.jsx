import Icon from '@/components/Icon';
import { css } from '@/lib/css';

export default function DashboardScreen({ vm }) {
  const {
    dailyPractice,
    dashUpdates,
    greet,
    hasActivity,
    hasSubjectPerf,
    navUpdatesBtn,
    noActivity,
    noSubjectPerf,
    profile,
    recentActivity,
    subjectPerf,
    targetCard,
  } = vm;
  return (
    <div className="apx-fade">
      <div style={{ marginBottom: '26px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-.02em' }}>
          {greet}
          {', '}
          {profile.firstName}.
        </h2>
        <p style={{ color: '#5b6b82', fontSize: '16px', marginTop: '4px' }}>Let’s make today’s preparation count.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg,#052659,#0a3d78)',
            color: '#fff',
            borderRadius: '20px',
            padding: '28px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: '-40px',
              top: '-40px',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle,rgba(193,232,255,.22),transparent 70%)',
            }}
          />
          {targetCard.isJamb ? (
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '13.5px', color: '#bcd0ea' }}>{targetCard.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', margin: '8px 0 6px' }}>
                <span style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-.02em' }}>{targetCard.target}</span>
                <span style={{ fontSize: '14px', color: '#9fbbdd' }}>
                  {'current est. '}
                  {targetCard.est}
                </span>
              </div>
              <div style={{ fontSize: '12.5px', color: '#8fb0d6', marginBottom: '16px' }}>{targetCard.estNote}</div>
              <div style={{ height: '9px', background: 'rgba(255,255,255,.18)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={css(targetCard.barStyle)} />
              </div>
              <button
                onClick={targetCard.ctaAction}
                style={{
                  marginTop: '20px',
                  background: '#C1E8FF',
                  color: '#021024',
                  padding: '11px 20px',
                  borderRadius: '999px',
                  fontWeight: '700',
                  fontSize: '14.5px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {targetCard.cta} <Icon name="arrow-right" />
              </button>
            </div>
          ) : null}
          {targetCard.isWaec ? (
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: '13.5px', color: '#bcd0ea' }}>{targetCard.label}</div>
              <div style={{ fontSize: '32px', fontWeight: '800', margin: '8px 0 6px' }}>{targetCard.targetGrades}</div>
              <div style={{ fontSize: '13px', color: '#9fbbdd', marginBottom: '16px' }}>
                {targetCard.subjectsPractised}
                {' of '}
                {targetCard.subjectsTotal}
                {' subjects practised'}
              </div>
              <div style={{ height: '9px', background: 'rgba(255,255,255,.18)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={css(targetCard.barStyle)} />
              </div>
              <button
                onClick={targetCard.ctaAction}
                style={{
                  marginTop: '20px',
                  background: '#C1E8FF',
                  color: '#021024',
                  padding: '11px 20px',
                  borderRadius: '999px',
                  fontWeight: '700',
                  fontSize: '14.5px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {targetCard.cta} <Icon name="arrow-right" />
              </button>
            </div>
          ) : null}
        </div>
        <div
          style={{
            background: '#fff',
            border: '1px solid #e3ebf4',
            borderRadius: '20px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#5483B3', letterSpacing: '.08em', marginBottom: '10px' }}>
            RECOMMENDED TODAY
          </div>
          <div style={{ fontSize: '19px', fontWeight: '800' }}>{dailyPractice.subject}</div>
          <div style={{ color: '#5b6b82', fontSize: '14px', margin: '3px 0 16px' }}>{dailyPractice.topic}</div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#5b6b82', marginBottom: 'auto' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="clock" />
              {dailyPractice.duration}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="list-checks" />
              {dailyPractice.count}
              {' questions'}
            </span>
          </div>
          <button
            onClick={dailyPractice.onStart}
            style={{
              marginTop: '18px',
              width: '100%',
              background: '#052659',
              color: '#fff',
              padding: '12px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '14.5px',
            }}
          >
            Start practice
          </button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '20px', padding: '24px' }}>
          <div style={{ fontWeight: '800', fontSize: '17px', marginBottom: '18px' }}>Subject performance</div>
          {hasSubjectPerf ? (
            <div style={{ display: 'grid', gap: '16px' }}>
              {subjectPerf.map((s, _i) => (
                <div key={_i}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '14px',
                      marginBottom: '6px',
                    }}
                  >
                    <span style={{ fontWeight: '600' }}>{s.name}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={css(s.statusStyle)}>{s.status}</span>
                      <span style={{ fontWeight: '800' }}>{s.label}</span>
                    </span>
                  </div>
                  <div style={{ height: '8px', background: '#eef3f9', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={css(s.barStyle)} />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {noSubjectPerf ? (
            <div style={{ textAlign: 'center', padding: '28px 10px' }}>
              <span
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: '#C1E8FF',
                  color: '#052659',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <Icon name="bar-chart-3" />
              </span>
              <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '4px' }}>No attempts yet</div>
              <p style={{ color: '#5b6b82', fontSize: '14px', lineHeight: '1.5', maxWidth: '280px', margin: '0 auto 16px' }}>
                Complete a practice set or mock exam and your subject accuracy will appear here.
              </p>
              <button
                onClick={dailyPractice.onStart}
                style={{
                  background: '#052659',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  fontWeight: '700',
                  fontSize: '14px',
                }}
              >
                Start practising
              </button>
            </div>
          ) : null}
        </div>
        <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '20px', padding: '24px' }}>
          <div style={{ fontWeight: '800', fontSize: '17px', marginBottom: '16px' }}>Recent activity</div>
          {hasActivity ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentActivity.map((a, _i) => (
                <div key={_i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: '#C1E8FF',
                      color: '#052659',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: '0',
                    }}
                  >
                    <Icon name={a.icon} />
                  </span>
                  <div style={{ flex: '1', minWidth: '0' }}>
                    <div
                      style={{ fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {a.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#5b6b82' }}>{a.meta}</div>
                  </div>
                  <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#052659' }}>{a.score}</span>
                </div>
              ))}
            </div>
          ) : null}
          {noActivity ? (
            <p style={{ color: '#5b6b82', fontSize: '14px', lineHeight: '1.5' }}>
              Your completed practice and mock exams will show up here. Take your first session to get started.
            </p>
          ) : null}
        </div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '20px', padding: '24px', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ fontWeight: '800', fontSize: '17px' }}>Exam updates</div>
          <button
            onClick={navUpdatesBtn}
            style={{ fontSize: '13.5px', fontWeight: '700', color: '#052659', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            {'View all '}
            <Icon name="arrow-right" />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {dashUpdates.map((u, _i) => (
            <a
              key={_i}
              href={u.url}
              target="_blank"
              style={{ display: 'block', border: '1px solid #e3ebf4', borderRadius: '14px', padding: '16px', color: '#021024' }}
              rel="noopener noreferrer"
            >
              <span style={css(u.catStyle)}>{u.category}</span>
              <div style={{ fontWeight: '700', fontSize: '14.5px', lineHeight: '1.4', margin: '10px 0 8px' }}>{u.headline}</div>
              <div style={{ fontSize: '12px', color: '#5b6b82' }}>
                {u.source}
                {' · '}
                {u.date}
              </div>
            </a>
          ))}
        </div>
        <div style={{ fontSize: '12px', color: '#5b6b82', marginTop: '14px', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <Icon name="info" />
          {' Sample updates for demonstration. Verify all examination information with the official body.'}
        </div>
      </div>
    </div>
  );
}
