import { BackLink, Button, Card, Eyebrow, List, PageHeader, color, font, fontSize, fontWeight } from '../../design-system/index.js';
import SectionGuide from './SectionGuide.jsx';
import SavedAnswerList from '../answers/SavedAnswerList.jsx';
import MockResultList from '../answers/MockResultList.jsx';

// One section: scoring criteria + tips, then its parts in exam order.
// Every part row opens that part on its own. Listening, Reading and Speaking
// can also be taken as a whole mock (header button): Listening and Reading as
// a full video mock test, Writing and Speaking as every task back to back
// under exam timing.
const FULL_MOCK_SECTIONS = ['writing', 'speaking'];

export default function TaskList({ v }) {
  const sec = v.activeSectionObj;
  if (!sec) return null;
  const accent = v.sectionStyle[sec.id];
  const isVideoSection = !!sec.videoMocks;
  const { duration, parts, questions } = sec.official;

  const startWhole = isVideoSection ? () => v.startVideoMock() : FULL_MOCK_SECTIONS.includes(sec.id) ? () => v.startSectionRun(sec.id) : null;
  const openPart = isVideoSection ? (i) => v.startVideoMock(null, i) : (i) => v.openTask(i);

  return (
    <>
      <BackLink onClick={v.goSectionList}>Sections</BackLink>
      <PageHeader
        title={sec.name}
        style={{ marginTop: 8, marginBottom: 18 }}
        actions={startWhole && (
          <Button size="lg" accent={accent.color} onClick={startWhole}>
            ▶ Start full {sec.name} mock
          </Button>
        )}
        subtitle={
          startWhole
            ? 'Take the whole section in one go, or pick a single part below to practise it on its own.'
            : 'Pick a part below to practise it on its own.'
        }
      />

      <Card style={{ padding: '16px 20px', marginBottom: 18 }}>
        <SectionGuide section={sec} />
      </Card>

      <Eyebrow style={{ marginBottom: 8 }}>{`Test structure · ${duration} · ${parts} parts · ${questions} questions`}</Eyebrow>
      <List>
        {sec.tasks.map((t, i) => (
          <PartRow
            key={t.id}
            n={i + 1}
            name={isVideoSection ? sec.mockParts[i].name.split(' · ')[1] : t.name}
            about={t.instructions.replace(/,? then answer the questions\.?$/, '.')}
            meta={partMeta(sec, t, i)}
            accent={accent}
            last={i === sec.tasks.length - 1}
            onClick={() => openPart(i)}
          />
        ))}
      </List>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '24px 0 8px' }}>
        <Eyebrow>{isVideoSection ? 'Your results' : 'Saved answers'}</Eyebrow>
        <Button variant="ghost" onClick={() => v.goAnswers(sec.id)} style={{ fontSize: fontSize.sm, color: accent.color }}>All my answers →</Button>
      </div>
      {isVideoSection
        ? <MockResultList section={sec} scores={v.scores[sec.id]} onDelete={v.deleteScore} />
        : <SavedAnswerList sections={[sec]} answers={v.savedAnswers} onUpdate={v.updateSavedAnswer} onDelete={v.deleteSavedAnswer} />}
    </>
  );
}

// Listening parts have no fixed time of their own, so only the question
// count is shown; Reading parts show both.
function partMeta(sec, t, i) {
  if (t.kind === 'speaking') return `${t.prepSec}s prep · ${t.responseSec}s speak`;
  const questions = sec.mockParts && `${sec.mockParts[i].count} questions`;
  const minutes = sec.id !== 'listening' && t.minutes && `${t.minutes} min`;
  return [questions, minutes].filter(Boolean).join(' · ');
}

function PartRow({ n, name, about, meta, accent, last, onClick }) {
  return (
    <div
      className="ds-row-interactive"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', cursor: 'pointer', borderBottom: last ? 'none' : `1px solid ${color.divider}` }}
    >
      <div style={{ flex: 'none', width: 26, height: 26, borderRadius: 999, background: accent.bg, color: accent.color, fontFamily: font.mono, fontWeight: fontWeight.bold, fontSize: fontSize.sm, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {n}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: fontSize.lg, fontWeight: fontWeight.bold, marginBottom: 2 }}>{name}</div>
        <div style={{ fontSize: fontSize.sm, color: color.textSecondary, lineHeight: 1.5 }}>{about}</div>
      </div>
      <div style={{ flex: 'none', textAlign: 'right' }}>
        {meta && <div style={{ fontSize: fontSize.sm, fontFamily: font.mono, color: color.textMuted, whiteSpace: 'nowrap', marginBottom: 2 }}>{meta}</div>}
        <div style={{ fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: accent.color, whiteSpace: 'nowrap' }}>Practise →</div>
      </div>
    </div>
  );
}
