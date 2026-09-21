import { LISTENING_MOCK_PARTS, MOCK_OPTION_LETTERS } from '../../data/index.js';
import { clbBandInfo } from '../../lib/clb.js';
import { Alert, BackLink, Badge, Button, Card, Eyebrow, Heading, Mono, PageHeader, Select, color, fontSize, radius, tone } from '../../design-system/index.js';

// Full listening mock: the YouTube video plays the whole 6-part test; the
// candidate marks answers on the sheet below and checks them at the end.
// Auto-scoring needs the item's answer key (see data/videoMocks.js).
export default function VideoMockScreen({ v }) {
  const item = v.mockItem;
  const { answers, checked, result } = v.mock;
  const key = v.mockKey;
  const answered = Object.keys(answers).length;
  const totalQ = LISTENING_MOCK_PARTS.reduce((a, p) => a + p.count, 0);

  let qNum = 0;
  return (
    <>
      <BackLink onClick={v.goTaskList}>Listening tasks</BackLink>
      <PageHeader
        title={`Listening · ${item.label}`}
        subtitle="Play the video once, top to bottom, like the real exam. Mark your answer for each question below as you go, then check at the end."
        style={{ marginTop: 8, marginBottom: 18 }}
        actions={
          <>
            <Select value={v.mock.index} onChange={(e) => v.selectVideoMock(Number(e.target.value))}>
              {v.videoMocks.map((m, i) => (
                <option key={m.id} value={i}>{m.label}{m.answers ? '' : ' — no key yet'}</option>
              ))}
            </Select>
            <Button variant="outline" size="sm" onClick={() => v.startVideoMock()} style={{ padding: '10px 14px' }}>🔀 Random test</Button>
          </>
        }
      />

      <div style={{ background: '#000', borderRadius: radius.lg, overflow: 'hidden', marginBottom: 18 }}>
        <iframe
          key={item.youtube}
          src={`https://www.youtube.com/embed/${item.youtube}?rel=0`}
          title={item.label}
          style={{ width: '100%', aspectRatio: '16 / 9', display: 'block', border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <Card style={{ padding: '20px 22px', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <Heading level="section">Answer sheet</Heading>
          <Mono size="sm" color={color.textMuted} style={{ fontWeight: 400 }}>{answered} / {totalQ} answered</Mono>
        </div>

        {LISTENING_MOCK_PARTS.map((part) => (
          <div key={part.name}>
            <Eyebrow color={color.primary} style={{ margin: '16px 0 8px' }}>{part.name}</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
              {Array.from({ length: part.count }, () => ++qNum).map((n) => {
                const picked = answers[n];
                const correctLetter = key ? key[n - 1] : null;
                const isRight = checked && picked === correctLetter;
                const isWrong = checked && picked && picked !== correctLetter;
                return (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid ' + (isRight ? color.success : isWrong ? color.danger : color.border), borderRadius: radius.md, padding: '7px 9px', background: isRight ? tone.success.bg : isWrong ? tone.danger.bg : color.surfaceSubtle }}>
                    <Mono size={12} color={color.textSecondary} style={{ width: 20 }}>{n}.</Mono>
                    {MOCK_OPTION_LETTERS.map((L) => (
                      <button
                        key={L}
                        type="button"
                        className="ds-focusable"
                        disabled={checked}
                        onClick={() => v.setMockAnswer(n, L)}
                        aria-pressed={picked === L}
                        style={{
                          width: 26, height: 26, borderRadius: radius.sm, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
                          fontSize: 12, fontWeight: 700, cursor: checked ? 'default' : 'pointer', userSelect: 'none',
                          background: picked === L ? color.primary : color.surface,
                          color: picked === L ? color.textOnInverse : color.textSecondary,
                          border: '1px solid ' + (picked === L ? color.primary : color.borderStrong),
                        }}
                      >
                        {L}
                      </button>
                    ))}
                    {isWrong && <Mono size={11.5} color={color.success}>→{correctLetter}</Mono>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginTop: 20 }}>
          {key ? (
            checked ? (
              <ScoreBadge result={result} />
            ) : (
              <div style={{ fontSize: fontSize.sm, color: color.textMuted }}>Finish the video, then check your answers.</div>
            )
          ) : (
            <Alert tone="warning" style={{ padding: '9px 13px', borderRadius: radius.md }}>
              ⚠ The answer key for this test hasn't been added yet, so it can't be auto-scored. Pick a test with a key, or add one in src/data/videoMocks.js.
            </Alert>
          )}
          {!checked && <Button onClick={v.checkVideoMock} disabled={!key}>Check answers</Button>}
          {checked && <Button variant="outline" size="sm" onClick={() => v.selectVideoMock(v.mock.index)} style={{ padding: '10px 14px' }}>↺ Retake this test</Button>}
        </div>
      </Card>
    </>
  );
}

function ScoreBadge({ result }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <Mono size={15}>{result.correct} / {result.total} correct</Mono>
      <Badge tone={clbBandInfo(result.clb)} mono size="md" style={{ padding: '5px 12px' }}>CLB {result.clb}</Badge>
      <div style={{ fontSize: fontSize.sm, color: color.textMuted }}>Saved to your score tracker.</div>
    </div>
  );
}
