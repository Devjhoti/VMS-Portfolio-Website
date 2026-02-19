import { Facebook, Youtube, Mail, MapPin, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'rgba(5, 5, 5, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
      }}
    >

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'var(--space-2xl) var(--side-margin)',
          color: 'var(--color-silver)',
        }}
      >

        <div
          style={{
            maxWidth: 'var(--content-max-width)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-xl)',
          }}
        >
          {/* Column 1: Identity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: '2.5rem',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em',
                  marginBottom: '1rem',
                  color: '#fff',
                }}
              >
                Virtual<br />Model<br />Studio
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: '0.875rem',
                  opacity: 0.6,
                  lineHeight: 1.6,
                  maxWidth: '300px',
                }}
              >
                Creating the Unreal. <br />
                High-fidelity virtual production and architectural visualization studio.
              </p>
            </div>
            <button
              onClick={scrollToTop}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-silver)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '1rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#fff';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = 'var(--color-silver)';
              }}
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>

          {/* Column 2: Sitemap */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--space-md) * 0.75)' }}>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.5rem' }}>
              Sitemap
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Work', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item === 'Work') {
                        window.dispatchEvent(new Event('open-work-grid'));
                        document.getElementById('editorial')?.scrollIntoView({ behavior: 'smooth' });
                      }
                      if (item === 'About') window.dispatchEvent(new Event('open-about-modal'));
                      if (item === 'Contact') document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      color: 'var(--color-silver)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'opacity 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--space-md) * 0.75)' }}>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.5rem' }}>
              Connect
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href="mailto:virtualmodelstudiobd@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--color-silver)',
                  textDecoration: 'none',
                  opacity: 0.8,
                  fontSize: '0.9rem',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
              >
                <Mail size={16} />
                <span style={{ fontSize: '0.85rem' }}>virtualmodelstudiobd@gmail.com</span>
              </a>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a
                  href="https://www.facebook.com/profile.php?id=61569617226479"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-silver)', opacity: 0.7, transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#1877F2'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.color = 'var(--color-silver)'; }}
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://youtube.com/@virtualmodelstudio?si=3lvBKE1dI7Ri6T23"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-silver)', opacity: 0.7, transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#FF0000'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.color = 'var(--color-silver)'; }}
                  aria-label="YouTube"
                >
                  <Youtube size={24} />
                </a>
              </div>

              {/* Technology Partner */}
              <div style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem' }}>
                <p style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.25rem' }}>TECHNOLOGY PARTNER</p>
                <a
                  href="mailto:pranabprg@gmail.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--color-silver)',
                    textDecoration: 'none',
                    opacity: 0.9,
                    fontSize: '0.85rem'
                  }}
                >
                  <img
                    src="/assets/PKG_IT-LOGO.png"
                    alt="PKG IT"
                    style={{
                      height: '24px',
                      width: 'auto',
                      objectFit: 'contain',
                      filter: 'brightness(0) invert(1) opacity(0.8)'
                    }}
                  />
                </a>
              </div>

            </div>
          </div>

          {/* Column 4: Location */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--space-md) * 0.75)' }}>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.5rem' }}>
              Location
            </h3>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <MapPin size={18} style={{ marginTop: '0.2rem', flexShrink: 0, color: 'var(--color-copper)' }} />
              <a
                href="https://maps.app.goo.gl/WYDfi4wU2yX3RBj39"
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5, opacity: 0.8, color: 'inherit', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
              >
                H # 31, R # 5, Block C,<br />
                Bonosree, Dhaka
              </a>
            </div>
            <div
              style={{
                width: '100%',
                height: '150px',
                borderRadius: '8px',
                overflow: 'hidden',
                marginTop: '0.5rem',
                background: '#2a2a2a',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
              }}
            >
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(85%) grayscale(1)', position: 'absolute', inset: 0 }}
                src="https://maps.google.com/maps?q=H+%23+31,+R+%23+5,+Block+C,+Bonosree+Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Studio Location"
                loading="lazy"
              ></iframe>
              <a
                href="https://maps.app.goo.gl/WYDfi4wU2yX3RBj39"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 10,
                  opacity: 0,
                  cursor: 'pointer'
                }}
                aria-label="View on Google Maps"
              ></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            maxWidth: 'var(--content-max-width)',
            margin: 'var(--space-xl) auto 0',
            paddingTop: 'var(--space-md)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.75rem',
            opacity: 0.4,
          }}
        >
          <span>© {new Date().getFullYear()} Virtual Model Studio. All rights reserved.</span>
          <span>Made with Intelligence.</span>
        </div>
      </div>
    </footer>
  );
}
