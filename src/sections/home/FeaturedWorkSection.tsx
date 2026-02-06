import { RevealOnScroll } from '../../components/ui/RevealOnScroll';
import { VideoEmbed } from '../../components/video/VideoEmbed';

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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gridTemplateRows: 'auto auto',
          gap: 'var(--space-lg)',
        }}
      >
        <RevealOnScroll stagger={0}>
          <div
            style={{
              gridRow: '1 / -1',
              transition: 'transform var(--transition-hover)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <VideoEmbed placeholderLabel="Hero project" aspectRatio="16/9" />
            <p style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-muted)', fontSize: 'var(--font-caption)' }}>
              Hero project — Brand name
            </p>
          </div>
        </RevealOnScroll>
        <RevealOnScroll stagger={120}>
          <div
            style={{ transition: 'transform var(--transition-hover)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <VideoEmbed placeholderLabel="Secondary 1" aspectRatio="4/3" />
            <p style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-muted)', fontSize: 'var(--font-caption)' }}>
              Secondary project 1
            </p>
          </div>
        </RevealOnScroll>
        <RevealOnScroll stagger={180}>
          <div
            style={{ transition: 'transform var(--transition-hover)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <VideoEmbed placeholderLabel="Secondary 2" aspectRatio="4/3" />
            <p style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-muted)', fontSize: 'var(--font-caption)' }}>
              Secondary project 2
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
