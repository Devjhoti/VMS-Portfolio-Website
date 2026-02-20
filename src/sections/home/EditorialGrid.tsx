import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { VideoPlayer } from '../../components/VideoPlayer';
import { editorialVideos, featuredWorkVideos } from '../../data/videos';

// Combine all videos for the "See More" overlay
const allVideos = [...editorialVideos, ...featuredWorkVideos];

export function EditorialGrid() {
  const containerRef = useRef(null);
  const [showGrid, setShowGrid] = useState(false);
  // Default to desktop count, update on mount
  const [visibleCount, setVisibleCount] = useState(10);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const handleOpen = () => setShowGrid(true);

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile
        setVisibleCount(6);
        setColumns(1);
      } else if (width < 1024) {
        // Tablet
        setVisibleCount(10);
        setColumns(2);
      } else {
        // Desktop
        setVisibleCount(10);
        setColumns(3);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('open-work-grid', handleOpen);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('open-work-grid', handleOpen);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const visibleVideos = useMemo(() => editorialVideos.slice(0, visibleCount), [visibleCount]);

  // Navbar Interaction Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    // Monitor scroll to trigger navbar glass effect
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // If we are INSIDE the grid (0 to 1), trigger glass
      // If we are OUTSIDE ( < 0 or > 1), remove glass
      if (latest > 0 && latest < 1) {
        window.dispatchEvent(new Event('enter-editorial-glass'));
      } else {
        window.dispatchEvent(new Event('leave-editorial-glass'));
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      <section
        id="editorial"
        ref={containerRef}
        style={{
          position: 'relative',
          background: 'var(--color-bg-primary)',
          padding: 'var(--section-padding-y) 0',
          marginBottom: 'var(--section-spacer)'
        }}
      >
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 var(--side-margin)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-xl)'
        }}>

          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
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

          {/* Main Masonry Grid */}
          <MasonryGrid videos={visibleVideos} columns={columns} />

          {/* See More Button */}
          <div style={{ position: 'relative', height: '100px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 'var(--space-lg)' }}>
            <SeeMoreButton onClick={() => setShowGrid(true)} />
          </div>

        </div>
      </section>

      {/* Cinematic Grid Overlay */}
      <AnimatePresence>
        {showGrid && <VideoGridOverlay videos={allVideos} onClose={() => setShowGrid(false)} />}
      </AnimatePresence>
    </>
  );
}

function MasonryGrid({ videos, columns }: { videos: any[], columns: number }) {
  const isMobile = columns === 1;

  // Smart Masonry Layout: distribute to shortest column to minimize whitespace
  const gridColumns = useMemo(() => {
    if (columns === 1) return [videos]; // Mobile: just one column

    // Initialize columns with empty arrays and height counter
    const cols = Array.from({ length: columns }, () => ({
      items: [] as any[],
      height: 0
    }));

    videos.forEach((video) => {
      // Estimate height unit based on aspect ratio
      // 1.0 = Square, 1.6 = Vertical (Safety buffer for 9:16), 0.6 = Wide
      let heightUnit = 0.6;
      if (video.isSquare) heightUnit = 1.0;
      else if (video.isVertical) heightUnit = 1.6;

      // Find the column with the minimum current height
      let minHeightIndex = 0;
      let minHeight = cols[0].height;

      for (let i = 1; i < columns; i++) {
        if (cols[i].height < minHeight) {
          minHeight = cols[i].height;
          minHeightIndex = i;
        }
      }

      // Add video to shortest column
      cols[minHeightIndex].items.push(video);
      cols[minHeightIndex].height += heightUnit;
    });

    return cols.map(c => c.items);
  }, [videos, columns]);

  return (
    <div style={{
      display: 'flex',
      gap: 'var(--space-md)',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      {gridColumns.map((colVideos, colIndex) => (
        <div key={colIndex} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', flex: 1 }}>
          {colVideos.map((video: any, index: number) => (
            <GridCard
              key={video.id + index}
              video={video}
              index={index}
              colIndex={colIndex}
              isMobile={isMobile}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function GridCard({ video, index, colIndex, isMobile }: { video: any, index: number, colIndex?: number, isMobile?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9 }} // Reduced distance for faster feel
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{
        type: "spring",
        stiffness: isMobile ? 120 : 80,  // Stiffer/Faster on mobile
        damping: isMobile ? 20 : 15,     // Less bounce on mobile for speed
        mass: 1,
        // Prevent infinite delay accumulation. Reset delay every 4 items.
        // On mobile, just a tiny stagger or none, since scroll does the job.
        delay: isMobile
          ? 0.05
          : (index % 4) * 0.1 + (colIndex ? colIndex * 0.05 : 0)
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'pointer',
        transformOrigin: 'center bottom'
      }}
    >
      <div style={{
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        // Removed fixed aspectRatio to let video define its own shape
        background: '#000',
        position: 'relative'
      }}>
        <VideoPlayer
          src={video.src}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* Hover Overlay Gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />
      </div>

      <div>
        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>{video.title}</h4>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{video.caption}</p>
      </div>
    </motion.div>
  )
}


function SeeMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: 'var(--color-text-primary)',
        color: 'var(--color-bg-primary)',
        border: 'none',
        padding: '1rem 2.5rem',
        borderRadius: '50px',
        fontSize: '1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        fontFamily: 'var(--font-family-sans)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: 500
      }}
    >
      <span>See More Work</span>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </motion.svg>
    </motion.button>
  )
}


function VideoGridOverlay({ videos, onClose }: { videos: any[], onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);
  const { scrollY } = useScroll({ container: containerRef });

  useEffect(() => {
    // Notify Navbar that we are in Overlay Mode
    window.dispatchEvent(new Event('overlay-opened'));

    // Scroll Lock
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    // Monitor overlay scroll for navbar glass effect
    const unsubscribe = scrollY.on("change", (latest) => {
      // If we scroll down a bit in the overlay, trigger glass
      if (latest > 50) {
        window.dispatchEvent(new Event('enter-editorial-glass'));
      } else {
        window.dispatchEvent(new Event('leave-editorial-glass'));
      }
    });

    // Listen for Close Trigger from Navbar
    const handleCloseTrigger = () => onClose();
    window.addEventListener('trigger-overlay-close', handleCloseTrigger);

    // Reset when overlay closes
    return () => {
      window.dispatchEvent(new Event('overlay-closed'));
      document.body.style.overflow = originalStyle;
      unsubscribe();
      window.dispatchEvent(new Event('leave-editorial-glass'));
      window.removeEventListener('trigger-overlay-close', handleCloseTrigger);
    };
  }, [scrollY, onClose]);

  useEffect(() => {
    const checkColumns = () => {
      if (window.innerWidth < 768) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };
    checkColumns();
    window.addEventListener('resize', checkColumns);
    return () => window.removeEventListener('resize', checkColumns);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,0.98)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'var(--space-xl)' // Space for navbar
      }}
    >
      <div style={{
        padding: '0 var(--side-margin) 10vh',
        maxWidth: '1600px',
        margin: '0 auto',
        width: '100%'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: '3rem',
          marginTop: 0,
          textAlign: 'center',
          fontWeight: 300
        }}>All Works</h2>

        <MasonryGrid videos={videos} columns={columns} />
      </div>

    </motion.div>
  );
}
