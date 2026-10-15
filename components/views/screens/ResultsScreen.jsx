import Icon from '@/components/Icon';
import { css } from '@/lib/css';

export default function ResultsScreen({ vm }) {
  const { hasResults, navProgressBtn, noResults, results } = vm;
  return (
    <>
      {hasResults ? (
        <div className="apx-fade" style={{ maxWidth: '860px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg,#052659,#0a3d78)',
              color: '#fff',
              borderRadius: '22px',
              padding: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '36px',
              marginBottom: '24px',
            }}
          >
            <div style={{ position: 'relative', flexShrink: '0' }}>
              <svg width="150" height="150" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="9" />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#C1E8FF"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={results.ringDash}
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  inset: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '34px', fontWeight: '800' }}>{results.bigNumber}</span>
                <span style={{ fontSize: '12px', color: '#bcd0ea' }}>{results.bigLabel}</span>
              </div>
            </div>
            <div style={{ flex: '1' }}>
              <div style={{ fontSize: '13px', color: '#bcd0ea', marginBottom: '4px' }}>{results.sessionTitle}</div>
              <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '10px' }}>{results.verdict}</h2>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(255,255,255,.1)', padding: '8px 14px', borderRadius: '11px', fontSize: '13.5px' }}>
                  {'✓ '}
                  {results.correct}
                  {' correct'}
                </span>
                <span style={{ background: 'rgba(255,255,255,.1)', padding: '8px 14px', borderRadius: '11px', fontSize: '13.5px' }}>
                  {'✗ '}
                  {results.incorrect}
                  {' wrong'}
                </span>
                <span style={{ background: 'rgba(255,255,255,.1)', padding: '8px 14px', borderRadius: '11px', fontSize: '13.5px' }}>
                  {'— '}
                  {results.unanswered}
                  {' skipped'}
                </span>
                <span style={{ background: 'rgba(255,255,255,.1)', padding: '8px 14px', borderRadius: '11px', fontSize: '13.5px' }}>
                  {'⏱ '}
                  {results.timeUsed}
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '24px' }}>
              <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '16px' }}>Subject breakdown</div>
              {results.hasSubjects ? (
                <div style={{ display: 'grid', gap: '14px' }}>
                  {results.subjRows.map((s, _i) => (
                    <div key={_i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '5px' }}>
                        <span style={{ fontWeight: '600' }}>{s.subject}</span>
                        <span style={{ color: '#5b6b82' }}>
                          {s.correct}/{s.total}
                          {' · '}
                          <strong style={{ color: '#021024' }}>{s.label}</strong>
                        </span>
                      </div>
                      <div style={{ height: '7px', background: '#eef3f9', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={css(s.barStyle)} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              {results.theory ? (
                <p style={{ color: '#5b6b82', fontSize: '14px', lineHeight: '1.5' }}>
                  {results.theoryAnswered}
                  {' of '}
                  {results.theoryTotal}
                  {
                    ' theory answers submitted. Review each below against the model answer. This is practice feedback, not an official WAEC grade.'
                  }
                </p>
              ) : null}
            </div>
            <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '24px' }}>
              <div style={{ fontWeight: '800', fontSize: '16px', marginBottom: '12px' }}>What next</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={results.onAnother}
                  style={{
                    width: '100%',
                    background: '#052659',
                    color: '#fff',
                    padding: '12px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '14.5px',
                  }}
                >
                  Try another mock
                </button>
                <button
                  onClick={navProgressBtn}
                  style={{
                    width: '100%',
                    background: '#fff',
                    border: '1.5px solid #e3ebf4',
                    padding: '12px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '14.5px',
                  }}
                >
                  View full progress
                </button>
              </div>
              {results.isJamb ? (
                <div
                  style={{
                    marginTop: '16px',
                    fontSize: '13px',
                    color: '#5b6b82',
                    lineHeight: '1.5',
                    paddingTop: '16px',
                    borderTop: '1px solid #e3ebf4',
                  }}
                >
                  {results.targetLabel}
                  {' · your estimate this attempt is '}
                  <strong style={{ color: '#021024' }}>{results.score400}/400</strong>.
                </div>
              ) : null}
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '24px' }}>
            <div style={{ fontWeight: '800', fontSize: '17px', marginBottom: '6px' }}>Question review</div>
            <p style={{ color: '#5b6b82', fontSize: '13.5px', marginBottom: '18px' }}>
              Tap any question to see your answer, the correct answer and an explanation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {results.reviewItems.map((q, _i) => (
                <div key={_i} style={{ border: '1px solid #e3ebf4', borderRadius: '13px', overflow: 'hidden' }}>
                  <button
                    onClick={q.onToggle}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '15px 18px',
                      textAlign: 'left',
                      background: '#fff',
                    }}
                  >
                    <span
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: '#f4f7fb',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '13px',
                        flexShrink: '0',
                      }}
                    >
                      {q.num}
                    </span>
                    <span
                      style={{
                        flex: '1',
                        minWidth: '0',
                        fontSize: '14.5px',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {q.text}
                    </span>
                    <span style={css(q.statusStyle)}>{q.statusLabel}</span>
                    <Icon name="chevron-down" />
                  </button>
                  {q.open ? (
                    <div style={{ padding: '0 18px 18px', borderTop: '1px solid #e3ebf4' }}>
                      <p style={{ fontSize: '15px', fontWeight: '600', lineHeight: '1.5', margin: '16px 0 14px' }}>{q.text}</p>
                      {q.isObjective ? (
                        <>
                          <div style={{ display: 'grid', gap: '8px', marginBottom: '14px' }}>
                            {q.optionRows.map((o, _i) => (
                              <div key={_i} style={css(o.rowStyle)}>
                                <span style={{ fontWeight: '700' }}>{o.letter}</span>
                                {o.text}
                                {o.isCorrect ? (
                                  <span style={{ marginLeft: 'auto', fontSize: '11.5px', fontWeight: '700', color: '#052659' }}>
                                    CORRECT
                                  </span>
                                ) : null}
                                {o.yoursWrong ? (
                                  <span style={{ marginLeft: 'auto', fontSize: '11.5px', fontWeight: '700', color: '#c15f3c' }}>
                                    YOUR ANSWER
                                  </span>
                                ) : null}
                              </div>
                            ))}
                          </div>
                          <div
                            style={{
                              background: '#f4f7fb',
                              borderRadius: '11px',
                              padding: '14px 16px',
                              fontSize: '14px',
                              lineHeight: '1.55',
                              color: '#2a3a4e',
                            }}
                          >
                            <strong style={{ color: '#021024' }}>Explanation.</strong> {q.explanation}
                          </div>
                        </>
                      ) : null}
                      {q.isTheory ? (
                        <>
                          <div style={{ background: '#f4f7fb', borderRadius: '11px', padding: '14px 16px', marginBottom: '12px' }}>
                            <div style={{ fontSize: '12px', fontWeight: '700', color: '#5b6b82', marginBottom: '6px' }}>YOUR ANSWER</div>
                            <p style={{ fontSize: '14px', lineHeight: '1.55', whiteSpace: 'pre-line' }}>{q.yourTextShown}</p>
                          </div>
                          <div style={{ background: '#C1E8FF', borderRadius: '11px', padding: '14px 16px' }}>
                            <div style={{ fontSize: '12px', fontWeight: '700', color: '#052659', marginBottom: '6px' }}>
                              MODEL ANSWER / MARKING GUIDE
                            </div>
                            <p style={{ fontSize: '14px', lineHeight: '1.55', color: '#1f3147', whiteSpace: 'pre-line' }}>
                              {q.modelAnswer}
                            </p>
                          </div>
                        </>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {noResults ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#5b6b82' }}>
          No results yet. Take a mock exam to see your results here.
        </div>
      ) : null}
    </>
  );
}
