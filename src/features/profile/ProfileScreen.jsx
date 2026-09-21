import { Avatar, BackLink, Button, Heading, Text } from '../../design-system/index.js';
import ScoreTracker from '../dashboard/ScoreTracker.jsx';

// Profile (Issue #5): the user chip in the top nav opens this screen with
// account details and the full per-section score tracker.
export default function ProfileScreen({ v }) {
  return (
    <>
      <BackLink onClick={v.goDashboard}>Dashboard</BackLink>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '10px 0 26px' }}>
        <Avatar initials={v.userInitials} size={56} />
        <div>
          <Heading style={{ fontSize: 22 }}>{v.userName}</Heading>
          <Text>{v.userEmail}</Text>
        </div>
      </div>

      <ScoreTracker rows={v.scoreRows} style={{ marginBottom: 24 }} />

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Button onClick={v.goSectionList}>Practice a section →</Button>
        <Button variant="danger" onClick={v.signOut}>Sign out</Button>
      </div>
    </>
  );
}
