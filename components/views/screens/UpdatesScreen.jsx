import Icon from '@/components/Icon';
import { css } from '@/lib/css';

export default function UpdatesScreen({ vm }) {
  const { updCats, updatesList } = vm;
  return (
    <div className="apx-fade">
      <div
        style={{
          background: '#fff3e8',
          border: '1px solid #f0d4bc',
          borderRadius: '14px',
          padding: '14px 18px',
          marginBottom: '20px',
          fontSize: '13.5px',
          color: '#8a5424',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          lineHeight: '1.5',
        }}
      >
        <Icon name="alert-triangle" />
        {
          ' These are clearly-labelled sample updates for this prototype. Always verify registration dates, timetables and official announcements directly with JAMB or WAEC.'
        }
      </div>
      <div style={{ display: 'flex', gap: '9px', flexWrap: 'wrap', marginBottom: '22px' }}>
        {updCats.map((c, _i) => (
          <button key={_i} onClick={c.onClick} style={css(c.chipStyle)}>
            {c.name}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gap: '14px' }}>
        {updatesList.map((u, _i) => (
          <a
            key={_i}
            href={u.url}
            target="_blank"
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
              background: '#fff',
              border: '1px solid #e3ebf4',
              borderRadius: '16px',
              padding: '22px',
              color: '#021024',
            }}
            rel="noopener noreferrer"
          >
            <div style={{ flex: '1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '9px' }}>
                <span style={css(u.catStyle)}>{u.category}</span>
                {u.pinned ? (
                  <span
                    style={{ fontSize: '11px', fontWeight: '700', color: '#052659', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Icon name="pin" />
                    Pinned
                  </span>
                ) : null}
              </div>
              <div style={{ fontWeight: '800', fontSize: '17px', lineHeight: '1.35', marginBottom: '7px' }}>{u.headline}</div>
              <p style={{ color: '#5b6b82', fontSize: '14px', lineHeight: '1.55', marginBottom: '10px' }}>{u.summary}</p>
              <div style={{ fontSize: '12.5px', color: '#5b6b82', display: 'flex', alignItems: 'center', gap: '7px' }}>
                <Icon name="building-2" />
                {u.source}
                {' · '}
                {u.date} <Icon name="external-link" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
