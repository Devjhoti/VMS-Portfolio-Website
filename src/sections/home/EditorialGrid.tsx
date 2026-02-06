import { RevealOnScroll } from '../../components/ui/RevealOnScroll';
import { VideoEmbed } from '../../components/video/VideoEmbed';

const items = [
  { label: 'Project A', caption: 'Brand X — One line description' },
  { label: 'Project B', caption: 'Brand Y — One line description' },
  { label: 'Project C', caption: 'Brand Z — One line description' },
  { label: 'Project D', caption: 'Brand W — One line description' },
];

export function EditorialGrid() {
  return (
    <section
      style={{
        minHeight: '110vh',
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
          Editorial
        </h2>
      </RevealOnScroll>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--space-lg)',
        }}
      >
        {items.map((item, i) => (
          <RevealOnScroll key={i} stagger={i * 120}>
            <div style={{ transition: 'transform var(--transition-hover)' }}>
              <VideoEmbed placeholderLabel={item.label} aspectRatio="16/10" />
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
      </div>
    </section>
  );
}
