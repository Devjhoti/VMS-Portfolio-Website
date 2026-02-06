import type { ReactNode } from 'react';

interface CinematicBreakProps {
  children: ReactNode;
}

export function CinematicBreak({ children }: CinematicBreakProps) {
  return (
    <div
      style={{
        minHeight: '80vh',
        background: 'var(--color-navy-base)',
        color: 'var(--color-silver)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: 'var(--section-padding-y) var(--side-margin)',
      }}
    >
      {/* Placeholder for large VM monogram bg element */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          background: 'radial-gradient(circle at center, currentColor 0%, transparent 70%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
