import type { ReactNode } from 'react';
import { Children } from 'react';

const masonryItemStyle: React.CSSProperties = {
  breakInside: 'avoid',
  marginBottom: 'var(--space-lg)',
};

interface MasonryGalleryProps {
  children: ReactNode;
}

export function MasonryGallery({ children }: MasonryGalleryProps) {
  return (
    <div className="masonry-gallery">
      {Children.map(children, (child) => (
        <div style={masonryItemStyle}>{child}</div>
      ))}
    </div>
  );
}
