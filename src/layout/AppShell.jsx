import { layout } from '../design-system/index.js';
import TopNav from './TopNav.jsx';
import CLBPanel from './CLBPanel.jsx';

// Signed-in chrome: sticky top nav, optional CLB reference strip, centred content column.
export default function AppShell({ v, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopNav v={v} />
      {v.showCLBPanel && <CLBPanel bands={v.clbBands} />}
      <main style={{ flex: 1, padding: `32px clamp(16px, 4vw, ${layout.gutter}px) 60px` }}>
        <div style={{ maxWidth: layout.maxWidth, margin: '0 auto' }}>{children}</div>
      </main>
    </div>
  );
}
