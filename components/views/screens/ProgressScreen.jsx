import Icon from '@/components/Icon';
import { css } from '@/lib/css';

export default function ProgressScreen({ vm }) {
  const { hasSubjectPerf, noSubjectPerf, progress } = vm;
  return (
    <div className="apx-fade">
      <div className="r-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '22px' }}>
        {progress.stats.map((s, _i) => (
          <div key={_i} style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '16px', padding: '20px' }}>
            <span
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#C1E8FF',
                color: '#052659',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}
            >
              <Icon name={s.icon} />
            </span>
            <div style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-.02em' }}>{s.value}</div>
            <div style={{ fontSize: '13px', color: '#5b6b82' }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="r-2col" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '24px' }}>
          <div style={{ fontWeight: '800', fontSize: '17px', marginBottom: '18px' }}>Score trend</div>
          {progress.hasTrend ? (
            <>
              <svg viewBox="0 0 560 200" style={{ width: '100%', height: 'auto' }}>
                <line x1="40" y1="180" x2="560" y2="180" stroke="#e3ebf4" />
                <line x1="40" y1="30" x2="40" y2="180" stroke="#e3ebf4" />
                <polyline
                  points={progress.trendPts}
                  fill="none"
                  stroke="#052659"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {progress.trendDots.map((d, _i) => (
                  <circle key={_i} cx={d.cx} cy={d.cy} r="5" fill="#052659" />
                ))}
              </svg>
              <div style={{ fontSize: '12.5px', color: '#5b6b82', textAlign: 'center', marginTop: '6px' }}>
                Mock exam scores over time (out of 400)
              </div>
            </>
          ) : null}
          {progress.noTrend ? (
            <p style={{ color: '#5b6b82', fontSize: '14px', lineHeight: '1.5', padding: '20px 0' }}>
              Complete two or more mock exams to see your score trend plotted here.
            </p>
          ) : null}
        </div>
        <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '24px' }}>
          <div style={{ fontWeight: '800', fontSize: '17px', marginBottom: '16px' }}>Recommendations</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {progress.recommendations.map((r, _i) => (
              <div key={_i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: '#C1E8FF',
                    color: '#052659',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                  }}
                >
                  <Icon name={r.icon} />
                </span>
                <p style={{ fontSize: '14px', lineHeight: '1.5', paddingTop: '6px' }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '24px' }}>
        <div style={{ fontWeight: '800', fontSize: '17px', marginBottom: '18px' }}>Subject accuracy</div>
        {hasSubjectPerf ? (
          <div style={{ display: 'grid', gap: '16px' }}>
            {progress.subjectPerf.map((s, _i) => (
              <div key={_i}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', marginBottom: '6px' }}
                >
                  <span style={{ fontWeight: '600' }}>{s.name}</span>
                  <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
          <p style={{ color: '#5b6b82', fontSize: '14px' }}>
            No attempts recorded yet — your subject accuracy will build up as you practise.
          </p>
        ) : null}
      </div>
    </div>
  );
}
