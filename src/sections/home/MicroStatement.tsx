import { RevealOnScroll } from '../../components/ui/RevealOnScroll';
import { CopperDivider } from '../../components/ui/CopperDivider';

export function MicroStatement() {
  return (
    <section
      style={{
        minHeight: '40vh',
        padding: 'var(--section-padding-y) var(--side-margin)',
        maxWidth: 'var(--content-max-width)',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-md)',
      }}
    >
      <RevealOnScroll>
        <p
          style={{
            fontSize: 'var(--font-body)',
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            maxWidth: '36ch',
            margin: 0,
            lineHeight: 'var(--line-height-loose)',
          }}
        >
          We don't just edit video. We generate reality.
        </p>
      </RevealOnScroll>
      <CopperDivider />
    </section>
  );
}
