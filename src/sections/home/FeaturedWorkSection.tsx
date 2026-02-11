import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { VideoPlayer } from '../../components/VideoPlayer';
import { featuredWorkVideos } from '../../data/videos';

export function FeaturedWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection - kept only for sizing adjustments
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]); // Increased travel for mobile width?
  // Smooth out the scroll physics
  const smoothX = useSpring(x, { damping: 15, stiffness: 100 });

  return (
    <section
      ref={containerRef}
      style={{
        height: '400vh', // Very long scroll track
        position: 'relative',
        zIndex: 5
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--color-bg-primary)',
        display: 'flex',
        alignItems: 'center'
      }}>
        <motion.div style={{
          display: 'flex',
          gap: isMobile ? '10vw' : '5vw',
          paddingLeft: isMobile ? '5vw' : '10vw',
          x: smoothX
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
            <Carousel3DCard key={video.id} video={video} isMobile={isMobile} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Carousel3DCard({ video, isMobile }: { video: any, isMobile: boolean }) {
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
        justifyContent: 'center'
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
