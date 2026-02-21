import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const statements = [
  'Where technology meets craft.', // New Statement inserted as requested to replace "boring" text
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
    <section ref={containerRef} style={{ minHeight: '300vh', position: 'relative', zIndex: 11, background: '#000', color: '#fff' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Vortex Effect */}
        <motion.div
          style={{
            position: 'absolute',
            width: '1000px',
            height: '1000px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 0.5])
          }}
        />

        {statements.map((text, i) => (
          <LiquidText key={i} text={text} index={i} total={statements.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function LiquidText({ text, index, total, progress }: any) {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;

  // Opacity with a sharp "cut"
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);

  // The "Liquid" Distortion
  // We scale Y massively while blurring to simulate motion blur/stretch
  const scaleY = useTransform(progress, [start, start + 0.1, end - 0.1, end], [4, 1, 1, 4]);
  const filter = useTransform(progress, [start, start + 0.1, end - 0.1, end], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);
  const y = useTransform(progress, [start, end], [100, -100]); // Subtle rise

  return (
    <motion.h2
      style={{
        position: 'absolute',
        fontSize: 'clamp(3rem, 6vw, 6rem)',
        fontFamily: 'var(--font-family-serif)',
        fontStyle: 'italic',
        textAlign: 'center',
        maxWidth: '60%',
        margin: 0,
        opacity,
        scaleY,
        filter,
        y,
        willChange: 'transform, opacity'
      }}
    >
      {text}
    </motion.h2>
  )
}
