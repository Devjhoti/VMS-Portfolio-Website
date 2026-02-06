import { useRef, useState, useEffect } from 'react';

interface VideoEmbedProps {
  placeholderLabel?: string;
  src?: string;
  aspectRatio?: string;
}

export function VideoEmbed({ placeholderLabel = 'Video', src, aspectRatio = '16/9' }: VideoEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        aspectRatio,
        background: 'var(--color-bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'transform var(--transition-hover)',
      }}
    >
      {inView && src ? (
        <div style={{ width: '100%', height: '100%' }}>
          {/* Placeholder for embed - wire src when available */}
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--color-bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-muted)',
              fontSize: 'var(--font-caption)',
            }}
          >
            [Embed: {src}]
          </div>
        </div>
      ) : (
        <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-caption)' }}>
          {placeholderLabel}
        </span>
      )}
    </div>
  );
}
