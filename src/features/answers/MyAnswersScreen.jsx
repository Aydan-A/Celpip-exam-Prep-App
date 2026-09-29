import { BackLink, Eyebrow, PageHeader, SegmentedControl } from '../../design-system/index.js';
import SavedAnswerList from './SavedAnswerList.jsx';
import MockResultList from './MockResultList.jsx';
import ExamHistoryList from './ExamHistoryList.jsx';

// "My answers": all four sections plus finished full mocks. Listening and
// Reading show mock test results (with the answer sheet); Writing and
// Speaking show saved answers to read, play, score, improve or delete.
export default function MyAnswersScreen({ v }) {
  const filter = v.answersFilter;
  const countFor = (sec) =>
    sec.videoMocks
      ? Object.keys(v.scores[sec.id] || {}).length
      : v.savedAnswers.filter((a) => sec.tasks.some((t) => t.id === a.taskId)).length;
  const tabs = [
    { value: 'all', label: 'All' },
    ...v.sections.map((sec) => ({ value: sec.id, label: `${sec.name} (${countFor(sec)})` })),
    { value: 'mocks', label: `Full mocks (${v.exams.length})` },
  ];
  const shown = filter === 'all' ? v.sections : v.sections.filter((sec) => sec.id === filter);

  return (
    <>
      <BackLink onClick={v.goDashboard}>Dashboard</BackLink>
      <PageHeader
        title="My answers"
        subtitle="Your Listening and Reading results, your saved Writing and Speaking answers, and every full mock you finished."
        style={{ marginTop: 8, marginBottom: 18 }}
      />
      <SegmentedControl style={{ flexWrap: 'wrap', marginBottom: 16 }} value={filter} onChange={v.setAnswersFilter} options={tabs} />

      {shown.map((sec) => (
        <div key={sec.id} style={{ marginBottom: 20 }}>
          {filter === 'all' && <Eyebrow style={{ marginBottom: 8 }}>{sec.name}</Eyebrow>}
          {sec.videoMocks
            ? <MockResultList section={sec} scores={v.scores[sec.id]} onDelete={v.deleteScore} />
            : <SavedAnswerList sections={[sec]} answers={v.savedAnswers} onUpdate={v.updateSavedAnswer} onDelete={v.deleteSavedAnswer} />}
        </div>
      ))}

      {(filter === 'all' || filter === 'mocks') && (
        <div style={{ marginBottom: 20 }}>
          {filter === 'all' && <Eyebrow style={{ marginBottom: 8 }}>Full mocks</Eyebrow>}
          <ExamHistoryList exams={v.exams} answers={v.savedAnswers} onDelete={v.deleteExam} />
        </div>
      )}
    </>
  );
}
