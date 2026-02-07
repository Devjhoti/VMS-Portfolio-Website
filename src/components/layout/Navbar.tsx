import { useState, useEffect } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `var(--space-md) var(--side-margin)`,
        maxWidth: 'var(--content-max-width)',
        margin: '0 auto',
        transition: 'all var(--transition-hover)',
        background: scrolled ? 'rgba(29, 38, 61, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <a href="/" style={{ textDecoration: 'none', color: 'inherit', letterSpacing: 'var(--letter-spacing-wide)' }}>
        VM
      </a>
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          gap: 'var(--space-xl)',
          letterSpacing: 'var(--letter-spacing-wide)',
          fontWeight: 'var(--font-weight-light)',
        }}
      >
        <li><a href="#work" style={{ color: scrolled ? 'var(--color-silver)' : 'var(--color-text-primary)' }}>Work</a></li>
        <li><a href="#about" style={{ color: scrolled ? 'var(--color-silver)' : 'var(--color-text-primary)' }}>About</a></li>
        <li><a href="#contact" style={{ color: scrolled ? 'var(--color-silver)' : 'var(--color-text-primary)' }}>Contact</a></li>
      </ul>
    </nav>
  );
}
