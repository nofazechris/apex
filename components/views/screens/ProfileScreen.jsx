import Icon from '@/components/Icon';

export default function ProfileScreen({ vm }) {
  const { examLabel, initials, profile, profileIsJamb, profileSubjects, resetAll, setDate, setEmail, setName, setTarget } = vm;
  return (
    <div className="apx-fade" style={{ maxWidth: '720px' }}>
      <div
        style={{
          background: '#fff',
          border: '1px solid #e3ebf4',
          borderRadius: '18px',
          padding: '26px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
        }}
      >
        <span
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#052659',
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '21px',
          }}
        >
          {initials}
        </span>
        <div>
          <div style={{ fontSize: '21px', fontWeight: '800' }}>{profile.name}</div>
          <div style={{ color: '#5b6b82', fontSize: '14px' }}>
            {profile.email}
            {' · '}
            {examLabel}
          </div>
        </div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '26px', marginBottom: '20px' }}>
        <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '18px' }}>Edit profile</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '7px' }}>Full name</label>
            <input
              value={profile.name}
              onChange={setName}
              style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e3ebf4', borderRadius: '11px', fontSize: '14.5px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '7px' }}>Email</label>
            <input
              value={profile.email}
              onChange={setEmail}
              style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e3ebf4', borderRadius: '11px', fontSize: '14.5px' }}
            />
          </div>
          {profileIsJamb ? (
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '7px' }}>Target UTME score</label>
              <input
                value={profile.targetScore}
                onChange={setTarget}
                type="number"
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e3ebf4', borderRadius: '11px', fontSize: '14.5px' }}
              />
            </div>
          ) : null}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '7px' }}>Exam date</label>
            <input
              value={profile.examDate}
              onChange={setDate}
              type="date"
              style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e3ebf4', borderRadius: '11px', fontSize: '14.5px' }}
            />
          </div>
        </div>
      </div>
      <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '26px', marginBottom: '20px' }}>
        <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '14px' }}>Your subjects</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
          {profileSubjects.map((s, _i) => (
            <span
              key={_i}
              style={{
                padding: '8px 15px',
                background: '#C1E8FF',
                color: '#052659',
                borderRadius: '999px',
                fontSize: '13.5px',
                fontWeight: '600',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={resetAll}
        style={{ color: '#c15f3c', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '7px' }}
      >
        <Icon name="log-out" />
        {' Reset demo & sign out'}
      </button>
    </div>
  );
}
