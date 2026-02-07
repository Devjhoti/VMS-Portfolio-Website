import { RevealOnScroll } from '../../components/ui/RevealOnScroll';

const statements = [
  'Beyond the limitations of the physical lens.',
  'Neural radiance meeting human emotion.',
  'Impossible shots, rendered real.',
];

export function PhilosophyStrip() {
  return (
    <section
      style={{
        minHeight: '60vh',
        padding: 'var(--section-padding-y) var(--side-margin)',
        maxWidth: 'var(--content-max-width)',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 'var(--space-xl)',
      }}
    >
      {statements.map((text, i) => (
        <RevealOnScroll key={i} stagger={i * 140}>
          <p
            style={{
              fontSize: 'var(--font-section-title)',
              fontFamily: 'var(--font-family-serif)',
              fontStyle: 'italic',
              fontWeight: '400',
              lineHeight: 'var(--line-height-loose)',
              margin: 0,
              maxWidth: '40ch',
            }}
          >
            {text}
          </p>
        </RevealOnScroll>
      ))}
    </section>
  );
}
