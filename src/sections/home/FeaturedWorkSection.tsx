import { RevealOnScroll } from '../../components/ui/RevealOnScroll';
import { VideoPlayer } from '../../components/VideoPlayer';
import { MasonryGallery } from '../../components/MasonryGallery';
import { featuredWorkVideos } from '../../data/videos';

export function FeaturedWorkSection() {
  return (
    <section
      id="work"
      style={{
        minHeight: '120vh',
        padding: 'var(--section-padding-y) var(--side-margin)',
        maxWidth: 'var(--content-max-width)',
        margin: '0 auto',
      }}
    >
      <RevealOnScroll>
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
      </RevealOnScroll>

      <MasonryGallery>
        {featuredWorkVideos.map((item, i) => (
          <RevealOnScroll key={item.id} stagger={i * 120}>
            <div
              style={{
                transition: 'transform var(--transition-hover)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <VideoPlayer src={item.src} title={item.title} />
              <p
                style={{
                  marginTop: 'var(--space-sm)',
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--font-caption)',
                }}
              >
                {item.caption}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </MasonryGallery>
    </section>
  );
}
