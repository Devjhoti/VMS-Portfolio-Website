import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function VisionArchitectureSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    });

    // Option 1 Revised: Dramatic Convergence
    // The divider grows from 0 to 100% height
    const dividerHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

    // CEO Profiles fly in diagonally from far away
    // Left profile: Comes from bottom-left (far)
    const leftX = useTransform(scrollYProgress, [0, 0.7], [-800, 0]);
    const leftY = useTransform(scrollYProgress, [0, 0.7], [300, 0]);
    const leftOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    // Right profile: Comes from bottom-right (far)
    const rightX = useTransform(scrollYProgress, [0, 0.7], [800, 0]);
    const rightY = useTransform(scrollYProgress, [0, 0.7], [300, 0]);
    const rightOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    // Header scales up from nothing
    const headerScale = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    return (
        <section
            ref={sectionRef}
            id="about"
            style={{
                padding: 'var(--space-2xl) var(--space-md)',
                background: '#FAF9F6', // Warm off-white to match the reference image
                color: 'var(--color-text-primary)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {/* Header */}
                <motion.div
                    style={{
                        textAlign: 'center',
                        marginBottom: 'var(--space-2xl)',
                        scale: headerScale,
                        opacity: headerOpacity
                    }}
                >
                    <h2 style={{
                        fontFamily: 'var(--font-family-serif)',
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 700,
                        margin: '0 0 var(--space-xs) 0',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1
                    }}>
                        VISION X ARCHITECTURE
                    </h2>
                    <p style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                        opacity: 0.7,
                        margin: 0,
                        fontWeight: 400
                    }}>
                        A strategic alliance between Virtual Model Studio and PKG IT.
                    </p>
                </motion.div>

                {/* Content Container */}
                <div style={{
                    width: '100%',
                }}
                    className="vision-grid"
                >
                    {/* Responsive handling via separate style tag injected or standard class if available. 
              Since I don't see a CSS module, I will use a simple inner style tag for the media query to stack columns.
           */}
                    <style>
                        {`
               .vision-container {
                 display: flex;
                 flex-direction: row;
                 align-items: flex-start;
                 justify-content: center;
                 gap: var(--space-2xl);
               }
               .vision-divider-container {
                 width: 1px;
                 height: 550px;
                 margin-top: 100px;
                 display: flex;
                 align-items: flex-start;
                 justify-content: center;
               }
               .vision-divider {
                 width: 1px;
                 background-color: var(--color-text-primary);
                 opacity: 0.2;
               }
               @media (max-width: 900px) {
                 .vision-container {
                   flex-direction: column;
                   align-items: center;
                   gap: var(--space-xl);
                 }
                 .vision-divider-container {
                   display: none;
                 }
               }
             `}
                    </style>

                    <div className="vision-container">
                        {/* VMS CEO */}
                        <motion.div
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                maxWidth: '500px',
                                x: leftX,
                                y: leftY,
                                opacity: leftOpacity
                            }}
                        >
                            <div style={{
                                width: '280px',
                                height: '280px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                marginBottom: 'var(--space-lg)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                background: '#f0f0f0'
                            }}>
                                <img
                                    src="/assets/VMS-CEO.jpg"
                                    alt="Dev Jhoti Sutradhar"
                                    loading="lazy"
                                    width={280}
                                    height={280}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            <h3 style={{
                                fontSize: '1.8rem',
                                fontWeight: 800,
                                margin: '0 0 var(--space-xs) 0',
                                textTransform: 'uppercase',
                                letterSpacing: '0.02em'
                            }}>
                                DEV JHOTI SUTRADHAR
                            </h3>
                            <p style={{
                                fontSize: '1.2rem',
                                opacity: 0.6,
                                margin: '0 0 var(--space-xs) 0',
                                fontWeight: 500
                            }}>
                                CEO, Virtual Model Studio
                            </p>
                            <a href="mailto:virtualmodelstudiobd@gmail.com" style={{
                                fontSize: '1rem',
                                opacity: 0.8,
                                margin: '0 0 var(--space-lg) 0',
                                fontWeight: 400,
                                color: 'inherit',
                                textDecoration: 'none'
                            }}>
                                virtualmodelstudiobd@gmail.com
                            </a>

                            <p style={{
                                fontSize: '1.1rem',
                                lineHeight: 1.6,
                                opacity: 0.8,
                                marginBottom: 'var(--space-xl)',
                                maxWidth: '400px'
                            }}>
                                Driving the creative charge with Generative AI. At VMS, we engineer attention by turning abstract imagination into hyper-realistic visual reality.
                            </p>

                            <img
                                src="/assets/VMS-LOGO-TR.png"
                                alt="VMS Logo"
                                loading="lazy"
                                width={120}
                                height={40}
                                style={{ height: '40px', width: 'auto', opacity: 0.8 }}
                            />
                        </motion.div>

                        {/* Divider */}
                        <div className="vision-divider-container">
                            <motion.div
                                style={{
                                    height: dividerHeight
                                }}
                                className="vision-divider"
                            />
                        </div>

                        {/* PKG IT CEO */}
                        <motion.div
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                maxWidth: '500px',
                                x: rightX,
                                y: rightY,
                                opacity: rightOpacity
                            }}
                        >
                            <div style={{
                                width: '280px',
                                height: '280px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                marginBottom: 'var(--space-lg)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                background: '#f0f0f0'
                            }}>
                                <img
                                    src="/assets/PKG_IT-CEO.jpeg"
                                    alt="Pranab Kumar"
                                    loading="lazy"
                                    width={280}
                                    height={280}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                                />
                            </div>

                            <h3 style={{
                                fontSize: '1.8rem',
                                fontWeight: 800,
                                margin: '0 0 var(--space-xs) 0',
                                textTransform: 'uppercase',
                                letterSpacing: '0.02em'
                            }}>
                                PRANAB KUMAR
                            </h3>
                            <p style={{
                                fontSize: '1.2rem',
                                opacity: 0.6,
                                margin: '0 0 var(--space-xs) 0',
                                fontWeight: 500
                            }}>
                                CEO, PKG IT
                            </p>
                            <a href="mailto:Pranabprg@gmail.com" style={{
                                fontSize: '1rem',
                                opacity: 0.8,
                                margin: '0 0 var(--space-lg) 0',
                                fontWeight: 400,
                                color: 'inherit',
                                textDecoration: 'none'
                            }}>
                                pranabprg@gmail.com
                            </a>

                            <p style={{
                                fontSize: '1.1rem',
                                lineHeight: 1.6,
                                opacity: 0.8,
                                marginBottom: 'var(--space-xl)',
                                maxWidth: '400px'
                            }}>
                                Building the robust technical foundation that allows innovation to scale. At PKG IT, we ensure creative vision is backed by flawless enterprise execution.
                            </p>

                            <img
                                src="/assets/PKG_IT-LOGO.png"
                                alt="PKG IT Logo"
                                loading="lazy"
                                width={150}
                                height={50}
                                style={{ height: '50px', width: 'auto', opacity: 0.9 }}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
