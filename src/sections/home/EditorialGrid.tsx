import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { VideoPlayer } from '../../components/VideoPlayer';
import { editorialVideos } from '../../data/videos';

// Limit initial view to 4 videos
const INITIAL_COUNT = 4;
const visibleVideos = editorialVideos.slice(0, INITIAL_COUNT);

export function EditorialGrid() {
  const containerRef = useRef(null);
  const [showGrid, setShowGrid] = useState(false);

  // Height strictly for the 4 items
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <>
      <section
        ref={containerRef}
        style={{
          //Height for 4 videos + extra space for the button
          height: `${visibleVideos.length * 200}vh`,
          position: 'relative',
          background: 'var(--color-bg-primary)'
        }}
      >
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: '7vh',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 10
          }}>
            <h2 style={{
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              fontWeight: 'var(--font-weight-light)',
              letterSpacing: 'var(--letter-spacing-tight)',
              color: 'var(--color-text-primary)',
              lineHeight: 1,
              textShadow: '0 2px 20px rgba(0,0,0,0.1)'
            }}>
              Editorial <span style={{ fontFamily: 'var(--font-family-serif)', fontStyle: 'italic' }}>Series</span>
            </h2>
          </div>

          {visibleVideos.map((video, i) => (
            <ZigZagItem
              key={video.id}
              video={video}
              index={i}
              total={visibleVideos.length} // important for calculating slots correctly
              progress={scrollYProgress}
            />
          ))}

          {/* See More Button - Appears at the very end */}
          <SeeMoreButton progress={scrollYProgress} onClick={() => setShowGrid(true)} />
        </div>
      </section>

      {/* Cinematic Grid Overlay */}
      <AnimatePresence>
        {showGrid && <VideoGridOverlay onClose={() => setShowGrid(false)} />}
      </AnimatePresence>
    </>
  );
}

function SeeMoreButton({ progress, onClick }: { progress: any, onClick: () => void }) {
  // Show button only at the very end of the scroll (last 5%)
  const opacity = useTransform(progress, [0.95, 1], [0, 1]);
  const scale = useTransform(progress, [0.95, 1], [0.8, 1]);
  const y = useTransform(progress, [0.95, 1], [50, 0]);
  const pointerEvents = useTransform(progress, (v: number) => v > 0.95 ? 'auto' : 'none');

  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: '10vh',
        left: '50%',
        x: '-50%',
        zIndex: 50,
        opacity,
        scale,
        y,
        pointerEvents
      }}
    >
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        style={{
          background: 'var(--color-text-primary)',
          color: 'var(--color-bg-primary)',
          border: 'none',
          padding: '1.2rem 2.5rem',
          borderRadius: '50px',
          fontSize: '1.1rem',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          // Glassmorphism feel
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          fontFamily: 'var(--font-family-sans)'
        }}
      >
        <span style={{ fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem' }}>See More</span>
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </motion.svg>
      </motion.button>
    </motion.div>
  )
}


function VideoGridOverlay({ onClose }: { onClose: () => void }) {
  // Masonry Layout Logic: Split videos into 3 columns (for desktop)
  const columns = [[], [], []] as any[];
  editorialVideos.forEach((video, i) => {
    columns[i % 3].push(video);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100, // Top of everything
        background: 'rgba(255,255,255,0.98)',
        overflowY: 'auto', // Scrollable grid
        padding: '10vh 5vw'
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          gap: '2rem',
          maxWidth: '1600px',
          margin: '0 auto',
          justifyContent: 'center'
        }}
      >
        {/* Render 3 Columns for Masonry Effect */}
        {columns.map((colVideos, colIndex) => (
          <div key={colIndex} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1 }}>
            {colVideos.map((video: any, index: number) => (
              <GridCard key={video.id} video={video} index={index + (colIndex * 5)} />
            ))}
          </div>
        ))}
      </motion.div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '4rem 0' }}>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'transparent',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-text-primary)',
            padding: '1rem 3rem',
            borderRadius: '50px',
            fontSize: '1rem',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          Close Gallery
        </motion.button>
      </div>
    </motion.div>
  );
}

function GridCard({ video, index }: { video: any, index: number }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: index * 0.1
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      <div style={{
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        // Masonry items don't strictly need aspectRatio if content defines it, 
        // but we'll use 16/9 or vertical based on data to let them stack naturally
        aspectRatio: video.isVertical ? '4/5' : '16/9',
        background: '#000',
        position: 'relative'
      }}>
        <VideoPlayer
          src={video.src}
          style={{ objectFit: 'contain', height: '100%', width: '100%' }}
        />
      </div>
      <div>
        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{video.title}</h4>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{video.caption}</p>
      </div>
    </motion.div>
  )
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
        zIndex: index, // Ensure stacking order
        paddingTop: '15vh' // Push content down to clear the headline
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
          height: video.isVertical ? '70vh' : '65vh', // Reduced vertical height to safely clear headline
          borderRadius: '4px',
          overflow: 'hidden',
          // Removed black background and box shadow to look cleaner with 'contain'
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          x: videoX,
          pointerEvents: 'auto'
        }}>
          <VideoPlayer
            src={video.src}
            style={{
              objectFit: 'contain', // SHOW FULL VIDEO
              background: 'transparent',
              // For vertical videos, we might want to ensure they don't get too wide?
              // But 'contain' handles that. 'height' is the constraint.
              maxHeight: '100%'
            }}
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
