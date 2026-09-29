import { useState } from 'react';
import { Avatar, BackLink, Badge, Button, Card, Field, Heading, Select, Text, TextInput, tone } from '../../design-system/index.js';
import ScoreTracker from '../dashboard/ScoreTracker.jsx';
import VocabCard from '../vocab/VocabCard.jsx';

const TARGET_LEVELS = [4, 5, 6, 7, 8, 9, 10, 11, 12];

// Profile (Issue #5): the user chip in the top nav opens this screen with
// account details, the CLB target and the full per-section score tracker.
export default function ProfileScreen({ v }) {
  const [name, setName] = useState(v.userName);
  const [target, setTarget] = useState(v.userTarget || '');
  const [testDate, setTestDate] = useState(v.userTestDate || '');
  const [saved, setSaved] = useState(false);
  const dirty = name.trim() !== v.userName || (Number(target) || null) !== v.userTarget || (testDate || null) !== v.userTestDate;
  const countdown = countdownLabel(v.userTestDate);

  function save(e) {
    e.preventDefault();
    v.updateProfile({ name, target: Number(target) || null, testDate: testDate || null });
    setSaved(true);
  }

  return (
    <>
      <BackLink onClick={v.goDashboard}>Dashboard</BackLink>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '10px 0 26px' }}>
        <Avatar initials={v.userInitials} size={56} />
        <div>
          <Heading style={{ fontSize: 22 }}>{v.userName || 'Add your name'}</Heading>
          <Text>{v.userEmail}</Text>
          {countdown && <Text muted={false} style={{ fontWeight: 600, marginTop: 2 }}>{countdown}</Text>}
          <Text size="sm" style={{ marginTop: 2 }}>{v.lastPractice ? `Last practice: ${v.lastPractice}` : 'No practice yet'}</Text>
        </div>
        {v.userTarget && (
          <Badge tone={tone.primary} mono size="md" style={{ marginLeft: 'auto' }}>Target CLB {v.userTarget}</Badge>
        )}
      </div>

      <Card padding="lg" style={{ marginBottom: 24 }}>
        <form onSubmit={save} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 240px' }}>
            <Field label="Name">
              <TextInput type="text" autoComplete="name" placeholder="First and last name" value={name} onChange={(e) => { setName(e.target.value); setSaved(false); }} />
            </Field>
          </div>
          <div style={{ flex: '0 1 180px' }}>
            <Field label="Target score">
              <Select value={target} onChange={(e) => { setTarget(e.target.value); setSaved(false); }} style={{ width: '100%', padding: '11px 12px', fontSize: 14 }}>
                <option value="">Not set</option>
                {TARGET_LEVELS.map((n) => <option key={n} value={n}>CLB {n}</option>)}
              </Select>
            </Field>
          </div>
          <div style={{ flex: '0 1 180px' }}>
            <Field label="Test date">
              <TextInput type="date" value={testDate} onChange={(e) => { setTestDate(e.target.value); setSaved(false); }} style={{ padding: '10px 12px' }} />
            </Field>
          </div>
          <Button type="submit" disabled={!dirty} style={{ padding: '11px 18px' }}>
            {saved && !dirty ? 'Saved ✓' : 'Save'}
          </Button>
        </form>
      </Card>

      <ScoreTracker rows={v.scoreRows} onReset={v.resetSectionScores} style={{ marginBottom: 24 }} />

      <VocabCard vocab={v.vocab} onAdd={v.addVocab} onDelete={v.deleteVocab} style={{ marginBottom: 24 }} />

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {v.focusSection ? (
          <Button onClick={() => v.openSection(v.focusSection.id)}>
            Focus next: {v.focusSection.name} ({v.focusSection.note}) →
          </Button>
        ) : (
          <Button onClick={v.goSectionList}>Practice a section →</Button>
        )}
        <Button variant="danger" onClick={v.signOut}>Sign out</Button>
      </div>
    </>
  );
}

// "23 days to your test" for a YYYY-MM-DD date; null when unset.
function countdownLabel(date) {
  if (!date) return null;
  const [y, m, d] = date.split('-').map(Number);
  const now = new Date();
  const days = Math.round((new Date(y, m - 1, d) - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 86400000);
  if (days < 0) return `Test was on ${new Date(y, m - 1, d).toLocaleDateString()}`;
  if (days === 0) return 'Your test is today — good luck!';
  if (days === 1) return '1 day to your test';
  return `${days} days to your test`;
}
