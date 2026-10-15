import Icon from '@/components/Icon';

export default function MockExamsScreen({ vm }) {
  const { mockList } = vm;
  return (
    <div className="apx-fade">
      <p style={{ color: '#5b6b82', fontSize: '15.5px', marginBottom: '22px' }}>
        Sit a timed simulation. Your answers persist as you navigate, and the timer keeps running even if you reload.
      </p>
      <div style={{ display: 'grid', gap: '16px' }}>
        {mockList.map((m, _i) => (
          <div
            key={_i}
            style={{
              background: '#fff',
              border: '1px solid #e3ebf4',
              borderRadius: '18px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <span
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
                background: '#052659',
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: '0',
              }}
            >
              <Icon name="timer" />
            </span>
            <div style={{ flex: '1', minWidth: '0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                <span style={{ fontWeight: '800', fontSize: '17px' }}>{m.title}</span>
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: '700',
                    color: '#052659',
                    background: '#C1E8FF',
                    padding: '3px 10px',
                    borderRadius: '999px',
                  }}
                >
                  {m.difficulty}
                </span>
              </div>
              <p style={{ color: '#5b6b82', fontSize: '14px', lineHeight: '1.5', marginBottom: '10px' }}>{m.about}</p>
              <div style={{ display: 'flex', gap: '18px', fontSize: '13px', color: '#5b6b82' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon name="list-checks" />
                  {m.qcount}
                  {' questions'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon name="clock" />
                  {m.durLabel}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon name="check-circle-2" />
                  {m.statusLabel}
                </span>
              </div>
            </div>
            <button
              onClick={m.onStart}
              style={{
                background: '#052659',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '999px',
                fontWeight: '700',
                fontSize: '14.5px',
                flexShrink: '0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {'Start '}
              <Icon name="arrow-right" />
            </button>
          </div>
        ))}
      </div>
      <div
        style={{
          fontSize: '12.5px',
          color: '#5b6b82',
          marginTop: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          lineHeight: '1.5',
        }}
      >
        <Icon name="info" />
        {
          ' Prototype scoring: each objective question is equally weighted and scaled to 400 for JAMB. This is a practice estimate, not an official UTME score.'
        }
      </div>
    </div>
  );
}
