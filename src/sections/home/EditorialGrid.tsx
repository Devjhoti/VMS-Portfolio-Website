import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VideoPlayer } from '../../components/VideoPlayer';
import { editorialVideos } from '../../data/videos';

export function EditorialGrid() {
  const containerRef = useRef(null);
  // This section needs to be TALL to allow for individual moments
  // 6 videos * 100vh = 600vh minimum to give each time to breathe
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      ref={containerRef}
      style={{
        height: `${editorialVideos.length * 100}vh`,
        position: 'relative',
        background: 'var(--color-bg-primary)'
      }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '5vh',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 'var(--font-weight-light)',
            letterSpacing: 'var(--letter-spacing-tight)',
            mixBlendMode: 'difference', // Cool effect against videos
            color: 'white'
          }}>
            Editorial Series
          </h2>
        </div>

        {editorialVideos.map((video, i) => (
          <ZigZagItem
            key={video.id}
            video={video}
            index={i}
            total={editorialVideos.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

function ZigZagItem({ video, index, total, progress }: any) {
  // Determine the active window for this specific item
  // e.g., if total=5, item 0 is active from 0 to 0.2
  const start = index / total;
  const end = (index + 1) / total;
  const fadeWindow = 0.05; // Quick fade in/out

  // Visibility: fade in at start, fade out at end
  const opacity = useTransform(
    progress,
    [start, start + fadeWindow, end - fadeWindow, end],
    [0, 1, 1, 0]
  );

  // Determines side: Even = Left, Odd = Right
  const isLeft = index % 2 === 0;

  // Movement Logic
  // Enter: Slide in from side (X: -100% or 100% -> 0)
  // Exit: Slide out to opposite side or just fade (Let's stick for a moment then move)
  const xEntry = useTransform(
    progress,
    [start, start + 0.1],
    [isLeft ? "-100%" : "100%", "0%"]
  );

  // Text Logic: Flies in slightly AFTER video
  const textXEntry = useTransform(
    progress,
    [start + 0.05, start + 0.15],
    [isLeft ? "100%" : "-100%", "0%"]
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        pointerEvents: 'none' // allow click through if needed
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: isLeft ? 'row' : 'row-reverse', // Flip layout based on index
        alignItems: 'center',
        gap: '8vw',
        width: '80%',
        maxWidth: '1400px'
      }}>
        {/* VIDEO BLOCK */}
        <motion.div style={{
          flex: '1 1 60%',
          x: xEntry,
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{ aspectRatio: '16/9' }}>
            <VideoPlayer src={video.src} title={video.title} />
          </div>
        </motion.div>

        {/* TEXT BLOCK */}
        <motion.div style={{
          flex: '1 1 30%',
          x: textXEntry,
          textAlign: isLeft ? 'left' : 'right'
        }}>
          <h3 style={{
            fontSize: '3rem',
            margin: 0,
            marginBottom: '1rem',
            lineHeight: 1
          }}>{video.title}</h3>

          <p style={{
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-family-mono)',
            maxWidth: '30ch',
            marginLeft: isLeft ? 0 : 'auto'
          }}>
            {video.caption}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
