import Icon from '@/components/Icon';
import { css } from '@/lib/css';

export default function PracticeScreen({ vm }) {
  const {
    practice,
    practiceActive,
    practiceInactive,
    practiceModes,
    practiceSubjects,
    qv,
    qvIsObjective,
    qvIsTheory,
    qvLast,
    qvRevealed,
    theoryAvailable,
    theoryModes,
  } = vm;
  return (
    <>
      {practiceInactive ? (
        <div className="apx-fade">
          <p style={{ color: '#5b6b82', fontSize: '15.5px', marginBottom: '22px' }}>
            Choose a subject and a mode. Every practice question gives you the answer and an explanation straight away.
          </p>
          <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '22px', marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#5b6b82', marginBottom: '12px' }}>SUBJECT</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
              {practiceSubjects.map((s, _i) => (
                <button key={_i} onClick={s.onClick} style={css(s.chipStyle)}>
                  {s.name}
                </button>
              ))}
            </div>
          </div>
          <div className="r-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
            {practiceModes.map((m, _i) => (
              <div
                key={_i}
                style={{
                  background: '#fff',
                  border: '1px solid #e3ebf4',
                  borderRadius: '18px',
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#C1E8FF',
                    color: '#052659',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                  }}
                >
                  <Icon name={m.icon} />
                </span>
                <div style={{ fontWeight: '800', fontSize: '17px' }}>{m.title}</div>
                <div style={{ color: '#5b6b82', fontSize: '13.5px', margin: '4px 0 18px' }}>{m.desc}</div>
                <button
                  onClick={m.onStart}
                  style={{
                    marginTop: 'auto',
                    width: '100%',
                    background: '#052659',
                    color: '#fff',
                    padding: '11px',
                    borderRadius: '11px',
                    fontWeight: '700',
                    fontSize: '14px',
                  }}
                >
                  Start
                </button>
              </div>
            ))}
          </div>
          {theoryAvailable ? (
            <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '22px', marginTop: '20px' }}>
              <div style={{ fontWeight: '800', fontSize: '17px', marginBottom: '4px' }}>Theory practice</div>
              <p style={{ color: '#5b6b82', fontSize: '13.5px', marginBottom: '16px' }}>
                Write full answers and compare against a model answer and marking guide.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {theoryModes.map((t, _i) => (
                  <button
                    key={_i}
                    onClick={t.onStart}
                    style={{
                      padding: '10px 18px',
                      border: '1.5px solid #052659',
                      color: '#052659',
                      borderRadius: '999px',
                      fontWeight: '600',
                      fontSize: '14px',
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                    }}
                  >
                    <Icon name="pen-line" />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      {practiceActive ? (
        <div className="apx-fade" style={{ maxWidth: '760px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <button
              onClick={practice.onExit}
              style={{ color: '#5b6b82', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}
            >
              <Icon name="x" />
              {' Exit'}
            </button>
            <div style={{ fontSize: '13.5px', color: '#5b6b82', fontWeight: '600' }}>
              {qv.subject}
              {' · '}
              {qv.number}
              {' / '}
              {qv.total}
            </div>
          </div>
          <div style={{ height: '6px', background: '#e4ecf5', borderRadius: '999px', marginBottom: '22px', overflow: 'hidden' }}>
            <div style={css(qv.progressBar)} />
          </div>
          <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '28px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#5483B3', letterSpacing: '.04em', marginBottom: '12px' }}>
              {qv.topic}
            </div>
            {qvIsTheory ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                  <span
                    style={{
                      fontSize: '12.5px',
                      fontWeight: '700',
                      color: '#052659',
                      background: '#C1E8FF',
                      padding: '4px 11px',
                      borderRadius: '999px',
                    }}
                  >
                    {qv.marks}
                    {' marks'}
                  </span>
                </div>
                <p style={{ fontSize: '18px', fontWeight: '600', lineHeight: '1.5', marginBottom: '16px' }}>{qv.text}</p>
                <textarea
                  value={qv.theoryText}
                  onChange={qv.setThEvt}
                  placeholder="Type your answer here…"
                  style={{
                    width: '100%',
                    minHeight: '180px',
                    padding: '16px',
                    border: '1.5px solid #e3ebf4',
                    borderRadius: '12px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                />
                {qv.canReveal ? (
                  <button
                    onClick={qv.onRevealTheory}
                    style={{
                      marginTop: '14px',
                      background: '#052659',
                      color: '#fff',
                      padding: '11px 20px',
                      borderRadius: '11px',
                      fontWeight: '700',
                      fontSize: '14px',
                    }}
                  >
                    Show model answer
                  </button>
                ) : null}
                {qvRevealed ? (
                  <div
                    style={{ marginTop: '16px', background: '#f4f7fb', border: '1px solid #e3ebf4', borderRadius: '13px', padding: '18px' }}
                  >
                    <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#052659', marginBottom: '8px' }}>
                      MODEL ANSWER / MARKING GUIDE
                    </div>
                    <p style={{ fontSize: '14.5px', lineHeight: '1.6', color: '#2a3a4e', whiteSpace: 'pre-line' }}>{qv.modelAnswer}</p>
                  </div>
                ) : null}
              </>
            ) : null}
            {qvIsObjective ? (
              <>
                <p style={{ fontSize: '18.5px', fontWeight: '600', lineHeight: '1.5', marginBottom: '20px' }}>{qv.text}</p>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {qv.options.map((o, _i) => (
                    <button key={_i} onClick={o.onSelect} style={css(o.style)}>
                      <span
                        style={{
                          width: '28px',
                          height: '28px',
                          flexShrink: '0',
                          borderRadius: '8px',
                          background: '#f4f7fb',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700',
                          fontSize: '13.5px',
                        }}
                      >
                        {o.letter}
                      </span>
                      {o.text}
                      {o.showTick ? (
                        <span style={{ marginLeft: 'auto', color: '#052659' }}>
                          <Icon name="check" />
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
                {qvRevealed ? (
                  <div style={{ marginTop: '18px', background: '#C1E8FF', borderRadius: '13px', padding: '16px 18px' }}>
                    <div
                      style={{
                        fontSize: '12.5px',
                        fontWeight: '700',
                        color: '#052659',
                        marginBottom: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '7px',
                      }}
                    >
                      <Icon name="lightbulb" />
                      {'ANSWER: '}
                      {qv.correctLetter}
                    </div>
                    <p style={{ fontSize: '14.5px', lineHeight: '1.55', color: '#1f3147' }}>{qv.explanation}</p>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button onClick={qv.onPrev} style={css(qv.prevStyle)}>
              <Icon name="arrow-left" />
              {' Previous'}
            </button>
            {qv.canNext ? (
              <button
                onClick={qv.onNext}
                style={{
                  padding: '11px 22px',
                  borderRadius: '999px',
                  fontWeight: '700',
                  fontSize: '14.5px',
                  background: '#052659',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {'Next '}
                <Icon name="arrow-right" />
              </button>
            ) : null}
            {qvLast ? (
              <button
                onClick={practice.onFinish}
                style={{
                  padding: '11px 22px',
                  borderRadius: '999px',
                  fontWeight: '700',
                  fontSize: '14.5px',
                  background: '#021024',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {'Finish & score '}
                <Icon name="flag" />
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
