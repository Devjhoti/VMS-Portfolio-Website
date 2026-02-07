import { RevealOnScroll } from '../../components/ui/RevealOnScroll';

export function HeroSection() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--section-padding-y) var(--side-margin)',
        maxWidth: 'var(--content-max-width)',
        margin: '0 auto',
      }}
    >
      <RevealOnScroll stagger={0}>
        <h1
          style={{
            fontSize: 'var(--font-hero)',
            fontWeight: '400',
            fontFamily: 'var(--font-family-serif)',
            fontStyle: 'italic',
            lineHeight: 'var(--line-height-tight)',
            letterSpacing: 'var(--letter-spacing-tight)',
            margin: 0,
            marginBottom: 'var(--space-lg)',
            textAlign: 'center',
          }}
        >
          Virtual Model Studio
        </h1>
      </RevealOnScroll>
      <RevealOnScroll stagger={180}>
        <p
          style={{
            fontSize: 'var(--font-body)',
            color: 'var(--color-text-muted)',
            lineHeight: 'var(--line-height-loose)',
            margin: 0,
            marginBottom: 'var(--space-xl)',
            textAlign: 'center',
            maxWidth: '32ch',
          }}
        >
          We craft hyper-realistic digital humans and impossible environments for the next generation of brand storytelling.
        </p>
      </RevealOnScroll>
      <RevealOnScroll stagger={360}>
        <a
          href="#work"
          style={{
            letterSpacing: 'var(--letter-spacing-wide)',
            textDecoration: 'none',
            color: 'var(--color-text-muted)',
            fontWeight: 'var(--font-weight-light)',
          }}
        >
          View Work
        </a>
      </RevealOnScroll>
    </section>
  );
}
