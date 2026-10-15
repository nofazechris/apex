import Icon from '@/components/Icon';
import { css } from '@/lib/css';

export default function ExamRoom({ vm }) {
  const { cancelSubmit, confirmOpen, confirmSubmit, exam, qv, qvIsObjective, qvIsTheory } = vm;
  return (
    <div style={{ minHeight: '100vh', background: '#eef2f7', display: 'flex', flexDirection: 'column' }}>
      <div
        className="r-exam-top"
        style={{
          background: '#021024',
          color: '#fff',
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: '0',
          zIndex: '30',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '15px', fontWeight: '700' }}>{exam.title}</span>
          <span style={{ fontSize: '12.5px', color: '#9fb4d0' }}>
            {exam.answeredCount}/{exam.total}
            {' answered'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={css(exam.timerStyle)}>
            <Icon name="clock" />
            {exam.timer}
          </div>
          <button
            onClick={exam.onSubmit}
            style={{
              background: '#C1E8FF',
              color: '#021024',
              padding: '9px 18px',
              borderRadius: '999px',
              fontWeight: '700',
              fontSize: '14px',
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <div
        className="r-exam"
        style={{ flex: '1', display: 'grid', gridTemplateColumns: '1fr 288px', maxWidth: '1240px', margin: '0 auto', width: '100%' }}
      >
        <div className="r-px" style={{ padding: '34px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#5483B3', letterSpacing: '.04em' }}>
              {qv.subject}
              {' · Question '}
              {qv.number}
              {' of '}
              {qv.total}
            </div>
            <button onClick={exam.onFlag} style={css(exam.flagStyle)}>
              <Icon name="flag" />
              {' Flag'}
            </button>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e3ebf4', borderRadius: '18px', padding: '30px' }}>
            {qvIsTheory ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#5483B3' }}>THEORY</span>
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
                <p style={{ fontSize: '18px', fontWeight: '600', lineHeight: '1.5', marginBottom: '18px' }}>{qv.text}</p>
                <textarea
                  value={qv.theoryText}
                  onChange={qv.setThEvt}
                  placeholder="Type your answer here…"
                  style={{
                    width: '100%',
                    minHeight: '220px',
                    padding: '16px',
                    border: '1.5px solid #e3ebf4',
                    borderRadius: '12px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                />
              </>
            ) : null}
            {qvIsObjective ? (
              <>
                <p style={{ fontSize: '19px', fontWeight: '600', lineHeight: '1.5', marginBottom: '22px' }}>{qv.text}</p>
                <div style={{ display: 'grid', gap: '11px' }}>
                  {qv.options.map((o, _i) => (
                    <button key={_i} onClick={o.onSelect} style={css(o.style)}>
                      <span
                        style={{
                          width: '30px',
                          height: '30px',
                          flexShrink: '0',
                          borderRadius: '8px',
                          background: '#f4f7fb',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700',
                          fontSize: '14px',
                        }}
                      >
                        {o.letter}
                      </span>
                      {o.text}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '22px' }}>
            <button onClick={qv.onPrev} style={css(qv.prevStyle)}>
              <Icon name="arrow-left" />
              {' Previous'}
            </button>
            <button onClick={qv.onNext} style={css(qv.nextStyle)}>
              {'Next '}
              <Icon name="arrow-right" />
            </button>
          </div>
        </div>
        <div className="r-exam-side" style={{ padding: '34px 28px 34px 0' }}>
          <div
            className="r-static"
            style={{
              background: '#fff',
              border: '1px solid #e3ebf4',
              borderRadius: '18px',
              padding: '22px',
              position: 'sticky',
              top: '96px',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '14px' }}>Question navigator</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '7px', maxHeight: '300px', overflowY: 'auto' }}>
              {exam.palette.map((b, _i) => (
                <button key={_i} onClick={b.onClick} style={css(b.style)}>
                  {b.n}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginTop: '18px', fontSize: '12.5px', color: '#5b6b82' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#052659' }} />
                {' Answered ('}
                {exam.answeredCount})
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#fff3e8', border: '1.5px solid #e4915f' }}
                />
                {' Flagged for review'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#fff', border: '1.5px solid #e3ebf4' }} />
                {' Unanswered ('}
                {exam.unanswered})
              </span>
            </div>
            <button
              onClick={exam.onSubmit}
              style={{
                width: '100%',
                marginTop: '20px',
                background: '#021024',
                color: '#fff',
                padding: '13px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '15px',
              }}
            >
              Submit examination
            </button>
          </div>
        </div>
      </div>
      {confirmOpen ? (
        <div
          style={{
            position: 'fixed',
            inset: '0',
            background: 'rgba(2,16,36,.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '60',
            padding: '20px',
          }}
        >
          <div style={{ background: '#fff', borderRadius: '20px', padding: '30px', maxWidth: '420px', width: '100%' }} className="apx-fade">
            <span
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '13px',
                background: '#C1E8FF',
                color: '#052659',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <Icon name="send" />
            </span>
            <h3 style={{ fontSize: '21px', fontWeight: '800', marginBottom: '8px' }}>Submit your exam?</h3>
            <p style={{ color: '#5b6b82', fontSize: '15px', lineHeight: '1.55' }}>
              {'You have answered '}
              <strong style={{ color: '#021024' }}>
                {exam.answeredCount}
                {' of '}
                {exam.total}
              </strong>
              {' questions. '}
              {exam.unanswered}
              {' remain unanswered. You can’t change answers after submitting.'}
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button
                onClick={cancelSubmit}
                style={{
                  flex: '1',
                  padding: '12px',
                  border: '1.5px solid #e3ebf4',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '15px',
                  background: '#fff',
                }}
              >
                Keep working
              </button>
              <button
                onClick={confirmSubmit}
                style={{
                  flex: '1',
                  padding: '12px',
                  background: '#052659',
                  color: '#fff',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '15px',
                }}
              >
                Submit now
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
