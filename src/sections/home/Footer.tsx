import { CopperDivider } from '../../components/ui/CopperDivider';

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-navy-base)',
        color: 'var(--color-silver)',
        padding: 'var(--section-padding-y) var(--side-margin)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--content-max-width)',
          margin: '0 auto',
        }}
      >
        <CopperDivider />
        <div
          style={{
            marginTop: 'var(--space-lg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
          }}
        >
          <span style={{ fontSize: 'var(--font-caption)', opacity: 0.8 }}>
            VM — Full circular logo placeholder
          </span>
          <nav>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                gap: 'var(--space-xl)',
                letterSpacing: 'var(--letter-spacing-wide)',
                fontWeight: 'var(--font-weight-light)',
              }}
            >
              <li><a href="#work" style={{ color: 'inherit', textDecoration: 'none' }}>Work</a></li>
              <li><a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>About</a></li>
              <li><a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a></li>
            </ul>
          </nav>
        </div>
        <p style={{ marginTop: 'var(--space-xl)', fontSize: 'var(--font-caption)', opacity: 0.6 }}>
          Virtual Model Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
