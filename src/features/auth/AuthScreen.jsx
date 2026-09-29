import { Alert, Button, Card, Field, Logo, SegmentedControl, Text, TextInput, color, fontSize } from '../../design-system/index.js';

export default function AuthScreen({ v }) {
  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Card elevated style={{ width: '100%', maxWidth: 400, padding: '40px clamp(20px, 6vw, 36px)', borderRadius: 14 }}>
        <div style={{ marginBottom: 6 }}>
          <Logo size={36} nameSize={19} />
        </div>
        <Text style={{ margin: '0 0 28px' }}>Structured practice for all four CELPIP test components.</Text>

        <SegmentedControl
          value={v.authMode}
          onChange={v.setAuthMode}
          options={[{ value: 'signin', label: 'Sign in' }, { value: 'signup', label: 'Create account' }]}
          style={{ marginBottom: 22 }}
        />

        <form onSubmit={(e) => { e.preventDefault(); v.submitAuth(); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {v.authMode === 'signup' && (
            <Field label="Your name">
              <TextInput type="text" autoComplete="name" placeholder="First and last name" value={v.authName} onChange={v.onAuthNameChange} />
            </Field>
          )}
          <Field label="Email">
            <TextInput type="email" placeholder="you@example.com" value={v.authEmail} onChange={v.onAuthEmailChange} />
          </Field>
          <Field label="Password">
            <TextInput type="password" placeholder="••••••••" value={v.authPassword} onChange={v.onAuthPasswordChange} />
          </Field>
          {v.hasAuthError && <Alert tone="danger">{v.authError}</Alert>}
          <Button type="submit" block style={{ marginTop: 6, padding: '12px 0', fontSize: 14 }}>
            {v.authSubmitLabel}
          </Button>
        </form>
        <div style={{ marginTop: 18, fontSize: fontSize.xs + 0.5, color: color.textMuted, textAlign: 'center' }}>Demo mode — any email &amp; password (6+ chars) signs you in.</div>
      </Card>
    </div>
  );
}
