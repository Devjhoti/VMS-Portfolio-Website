import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealOnScroll } from '../../components/ui/RevealOnScroll';

export function MicroStatement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Scale peaks when element is perfectly centered in viewport (0.5 progress)
  const scale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.95, 1.05, 0.95]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.6, 1, 0.6]);

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh', // Restored deeper height
        padding: '15vh 5vw',
        maxWidth: '1400px', // Wider container for big screens
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6rem', // More breathing room
        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      {/* 1. We generate reality statement */}
      <RevealOnScroll>
        <motion.p
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)', // Significantly larger on desktop
            fontFamily: 'var(--font-family-serif)',
            fontStyle: 'italic',
            color: '#ffffff',
            maxWidth: '1000px',
            margin: 0,
            lineHeight: '1.2',
            scale,
            opacity,
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}
        >
          We don't just edit video. <br className="md:hidden" /> We generate reality.
        </motion.p>
      </RevealOnScroll>

      {/* 2. Hero-style Branding (Middle) */}
      <RevealOnScroll stagger={0.2}>
        <h2
          style={{
            fontSize: 'clamp(4rem, 12vw, 9rem)', // Massive impact
            fontWeight: '400',
            fontFamily: 'var(--font-family-serif)',
            fontStyle: 'italic',
            lineHeight: '0.9',
            letterSpacing: '-0.05em',
            margin: 0,
            color: '#ffffff',
            textShadow: '0 4px 30px rgba(0,0,0,0.5)'
          }}
        >
          Virtual<br />Model<br />Studio
        </h2>
      </RevealOnScroll>

      {/* 3. CTA + Email */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <RevealOnScroll stagger={0.4}>
          <h3
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)', // Larger CTA
              fontWeight: '300',
              color: '#fff',
              margin: 0
            }}
          >
            Let's create something together
          </h3>
        </RevealOnScroll>

        <RevealOnScroll stagger={0.5}>
          <a
            href="mailto:virtualmodelstudiobd@gmail.com"
            style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', // Larger email
              letterSpacing: '0.1em',
              textDecoration: 'none',
              color: 'rgba(255, 255, 255, 0.7)',
              transition: 'color 0.3s ease',
              borderBottom: '1px solid rgba(255,255,255,0.3)',
              paddingBottom: '8px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
          >
            virtualmodelstudiobd@gmail.com
          </a>
        </RevealOnScroll>
      </div>

    </section>
  );
}
