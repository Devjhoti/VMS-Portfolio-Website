import { CinematicBreak } from '../../components/layout/CinematicBreak';
import { RevealOnScroll } from '../../components/ui/RevealOnScroll';

export function CinematicBreakSection() {
  return (
    <CinematicBreak>
      <RevealOnScroll>
        <p
          style={{
            fontSize: 'var(--font-body)',
            color: 'var(--color-silver)',
            opacity: 0.9,
            margin: 0,
            textAlign: 'center',
            maxWidth: '30ch',
          }}
        >
          Where technology meets craft.
        </p>
      </RevealOnScroll>
    </CinematicBreak>
  );
}
