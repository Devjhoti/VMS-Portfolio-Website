import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { useRef } from 'react';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // The Kinetic Flythrough - Optimized for performance
  // Adjusted for shorter scroll track - completes scale as user scrolls down
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 12]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 0.8], [1, 1, 0]);
  const blurValue = useTransform(scrollYProgress, [0.6, 0.8], ["0px", "10px"]);
  const filter = useMotionTemplate`blur(${blurValue})`;
  // Use visibility hidden instead of display none to prevent layout thrashing, 
  // and toggle it safely after opacity triggers.
  const display = useTransform(scrollYProgress, (pos) => pos >= 0.85 ? "none" : "flex");

  return (
    <motion.section
      ref={ref}
      style={{
        height: '130vh', // Reduced scroll track for faster transition
        position: 'relative',
        zIndex: 0, // Lower z-index to allow next section to cover
        background: 'transparent'
      }}
    >
      <div style={{
        position: 'fixed', // Changed from sticky to fixed
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: -1 // Behind content
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
          <source src="https://res.cloudinary.com/dxez9kmnn/video/upload/q_auto,f_auto/v1770965997/Vms_Website_Banner_f9jkso.mp4" type="video/mp4" />
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
            filter,
            display,
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative', // Ensure it's on top
            zIndex: 2,
            willChange: 'transform, opacity'
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
