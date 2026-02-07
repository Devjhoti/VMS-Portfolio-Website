import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <motion.section
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--section-padding-y) var(--side-margin)',
        maxWidth: 'var(--content-max-width)',
        margin: '0 auto',
        position: 'relative',
        opacity,
        y
      }}
    >
      <motion.div style={{ scale, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            willChange: 'transform' // Performance opt
          }}
        >
          Virtual Model Studio
        </h1>

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
      </motion.div>
    </motion.section>
  );
}
