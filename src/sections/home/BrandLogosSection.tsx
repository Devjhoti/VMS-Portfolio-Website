import { useRef } from 'react';
import { motion } from 'framer-motion';

// Hardcoded paths to public assets
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
                background: '#050505',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 10
            }}
        >
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
            <div
                style={{
                    display: 'flex',
                    overflow: 'hidden',
                    userSelect: 'none',
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                }}
            >
                {/* Infinite Loop: We render the logos twice to create seamless loop */}
                <MarqueeGroup />
                <MarqueeGroup />
            </div>

        </section>
    );
}

function MarqueeGroup() {
    return (
        <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 30 // Slower loop for elegance
            }}
            style={{
                display: 'flex',
                flexShrink: 0,
                gap: '5vw',
                paddingRight: '5vw',
                alignItems: 'center'
            }}
        >
            {logos.map((logo, index) => (
                <div
                    key={index}
                    style={{
                        width: '150px',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        // Invert dark logos to make them white, or use brightness for others
                        filter: logo.isDark ? 'grayscale(100%) invert(1)' : 'grayscale(100%) brightness(2)',
                        opacity: 0.7,
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        // Restore original colors on hover
                        e.currentTarget.style.filter = 'grayscale(0%) invert(0) brightness(1)';
                        e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                        // Re-apply specific filter based on loop prop
                        e.currentTarget.style.filter = logo.isDark ? 'grayscale(100%) invert(1)' : 'grayscale(100%) brightness(2)';
                        e.currentTarget.style.opacity = '0.7';
                    }}
                >
                    <img
                        src={logo.src}
                        alt={logo.name}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </div>
            ))}
        </motion.div>
    );
}
