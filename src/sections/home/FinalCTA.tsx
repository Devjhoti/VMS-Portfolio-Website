import { RevealOnScroll } from '../../components/ui/RevealOnScroll';

export function FinalCTA() {
  return (
    <section
      id="contact"
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
            fontSize: 'var(--font-section-title)',
            fontWeight: 'var(--font-weight-light)',
            marginBottom: 'var(--space-lg)',
            letterSpacing: 'var(--letter-spacing-tight)',
          }}
        >
          Let's create something together
        </h2>
      </RevealOnScroll>
      <RevealOnScroll stagger={180}>
        <a
          href="mailto:hello@virtualmodelstudio.com"
          style={{
            letterSpacing: 'var(--letter-spacing-wide)',
            textDecoration: 'none',
            color: 'var(--color-text-muted)',
          }}
        >
          hello@virtualmodelstudio.com
        </a>
      </RevealOnScroll>
    </section>
  );
}
