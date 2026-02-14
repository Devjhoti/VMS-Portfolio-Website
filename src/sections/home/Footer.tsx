import { CopperDivider } from '../../components/ui/CopperDivider';

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-navy-base)',
        color: 'var(--color-silver)',
        padding: 'var(--section-padding-y) var(--side-margin)',
        position: 'relative', // Ensure stacking context
        zIndex: 5, // Ensure it covers the fixed hero video
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
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.02em' }}>Virtual Model</span>
            <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-serif)', fontStyle: 'italic', opacity: 0.7 }}>Studio</span>
          </div>
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
              <li>
                <a
                  href="#work"
                  style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new Event('open-work-grid'));
                    document.getElementById('editorial')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Work
                </a>
              </li>
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
