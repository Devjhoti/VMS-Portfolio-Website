import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // The Kinetic Flythrough
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [1, 20, 100]); // Infinite Zoom
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [1, 1, 0]); // Fade fast as we pass through
  const blur = useTransform(scrollYProgress, [0.3, 0.5], ["0px", "20px"]); // Motion blur effect

  return (
    <motion.section
      ref={ref}
      style={{
        height: '200vh', // Extended scroll track for timing
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <motion.div
          style={{
            scale,
            opacity,
            filter: `blur(${blur})`, // Dynamic blur
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(4rem, 15vw, 12rem)', // Massive initial size
              fontWeight: '400',
              fontFamily: 'var(--font-family-serif)',
              fontStyle: 'italic',
              lineHeight: '0.9',
              letterSpacing: '-0.05em',
              margin: 0,
              textAlign: 'center',
              willChange: 'transform'
            }}
          >
            Virtual<br />Model<br />Studio
          </h1>

          <motion.p
            style={{
              marginTop: 'var(--space-md)',
              fontSize: '1rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase'
            }}
          >
            Scroll to Enter
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}
