import { Avatar, Button, Logo, color, fontWeight, layout } from '../design-system/index.js';

export default function TopNav({ v }) {
  return (
    <header
      style={{
        height: layout.navHeight,
        flex: 'none',
        background: color.surface,
        borderBottom: `1px solid ${color.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: `0 clamp(16px, 4vw, ${layout.gutter}px)`,
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <div className="ds-focusable" role="button" tabIndex={0} style={{ cursor: 'pointer' }} onClick={v.goDashboard} onKeyDown={(e) => e.key === 'Enter' && v.goDashboard()}>
        <Logo nameClassName="ds-hide-sm" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Button variant="secondary" size="sm" onClick={v.toggleCLBPanel} style={{ fontWeight: fontWeight.medium }}>
          CLB Scale
        </Button>
        <div style={{ width: 1, height: 22, background: color.border }} />
        <button
          className="ds-focusable"
          onClick={v.goProfile}
          title="View profile"
          style={{ display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px 6px', borderRadius: 8, color: color.text }}
        >
          <Avatar initials={v.userInitials} />
          <div className="ds-hide-sm" style={{ fontSize: 13, fontWeight: fontWeight.medium }}>{v.userName}</div>
        </button>
        <Button variant="ghost" onClick={v.signOut} style={{ fontSize: 12.5, fontWeight: fontWeight.medium, padding: '6px 4px' }}>
          Sign out
        </Button>
      </div>
    </header>
  );
}
