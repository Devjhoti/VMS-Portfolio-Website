import { motion } from 'framer-motion';

export function VisionArchitectureSection() {
    return (
        <section
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}
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
               .vision-divider {
                 width: 1px;
                 height: 400px;
                 background-color: var(--color-text-primary);
                 opacity: 0.2;
                 margin-top: var(--space-xl);
               }
               @media (max-width: 900px) {
                 .vision-container {
                   flex-direction: column;
                   align-items: center;
                   gap: var(--space-xl);
                 }
                 .vision-divider {
                   width: 100px;
                   height: 1px;
                   margin: 0;
                 }
               }
             `}
                    </style>

                    <div className="vision-container">
                        {/* VMS CEO */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '500px' }}
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
                                margin: '0 0 var(--space-lg) 0',
                                fontWeight: 500
                            }}>
                                CEO, Virtual Model Studio
                            </p>

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
                                style={{ height: '40px', opacity: 0.8 }}
                            />
                        </motion.div>

                        {/* Divider */}
                        <motion.div
                            initial={{ opacity: 0, scaleY: 0 }}
                            whileInView={{ opacity: 1, scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="vision-divider"
                        />

                        {/* PKG IT CEO */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '500px' }}
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
                                margin: '0 0 var(--space-lg) 0',
                                fontWeight: 500
                            }}>
                                CEO, PKG IT
                            </p>

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
                                style={{ height: '50px', opacity: 0.9 }}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
