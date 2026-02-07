import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const statements = [
  'Beyond the limitations of the physical lens.',
  'Neural radiance meeting human emotion.',
  'Impossible shots, rendered real.',
];

export function PhilosophyStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} style={{ minHeight: '150vh', position: 'relative' }}>
      <div style={{
        position: 'sticky',
        top: '30vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-xl)',
        overflow: 'hidden',
        padding: '0 var(--side-margin)'
      }}>
        {statements.map((text, i) => {
          // Determine opacity based on scroll position of the entire section
          // Each text fades in and out at different stages
          const start = i / statements.length;
          const end = (i + 1) / statements.length;
          const opacity = useTransform(scrollYProgress,
            [start, start + 0.1, end - 0.1, end],
            [0.2, 1, 1, 0.2]
          );

          const y = useTransform(scrollYProgress,
            [start, end],
            [50, -50]
          );

          return (
            <motion.p
              key={i}
              style={{
                fontSize: 'var(--font-section-title)',
                fontFamily: 'var(--font-family-serif)',
                fontStyle: 'italic',
                fontWeight: '400',
                lineHeight: 'var(--line-height-loose)',
                textAlign: 'center',
                maxWidth: '40ch',
                opacity,
                y,
                position: 'absolute', // Stack them on top of each other
                top: 0
              }}
            >
              {text}
            </motion.p>
          )
        })}
      </div>
    </section>
  );
}
