import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CopperDivider } from '../../components/ui/CopperDivider';

export function MicroStatement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.9, 1.3, 0.9]); // Increased scale
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.5, 1, 0.5]);

  return (
    <section
      ref={ref}
      style={{
        minHeight: '60vh',
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
      <motion.p
        style={{
          fontSize: 'calc(var(--font-section-title) * 1.2)', // Larger base font
          fontFamily: 'var(--font-family-serif)',
          fontStyle: 'italic',
          color: '#ffffff', // Clean white for visibility
          textAlign: 'center',
          maxWidth: '20ch',
          margin: 0,
          lineHeight: 'var(--line-height-tight)',
          scale,
          opacity,
          textShadow: '0 4px 20px rgba(0,0,0,0.5)' // Added shadow for depth
        }}
      >
        We don't just edit video. We generate reality.
      </motion.p>
      <div style={{ marginTop: 'var(--space-2xl)' }}>
        <CopperDivider />
      </div>
    </section>
  );
}
