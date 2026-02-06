import { RevealOnScroll } from '../../components/ui/RevealOnScroll';

const statements = [
  'We believe in the intersection of AI and human creativity.',
  'Every frame is crafted with intention.',
  'Advertising that feels like art.',
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
              fontWeight: 'var(--font-weight-light)',
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
