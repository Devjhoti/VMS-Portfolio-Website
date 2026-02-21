import { useRef } from 'react';
import { motion } from 'framer-motion';

// Hardcoded paths to public assets
const styles = `
@keyframes marquee-horizontal {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.marquee-container {
  display: flex;
  overflow: hidden;
  user-select: none;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  margin-bottom: 8vh;
}

.marquee-container:hover .marquee-group {
  animation-play-state: paused;
}

.marquee-group {
  display: flex;
  flex-shrink: 0;
  gap: 5vw;
  padding-right: 5vw;
  align-items: center;
  animation: marquee-horizontal 30s linear infinite;
}

.logo-item {
  position: relative;
  width: 200px; /* Increased from 150px */
  height: 110px; /* Increased from 80px */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: visible;
  border-radius: 12px;
}

.logo-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 2;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* Default state filters */
.logo-item[data-dark="true"] .logo-image {
  filter: grayscale(100%) invert(1);
}
.logo-item[data-dark="false"] .logo-image {
  filter: grayscale(100%) brightness(2);
}
/* Frosted Glass Pedestal Hover Effect */
.logo-item {
  background: rgba(255, 255, 255, 0.0);
  border: 1px solid rgba(255, 255, 255, 0.0);
  padding: 15px;
}
.logo-item:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
.logo-item:hover .logo-image {
  filter: grayscale(0%) invert(0) !important;
  transform: scale(1.05);
}
/* White pedestal for dark logos */
.logo-item[data-dark="true"]:hover {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 1);
}
`;
const logos = [
  { name: 'Chanel', src: '/assets/client-logos/[CITYPNG.COM]Chanel White Logo HD PNG - 3000x3000.png', isDark: false },
  { name: 'Gucci', src: '/assets/client-logos/gucci-seeklogo.png', isDark: true },
  { name: 'Ralph Lauren', src: '/assets/client-logos/polo-ralph-lauren-seeklogo.png', isDark: true },
  { name: 'Louis Vuitton', src: '/assets/client-logos/louis-vuitton-seeklogo.png', isDark: true },
  { name: 'Levis', src: '/assets/client-logos/vecteezy_levis-logo-brand-symbol-design-clothes-fashion-vector_23871675.png', isDark: false },
  { name: 'Emporio Armani', src: '/assets/client-logos/emporio-armani-seeklogo.png', isDark: true },
  { name: 'Safemet', src: '/assets/client-logos/Logo all of Safemet.png', isDark: false },
  { name: 'Property Lifts', src: '/assets/client-logos/Property Lift logo trans.png', isDark: true },
  { name: 'Furniture', src: '/assets/client-logos/FurnitureLogo.png', isDark: true }, // Assumed dark text
  { name: 'Topper', src: '/assets/client-logos/topper logo 3.png', isDark: true }, // Assumed dark text
];

export function BrandLogosSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      style={{
        padding: '10vh 0',
        paddingBottom: '0',
        background: '#050505',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 10
      }}
    >
      <style>{styles}</style>

      {/* Introduction Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          textAlign: 'center',
          marginBottom: '5vh',
          padding: '0 5vw'
        }}
      >
        <span style={{
          display: 'block',
          fontSize: '0.875rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '1rem'
        }}>
          Trusted By Industry Leaders
        </span>
      </motion.div>

      {/* Marquee Container */}
      <div className="marquee-container">
        {/* Infinite Loop: We render the logos twice to create seamless loop */}
        <MarqueeGroup />
        <MarqueeGroup />
      </div>

    </section>
  );
}

function MarqueeGroup() {
  return (
    <div className="marquee-group">
      {logos.map((logo, index) => (
        <div
          key={index}
          className="logo-item"
          data-dark={logo.isDark}
        >
          <img
            src={logo.src}
            alt={logo.name}
            className="logo-image"
          />
        </div>
      ))}
    </div>
  );
}
