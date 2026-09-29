import { color, radius, shadow } from '../tokens.js';

const PADDING = { none: 0, sm: '16px 18px', md: '18px 22px', lg: '26px 26px 24px' };

// Base surface. `interactive` adds pointer + hover elevation; `accentBar`
// draws the coloured strip used on the dashboard mode cards.
export default function Card({ padding = 'md', interactive = false, accentBar, elevated = false, onClick, style, children, ...rest }) {
  const clickable = interactive || !!onClick;
  return (
    <div
      className={clickable ? 'ds-card-interactive' : undefined}
      onClick={onClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick?.(e); } } : undefined}
      style={{
        background: color.surface,
        border: `1px solid ${color.border}`,
        borderRadius: accentBar ? radius.xl : radius.lg,
        boxShadow: elevated || accentBar ? shadow.sm : undefined,
        overflow: accentBar ? 'hidden' : undefined,
        cursor: clickable ? 'pointer' : undefined,
        padding: accentBar ? 0 : PADDING[padding],
        ...(accentBar ? { display: 'flex', flexDirection: 'column' } : null),
        ...style,
      }}
      {...rest}
    >
      {accentBar ? (
        <>
          <div style={{ height: 8, background: accentBar }} />
          <div style={{ padding: PADDING[padding], flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
        </>
      ) : (
        children
      )}
    </div>
  );
}
