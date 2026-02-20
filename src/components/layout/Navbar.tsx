import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditorialGlass, setIsEditorialGlass] = useState(false);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

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

    const onEnterGlass = () => setIsEditorialGlass(true);
    const onLeaveGlass = () => setIsEditorialGlass(false);
    const onOverlayOpen = () => setIsOverlayOpen(true);
    const onOverlayClose = () => setIsOverlayOpen(false);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', checkMobile);
    window.addEventListener('enter-editorial-glass', onEnterGlass);
    window.addEventListener('leave-editorial-glass', onLeaveGlass);
    window.addEventListener('overlay-opened', onOverlayOpen);
    window.addEventListener('overlay-closed', onOverlayClose);

    // Initial check
    checkMobile();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('enter-editorial-glass', onEnterGlass);
      window.removeEventListener('leave-editorial-glass', onLeaveGlass);
      window.removeEventListener('overlay-opened', onOverlayOpen);
      window.removeEventListener('overlay-closed', onOverlayClose);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (e: React.MouseEvent, item: string) => {
    if (isOverlayOpen) {
      e.preventDefault();
      // Immediately reset navbar state to prevent ghosting
      setIsEditorialGlass(false);
      setIsOverlayOpen(false);
      window.dispatchEvent(new Event('trigger-overlay-close'));

      setTimeout(() => {
        if (item === 'Contact') {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        } else if (item === 'About') {
          window.dispatchEvent(new Event('open-about-modal'));
        } else if (item === 'Home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 300);
      return;
    }

    if (item === 'Work') {
      e.preventDefault();
      // Only scroll, do not open overlay
      document.getElementById('editorial')?.scrollIntoView({ behavior: 'smooth' });
    }
    if (item === 'About') {
      e.preventDefault();
      window.dispatchEvent(new Event('open-about-modal'));
    }
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200, // Higher than modal overlay (100)
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile
            ? `var(--space-sm) var(--side-margin)`
            : `var(--space-md) var(--side-margin)`,
          maxWidth: 'var(--content-max-width)',
          margin: '0 auto',
          transition: 'padding 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          // No background on the nav itself, strictly handled by layers
          mixBlendMode: isEditorialGlass ? 'normal' : 'difference',
          color: isEditorialGlass ? 'var(--color-text-primary)' : '#ffffff'
        }}
      >
        {/* Rectangular Convex Lens Background */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: isEditorialGlass ? 1 : 0,
            opacity: isEditorialGlass ? 1 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            mass: 1
          }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            transformOrigin: 'top',
            // The "Convex Lens" Look
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            background: 'rgba(255, 255, 255, 0.6)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: `
               0 10px 30px rgba(0, 0, 0, 0.1), 
               inset 0 0 20px rgba(255, 255, 255, 0.5), 
               inset 0 -10px 20px rgba(255, 255, 255, 0.3)
             `
          }}
        />

        {/* Go Back Button Container (Centered) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none', // Allow clicks pass through to nav items if needed
          zIndex: 10
        }}>
          <AnimatePresence>
            {isOverlayOpen && isEditorialGlass && (
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={() => {
                  setIsEditorialGlass(false);
                  setIsOverlayOpen(false);
                  window.dispatchEvent(new Event('trigger-overlay-close'));
                }}
                style={{
                  pointerEvents: 'auto', // Re-enable clicks
                  background: 'rgba(0,0,0,0.8)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: '1.2em', lineHeight: 1, display: 'block', marginBottom: '1px' }}>&larr;</span> Go Back
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Logo Area */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, 'Home')}
          style={{
            textDecoration: 'none',
            color: 'currentColor', // Use inherited color for blend mode
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1,
            position: 'relative',
            zIndex: 101,
            cursor: 'pointer'
          }}
        >
          <AnimatePresence mode='wait'>
            {scrolled ? (
              <motion.span
                key="logo-collapsed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'var(--font-family-serif)', fontStyle: 'italic' }}
              >
                VMS
              </motion.span>
            ) : (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.02em', display: 'block' }}>Virtual Model</span>
                <span style={{ fontSize: '1rem', fontFamily: 'var(--font-family-serif)', fontStyle: 'italic', opacity: 0.8, display: 'block' }}>Studio</span>
              </motion.div>
            )}
          </AnimatePresence>
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
            {['Work', 'About', 'Contact']
              .filter(item => isOverlayOpen ? item !== 'Work' : true) // Hide Work in Overlay
              .map((item) => (
                <li key={item} style={{ position: 'relative' }}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="nav-link-minimal" // Changed class name
                    style={{
                      color: 'currentColor',
                      textDecoration: 'none',
                      fontWeight: 400,
                      position: 'relative',
                      paddingBottom: '4px'
                    }}
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {item}
                    <span className="link-underline" style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '0%',
                      height: '1px',
                      background: 'currentColor',
                      transition: 'width 0.3s ease'
                    }} />
                  </a>
                  <style>{`
                  .nav-link-minimal:hover .link-underline {
                    width: 100% !important;
                  }
                `}</style>
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
              color: 'currentColor', // Inherit for blend mode
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '24px' }}
            >
              <motion.div
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 }
                }}
                style={{ width: '24px', height: '2px', background: 'currentColor', transformOrigin: 'center' }}
              />
              <motion.div
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                style={{ width: '24px', height: '2px', background: 'currentColor' }}
              />
              <motion.div
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 }
                }}
                style={{ width: '24px', height: '2px', background: 'currentColor', transformOrigin: 'center' }}
              />
            </motion.div>
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay - Falling Glass Shard */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ y: '-110%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-110%', transition: { duration: 0.4, ease: 'easeInOut' } }}
            drag="y"
            dragConstraints={{ bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.05 }}
            onDragEnd={(_, { offset, velocity }) => {
              if (offset.y < -100 || velocity.y < -500) {
                setIsMenuOpen(false);
              }
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 1.5
            }}
            style={{
              position: 'fixed',
              inset: 0,
              // The Glass Shard Look - Smoked Glass for Visibility
              background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.1) 60%, rgba(10,10,10,0.2) 90%, rgba(10,10,10,0.5) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 110, // Must be higher than Video Grid Overlay (100)
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '60px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3), inset 0 -2px 5px rgba(255,255,255,0.1), inset 0 -10px 40px rgba(0,0,0,0.2)',
              borderRadius: '0 0 30px 30px',
              touchAction: 'none' // Important for drag
            }}
          >
            {/* Gloss Reflection (Top) - Retained for surface shine */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)',
              pointerEvents: 'none'
            }} />

            <ul style={{
              listStyle: 'none',
              padding: 0,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
              position: 'relative',
              zIndex: 2,
              width: '100%',
              // Removed mixBlendMode to ensure consistent white-on-dark contrast
            }}>
              {['Work', 'About', 'Contact'].map((item) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  onClick={toggleMenu}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    style={{
                      fontSize: 'clamp(3rem, 10vw, 4rem)',
                      color: '#ffffff', // Base for difference mode
                      textDecoration: 'none',
                      fontWeight: '200',
                      letterSpacing: '-0.03em',
                      fontFamily: 'var(--font-family-serif)',
                      fontStyle: 'italic',
                      display: 'block',
                      textShadow: '0 2px 10px rgba(0,0,0,0.5)' // Added shadow for visibility
                    }}
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Drag Handle Indicator */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '4px',
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.3)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
