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
        zIndex: 10,
        background: '#000' // Dark background fallback
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

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source src="https://res.cloudinary.com/dxez9kmnn/video/upload/v1770965997/Vms_Website_Banner_f9jkso.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.6)',
          zIndex: 1
        }} />

        <motion.div
          style={{
            scale,
            opacity,
            filter: `blur(${blur})`, // Dynamic blur
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative', // Ensure it's on top
            zIndex: 2
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
              willChange: 'transform',
              color: '#ffffff', // Set text color to white
              textShadow: '0 4px 30px rgba(0,0,0,0.5)' // Add shadow for better readability
            }}
          >
            Virtual<br />Model<br />Studio
          </h1>

          <motion.p
            style={{
              marginTop: 'var(--space-md)',
              fontSize: '1rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#ffffff', // Set text color to white
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}
          >
            Scroll to Enter
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}
