import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { VideoPlayer } from '../../components/VideoPlayer';
import { featuredWorkVideos } from '../../data/videos';

export function FeaturedWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
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

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  // Smooth out the scroll physics
  const smoothX = useSpring(x, { damping: 15, stiffness: 100 });

  if (isMobile) {
    return (
      <section id="work" style={{ padding: 'var(--section-padding-y) var(--side-margin)' }}>
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h2
            style={{
              fontSize: '3rem',
              fontWeight: 'var(--font-weight-light)',
              lineHeight: 1,
              margin: 0
            }}
          >
            Featured<br />
            <span style={{ fontFamily: 'var(--font-family-serif)', fontStyle: 'italic' }}>Work</span>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
          {featuredWorkVideos.map((video) => (
            <div key={video.id}>
              <div style={{ borderRadius: '4px', overflow: 'hidden' }}>
                <VideoPlayer src={video.src} title={video.title} />
              </div>
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{video.title}</h3>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>{video.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

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
          gap: '5vw', // Increased gap
          paddingLeft: '10vw',
          x: smoothX
        }}>
          <div style={{
            flexShrink: 0,
            width: '25vw', // Reduced title width
            display: 'flex',
            alignItems: 'center'
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

          {featuredWorkVideos.map((video, idx) => (
            <Carousel3DCard key={video.id} video={video} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Carousel3DCard({ video, index }: { video: any, index: number }) {
  return (
    <motion.div
      style={{
        width: '45vw', // Reduced from 60vw to be less overwhelming
        height: '60vh', // Reduced height to fit UI better
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
          aspectRatio: '1/1', // STRICTLY SQUARE
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
          title={video.title}
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
