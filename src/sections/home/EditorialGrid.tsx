import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VideoPlayer } from '../../components/VideoPlayer';
import { editorialVideos } from '../../data/videos';

export function EditorialGrid() {
  const containerRef = useRef(null);
  // INCREASE HEIGHT: 200vh per video for a very slow, deliberate pace
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      ref={containerRef}
      style={{
        height: `${editorialVideos.length * 200}vh`,
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
            color: 'var(--color-text-primary)', // ensure visibility on any bg
            textShadow: '0 2px 20px rgba(0,0,0,0.2)'
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
  const slotSize = 1 / total;
  const start = index * slotSize;
  const end = (index + 1) * slotSize;

  // Fade out only during the last 20% of the item's scroll slot
  const fadeOutStart = end - (slotSize * 0.2);

  // 1. Opacity: Enter at 100%, Stay 100%, Fade out at very end
  const opacity = useTransform(
    progress,
    [start, fadeOutStart, end],
    [1, 1, 0]
  );

  const isLeft = index % 2 === 0;

  // 2. Motion: Enter -> Hold -> Stay
  // Moves from side to center in first 20% of slot
  const motionEnd = start + (slotSize * 0.2);

  const videoX = useTransform(
    progress,
    [start, motionEnd, end],
    [isLeft ? "-100vw" : "100vw", "0vw", "0vw"]
  );

  const textX = useTransform(
    progress,
    [start, motionEnd, end],
    [isLeft ? "100vw" : "-100vw", "0vw", "0vw"]
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
        pointerEvents: 'none', // Pass-through for scrolling
        zIndex: index // Ensure stacking order
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isLeft ? 'row' : 'row-reverse',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4rem',
          width: '100%',
          maxWidth: '1600px',
          padding: '0 5vw'
        }}
      >
        {/* VIDEO */}
        <motion.div style={{
          flex: 1,
          height: '60vh',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
          borderRadius: '4px',
          overflow: 'hidden',
          background: '#000',
          x: videoX,
          pointerEvents: 'auto' // Re-enable interaction
        }}>
          <VideoPlayer
            src={video.src}
            title={video.title}
          />
        </motion.div>

        {/* TEXT */}
        <motion.div style={{
          flex: 1,
          textAlign: isLeft ? 'left' : 'right',
          x: textX,
          pointerEvents: 'auto' // Re-enable interaction
        }}>
          <h3 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            margin: 0,
            marginBottom: '1rem',
            lineHeight: 1
          }}>{video.title}</h3>

          <p style={{
            fontSize: '1rem',
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-family-mono)',
            maxWidth: '40ch',
            marginLeft: isLeft ? 0 : 'auto'
          }}>
            {video.caption}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
