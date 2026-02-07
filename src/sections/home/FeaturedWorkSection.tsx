import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { VideoPlayer } from '../../components/VideoPlayer';
import { featuredWorkVideos } from '../../data/videos';

export function FeaturedWorkSection() {
  return (
    <section id="work" style={{ position: 'relative', marginTop: 'var(--space-2xl)' }}>
      <div style={{
        padding: 'var(--section-padding-y) var(--side-margin)',
        maxWidth: 'var(--content-max-width)',
        margin: '0 auto',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            style={{
              fontSize: 'var(--font-section-title)',
              fontWeight: 'var(--font-weight-light)',
              marginBottom: 'var(--space-xl)',
              letterSpacing: 'var(--letter-spacing-tight)',
            }}
          >
            Featured Work
          </h2>
          <p style={{
            fontSize: 'var(--font-body)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-2xl)',
            marginTop: '-var(--space-md)',
            maxWidth: '40ch',
            lineHeight: 'var(--line-height-loose)',
          }}>
            A curation of neural cinematography and generative visual effects.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
          {featuredWorkVideos.map((video, idx) => (
            <ParallaxProjectCard key={video.id} video={video} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ParallaxProjectCard({ video, index }: { video: any, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effect: image moves slightly slower/faster than container
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        opacity,
        scale,
        y
      }}
    >
      <div style={{ overflow: 'hidden', borderRadius: '4px' }}>
        <VideoPlayer src={video.src} title={video.title} />
      </div>
      <div style={{
        marginTop: 'var(--space-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '500',
          margin: 0
        }}>{video.title}</h3>
        <span style={{
          fontSize: 'var(--font-caption)',
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-family-mono)'
        }}>{video.caption}</span>
      </div>
    </motion.div>
  )
}
