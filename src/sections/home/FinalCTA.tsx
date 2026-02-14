import { RevealOnScroll } from '../../components/ui/RevealOnScroll';

export function FinalCTA() {
  return (
    <section

      style={{
        minHeight: '70vh',
        padding: 'var(--section-padding-y) var(--side-margin)',
        maxWidth: 'var(--content-max-width)',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <RevealOnScroll>
        <h2
          style={{
            fontSize: 'calc(var(--font-section-title) * 1.5)', // Scaled up significantly
            fontWeight: 'var(--font-weight-light)',
            marginBottom: 'var(--space-lg)',
            letterSpacing: 'var(--letter-spacing-tight)',
            color: '#ffffff', // Clean white
            textAlign: 'center',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}
        >
          Let's create something together
        </h2>
      </RevealOnScroll>
      <RevealOnScroll stagger={180}>
        <a
          href="mailto:virtualmodelstudiobd@gmail.com"
          style={{
            fontSize: '1.25rem',
            letterSpacing: 'var(--letter-spacing-wide)',
            textDecoration: 'none',
            color: '#ffffff',
            opacity: 0.9,
            transition: 'opacity 0.3s ease'
          }}
        >
          virtualmodelstudiobd@gmail.com
        </a>
      </RevealOnScroll>
    </section>
  );
}
