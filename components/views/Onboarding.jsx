import Icon from '@/components/Icon';
import { css } from '@/lib/css';

export default function Onboarding({ vm }) {
  const {
    examLabelOb,
    hasToast,
    obBack,
    obChooseJamb,
    obChooseWaec,
    obClassOpts,
    obCourse,
    obCourseSet,
    obDate,
    obDateSet,
    obDeptOpts,
    obGrades,
    obGradesSet,
    obIsJamb,
    obIsWaec,
    obJambCardStyle,
    obJambSelected,
    obName,
    obNameSet,
    obNext,
    obNextLabel,
    obNextStyle,
    obProgressBar,
    obStep,
    obStep1,
    obStep2,
    obStep3,
    obStepHint,
    obSubjectCount,
    obSubjectList,
    obSubjectsText,
    obTarget,
    obTargetLabel,
    obTargetSet,
    obWaecCardStyle,
    obWaecSelected,
    toast,
  } = vm;
  return (
    <div style={{ minHeight: '100vh', background: '#f4f7fb', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          padding: '20px 40px',
          background: '#fff',
          borderBottom: '1px solid #e3ebf4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
          <span style={{ fontSize: '19px', fontWeight: '800' }}>apex</span>
        </div>
        <div style={{ fontSize: '13.5px', color: '#5b6b82', fontWeight: '600' }}>
          {'Step '}
          {obStep}
          {' of 3'}
        </div>
      </div>
      <div style={{ height: '4px', background: '#e4ecf5' }}>
        <div style={css(obProgressBar)} />
      </div>
      <div style={{ flex: '1', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 24px 60px' }}>
        <div style={{ width: '100%', maxWidth: '720px' }} className="apx-fade">
          {obStep1 ? (
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-.02em', textAlign: 'center' }}>Choose your examination</h1>
              <p style={{ textAlign: 'center', color: '#5b6b82', fontSize: '16px', margin: '10px 0 36px' }}>
                We’ll tailor subjects, practice and mocks to your path.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <button onClick={obChooseJamb} style={css(obJambCardStyle)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        width: '46px',
                        height: '46px',
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
                    {obJambSelected ? (
                      <span style={{ color: '#052659' }}>
                        <Icon name="check-circle-2" />
                      </span>
                    ) : null}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '800', margin: '16px 0 6px' }}>JAMB UTME</div>
                  <p style={{ color: '#5b6b82', fontSize: '14.5px', lineHeight: '1.5' }}>
                    Four subjects, objective CBT, 180-question full mocks and a target score out of 400.
                  </p>
                </button>
                <button onClick={obChooseWaec} style={css(obWaecCardStyle)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        width: '46px',
                        height: '46px',
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
                    {obWaecSelected ? (
                      <span style={{ color: '#052659' }}>
                        <Icon name="check-circle-2" />
                      </span>
                    ) : null}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '800', margin: '16px 0 6px' }}>WAEC / O-Level</div>
                  <p style={{ color: '#5b6b82', fontSize: '14.5px', lineHeight: '1.5' }}>
                    Your class and department, objective questions plus written theory practice and grade targets.
                  </p>
                </button>
              </div>
            </div>
          ) : null}
          {obStep2 ? (
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: '800', letterSpacing: '-.02em' }}>Set up your profile</h1>
              <p style={{ color: '#5b6b82', fontSize: '15.5px', margin: '8px 0 28px' }}>{obStepHint}</p>
              <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '26px', marginBottom: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '7px' }}>Full name</label>
                    <input
                      value={obName}
                      onChange={obNameSet}
                      placeholder="Your name"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        border: '1.5px solid #e3ebf4',
                        borderRadius: '11px',
                        fontSize: '14.5px',
                      }}
                    />
                  </div>
                  {obIsJamb ? (
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '7px' }}>
                        {'Intended course '}
                        <span style={{ color: '#5b6b82', fontWeight: '400' }}>(optional)</span>
                      </label>
                      <input
                        value={obCourse}
                        onChange={obCourseSet}
                        placeholder="e.g. Medicine"
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          border: '1.5px solid #e3ebf4',
                          borderRadius: '11px',
                          fontSize: '14.5px',
                        }}
                      />
                    </div>
                  ) : null}
                  {obIsWaec ? (
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '7px' }}>Current class</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {obClassOpts.map((c, _i) => (
                          <button key={_i} onClick={c.onClick} style={css(c.style)}>
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
                {obIsWaec ? (
                  <div style={{ marginTop: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '7px' }}>Department</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {obDeptOpts.map((d, _i) => (
                        <button key={_i} onClick={d.onClick} style={css(d.style)}>
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                  {obIsJamb ? (
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '7px' }}>
                        {'Target UTME score: '}
                        <span style={{ color: '#052659', fontWeight: '800' }}>{obTarget}</span>
                      </label>
                      <input
                        type="range"
                        min="180"
                        max="400"
                        step="5"
                        value={obTarget}
                        onChange={obTargetSet}
                        style={{ width: '100%', accentColor: '#052659' }}
                      />
                    </div>
                  ) : null}
                  {obIsWaec ? (
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '7px' }}>
                        Target grades / credits
                      </label>
                      <input
                        value={obGrades}
                        onChange={obGradesSet}
                        placeholder="e.g. 6 credits (A1–C6)"
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          border: '1.5px solid #e3ebf4',
                          borderRadius: '11px',
                          fontSize: '14.5px',
                        }}
                      />
                    </div>
                  ) : null}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '7px' }}>
                      {'Exam date '}
                      <span style={{ color: '#5b6b82', fontWeight: '400' }}>(optional)</span>
                    </label>
                    <input
                      type="date"
                      value={obDate}
                      onChange={obDateSet}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        border: '1.5px solid #e3ebf4',
                        borderRadius: '11px',
                        fontSize: '14.5px',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '26px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <label style={{ fontSize: '15px', fontWeight: '700' }}>Select your subjects</label>
                  <span style={{ fontSize: '13px', color: '#5b6b82' }}>
                    {obSubjectCount}
                    {' selected'}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
                  {obSubjectList.map((s, _i) => (
                    <button key={_i} onClick={s.onClick} style={css(s.style)}>
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
          {obStep3 ? (
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: '800', letterSpacing: '-.02em' }}>Confirm your profile</h1>
              <p style={{ color: '#5b6b82', fontSize: '15.5px', margin: '8px 0 28px' }}>
                Check everything looks right — you can go back to change anything.
              </p>
              <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', overflow: 'hidden' }}>
                <div style={{ padding: '18px 24px', borderBottom: '1px solid #e3ebf4', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5b6b82', fontSize: '14px' }}>Examination</span>
                  <span style={{ fontWeight: '700', fontSize: '14.5px' }}>{examLabelOb}</span>
                </div>
                <div style={{ padding: '18px 24px', borderBottom: '1px solid #e3ebf4', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5b6b82', fontSize: '14px' }}>Name</span>
                  <span style={{ fontWeight: '700', fontSize: '14.5px' }}>{obName}</span>
                </div>
                <div style={{ padding: '18px 24px', borderBottom: '1px solid #e3ebf4', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#5b6b82', fontSize: '14px' }}>Target</span>
                  <span style={{ fontWeight: '700', fontSize: '14.5px' }}>{obTargetLabel}</span>
                </div>
                <div style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                  <span style={{ color: '#5b6b82', fontSize: '14px', whiteSpace: 'nowrap' }}>Subjects</span>
                  <span style={{ fontWeight: '600', fontSize: '14.5px', textAlign: 'right' }}>{obSubjectsText}</span>
                </div>
              </div>
            </div>
          ) : null}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
            <button
              onClick={obBack}
              style={{
                padding: '12px 22px',
                border: '1.5px solid #e3ebf4',
                borderRadius: '999px',
                fontWeight: '600',
                fontSize: '15px',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
              }}
            >
              <Icon name="arrow-left" />
              {' Back'}
            </button>
            <button onClick={obNext} style={css(obNextStyle)}>
              {obNextLabel} <Icon name="arrow-right" />
            </button>
          </div>
        </div>
      </div>
      {hasToast ? (
        <div
          style={{
            position: 'fixed',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#021024',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '14px',
            boxShadow: '0 10px 30px rgba(0,0,0,.25)',
          }}
        >
          {toast}
        </div>
      ) : null}
    </div>
  );
}
