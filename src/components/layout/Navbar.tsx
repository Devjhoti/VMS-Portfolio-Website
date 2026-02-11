import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', checkMobile);

    // Initial check
    checkMobile();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
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
          padding: isMobile
            ? `var(--space-sm) var(--side-margin)` // 1rem padding on mobile (reduced from 2rem)
            : `var(--space-md) var(--side-margin)`,
          maxWidth: 'var(--content-max-width)',
          margin: '0 auto',
          transition: 'all var(--transition-hover)',
          background: scrolled || isMenuOpen ? 'rgba(29, 38, 61, 0.95)' : 'transparent',
          backdropFilter: scrolled || isMenuOpen ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled || isMenuOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <a href="/" style={{ textDecoration: 'none', color: scrolled || isMenuOpen ? 'var(--color-silver)' : 'var(--color-text-primary)', display: 'flex', flexDirection: 'column', lineHeight: 1, position: 'relative', zIndex: 101 }}>
          <span style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>Virtual Model</span>
          <span style={{ fontSize: '1rem', fontFamily: 'var(--font-family-serif)', fontStyle: 'italic', opacity: 0.8 }}>Studio</span>
        </a>

        {/* Desktop Menu */}
        {!isMobile && (
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
            {['Work', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="nav-link"
                  style={{ color: scrolled ? 'var(--color-silver)' : 'var(--color-text-primary)' }}
                  onClick={(e) => {
                    if (item === 'Work') {
                      e.preventDefault();
                      window.dispatchEvent(new Event('open-work-grid'));
                      document.getElementById('editorial')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Mobile Hamburger Icon */}
        {isMobile && (
          <button
            onClick={toggleMenu}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
              position: 'relative',
              zIndex: 101, // Above overlay
              color: scrolled || isMenuOpen ? 'var(--color-silver)' : 'var(--color-text-primary)'
            }}
            aria-label="Toggle menu"
          >
            <div style={{ width: '24px', height: '2px', background: 'currentColor', marginBottom: '6px', transition: '0.3s', transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }} />
            <div style={{ width: '24px', height: '2px', background: 'currentColor', marginBottom: '6px', transition: '0.3s', opacity: isMenuOpen ? 0 : 1 }} />
            <div style={{ width: '24px', height: '2px', background: 'currentColor', transition: '0.3s', transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }} />
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(29, 38, 61, 0.98)',
              backdropFilter: 'blur(16px)',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '60px'
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {['Work', 'About', 'Contact'].map((item) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={toggleMenu}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    style={{
                      fontSize: '2.5rem',
                      color: 'var(--color-silver)',
                      textDecoration: 'none',
                      fontWeight: '300',
                      fontFamily: 'var(--font-family-serif)',
                      fontStyle: 'italic'
                    }}
                    onClick={(e) => {
                      if (item === 'Work') {
                        e.preventDefault();
                        window.dispatchEvent(new Event('open-work-grid'));
                        document.getElementById('editorial')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
