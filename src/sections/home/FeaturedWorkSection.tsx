import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { VideoPlayer } from '../../components/VideoPlayer';
import { featuredWorkVideos } from '../../data/videos';
import { ArrowRight } from 'lucide-react';

export function FeaturedWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollRange, setScrollRange] = useState(0);

  // Measure content for perfect scroll stopping (no endless blank space)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    const calculateRange = () => {
      if (scrollRef.current) {
        setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
      }
    };
    // Calculate initial and on resize
    calculateRange();
    // Allow images/fonts to load then recalculate to be safe
    const timeout = setTimeout(calculateRange, 500);

    window.addEventListener('resize', () => {
      checkMobile();
      calculateRange();
    });

    return () => {
      window.removeEventListener('resize', () => { });
      clearTimeout(timeout);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  // Smooth out the scroll physics
  const smoothX = useSpring(rawX, { damping: 15, stiffness: 100 });

  // Fade overlay (starts transparent over default bg, fades to black)
  const fadeOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  // Fade out the video cards so they vanish behind when the final CTA sits into place
  const desktopVideosOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0.05]);

  return (
    <section
      ref={containerRef}
      style={{
        height: isMobile ? '600vh' : '400vh', // Longer scroll track on mobile to allow more comfortable viewing
        position: 'relative',
        zIndex: 5
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--color-bg-primary)', // Default background
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Animated Feature Background Overlay (Fades to black at end) */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'black',
            opacity: fadeOpacity,
            zIndex: 0
          }}
        />

        {/* Scroll Track */}
        <motion.div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: isMobile ? '10vw' : '5vw',
            paddingLeft: isMobile ? '5vw' : '10vw',
            x: smoothX,
            width: 'max-content',
            zIndex: 1
          }}>
          <div style={{
            flexShrink: 0,
            width: isMobile ? '80vw' : '25vw', // Use full width intro for mobile
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <h2
              style={{
                fontSize: 'clamp(3rem, 5vw, 4rem)',
                fontWeight: 'var(--font-weight-light)',
                letterSpacing: 'var(--letter-spacing-tight)',
                lineHeight: 1,
                margin: 0
              }}
            >
              Featured<br />
              <span style={{ fontFamily: 'var(--font-family-serif)', fontStyle: 'italic' }}>Work</span>
            </h2>
          </div>

          {featuredWorkVideos.map((video) => (
            <Carousel3DCard key={video.id} video={video} isMobile={isMobile} opacity={isMobile ? 1 : desktopVideosOpacity} />
          ))}

          {/* FINAL END STATE: CTA + TEXT */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '10vw' : '3vw',
            paddingRight: isMobile ? '10vw' : '10vw' // Buffer before screen ends
          }}>
            <EndCTACard isMobile={isMobile} />

            {/* The accompanying text aligned right in the remaining space */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: isMobile ? 'center' : 'flex-end',
              textAlign: isMobile ? 'center' : 'right',
              width: isMobile ? '80vw' : 'auto', // Takes full screen space natively on mobile
              marginLeft: isMobile ? '0' : '2vw'
            }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 10vw, 6rem)', // Reduced responsive text size for mobile layout to prevent overlap
                fontWeight: 800,
                margin: 0,
                color: 'transparent',
                WebkitTextStroke: isMobile ? '1px rgba(255,255,255,0.7)' : '2px rgba(255,255,255,0.7)', // Thinner stroke on tiny screens
                fontFamily: 'var(--font-family-base)',
                lineHeight: 1.05,
                textTransform: 'uppercase',
                whiteSpace: isMobile ? 'normal' : 'nowrap', // Allow wrap on mobile
                letterSpacing: '-0.02em',
              }}>
                Let's shape<br />your<br />imagination.
              </h2>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EndCTACard({ isMobile }: { isMobile: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt properties
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const rotateX = useTransform(mouseY, [0, 1], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 1], [-10, 10]);

  const glareX = useTransform(mouseX, [0, 1], [-20, 120]);
  const glareY = useTransform(mouseY, [0, 1], [-20, 120]);
  const background = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <div
      style={{
        width: isMobile ? '80vw' : '40vw',
        height: '60vh',
        flexShrink: 0,
        position: 'relative',
        perspective: '1200px', // Creates the 3D space
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0.5);
        y.set(0.5);
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)',
          transformStyle: 'preserve-3d',
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transition: isHovered ? 'none' : 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)', // Snaps back smoothly
          boxShadow: isHovered ? '0 30px 60px rgba(0,0,0,0.6)' : '0 20px 40px rgba(0,0,0,0.4)',
        }}
      >
        {/* Cinematic Video Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '12px',
          overflow: 'hidden',
          zIndex: -2,
          background: '#000'
        }}>
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            src="https://res.cloudinary.com/dxez9kmnn/video/upload/v1770965997/Vms_Website_Banner_f9jkso.mp4"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          {/* Glassmorphism Blur Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5, 5, 5, 0.65)',
            opacity: isHovered ? 0.8 : 1, // Full opacity for the dark glass effect, lightening slightly on hover
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            transition: 'all 0.8s easeOut',
            zIndex: 1
          }} />
        </div>

        {/* Tactile Glass Glare Layer */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background,
            borderRadius: '12px',
            overflow: 'hidden',
            zIndex: -1,
            pointerEvents: 'none',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s easeOut'
          }}
        />

        {/* Popping Text Layer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          padding: isMobile ? '2rem' : '4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transform: isHovered ? 'translateZ(50px)' : 'translateZ(0px)',
          transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          pointerEvents: 'none', // Allow mouse events to pass to the card
        }}
        >
          <h3 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: '700',
            lineHeight: 1.1,
            margin: '0 0 1rem 0',
            fontFamily: 'var(--font-family-base)',
            letterSpacing: '-0.02em',
            color: '#ffffff',
            textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.6)'
          }}>
            Ready to elevate<br />your brand?
          </h3>
          <p style={{
            color: '#f0f0f0',
            fontSize: '1.1rem',
            fontWeight: '400',
            marginBottom: '2.5rem',
            maxWidth: '430px',
            lineHeight: 1.6,
            textShadow: '0 2px 10px rgba(0,0,0,0.9)'
          }}>
            Let's collaborate to craft a visual narrative that transcends the ordinary and captivates your audience.
          </p>

          <div style={{ pointerEvents: 'auto' }}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2.5rem',
                background: 'white',
                color: 'black',
                textDecoration: 'none',
                borderRadius: '100px',
                fontWeight: 600, // Stronger weight for sans-serif
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 25px rgba(255,255,255,0.4)';
                e.currentTarget.style.transform = 'translateY(-2px) translateZ(10px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                e.currentTarget.style.transform = 'translateY(0) translateZ(0) scale(1)';
              }}
            >
              Let's Talk
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Carousel3DCard({ video, isMobile, opacity }: { video: any, isMobile: boolean, opacity?: any }) {
  return (
    <motion.div
      style={{
        width: isMobile ? '80vw' : (video.isSquare ? '50vh' : '45vw'), // Use vh for square to ensure it fits vertically
        height: '60vh',
        flexShrink: 0,
        position: 'relative',
        perspective: '1000px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: opacity || 1 // Apply fade
      }}
    >
      <motion.div
        style={{
          width: '100%',
          aspectRatio: video.isSquare ? '1/1' : '16/9',
          overflow: 'hidden',
          borderRadius: '4px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          background: '#000',
          position: 'relative' // Anchor for absolute video
        }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Force video to fill square container */}
        <VideoPlayer
          src={video.src}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover' // Zooms to fill square
          }}
        />
      </motion.div>

      <div style={{
        marginTop: '1.5rem',
      }}>
        <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 500 }}>{video.title}</h3>
        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{video.caption}</span>
      </div>
    </motion.div>
  )
}
