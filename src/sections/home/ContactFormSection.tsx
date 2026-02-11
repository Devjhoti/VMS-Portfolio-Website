import { useState, useRef, type FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ContactFormSection() {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const containerRef = useRef<HTMLElement>(null);

    // Scroll progress for the section reveal
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    });

    // Parallax & Reveal Animations
    const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');

        try {
            const form = e.currentTarget;
            const data = new FormData(form);
            const response = await fetch('https://formspree.io/f/xykdkpzn', {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                setFormStatus('success');
                form.reset();
            } else {
                setFormStatus('error');
            }
        } catch (err) {
            setFormStatus('error');
        }
    };

    // Shared input styles (floating label effect components would be ideal, but keeping it single-file simple)
    const inputWrapperStyle = {
        position: 'relative' as const,
        marginBottom: '2rem',
    };

    const inputStyle = {
        width: '100%',
        padding: '1rem 0',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        fontFamily: 'var(--font-family-sans)',
        fontSize: '1.1rem',
        outline: 'none',
        transition: 'all 0.3s ease',
        borderRadius: 0,
    };

    return (
        <section
            ref={containerRef}
            id="contact-form"
            style={{
                position: 'relative',
                padding: 'var(--section-padding-y) var(--side-margin)',
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: '#0a0a0a', // Fallback
                perspective: '1000px'
            }}
        >
            {/* Animated Background Gradient */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, #1D263D 0%, #000000 100%)',
                zIndex: 0
            }} />

            {/* Ambient Copper Orbs */}
            <motion.div
                animate={{
                    x: [0, 150, -50, 100, 0],
                    y: [0, -100, 50, -50, 0],
                    scale: [1, 1.2, 0.9, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1]
                }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--color-copper) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    opacity: 0.3,
                    zIndex: 0
                }}
            />
            <motion.div
                animate={{
                    x: [0, -100, 50, -80, 0],
                    y: [0, 80, -40, 60, 0],
                    scale: [1, 0.8, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1]
                }}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '5%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #4a5a7a 0%, transparent 70%)',
                    filter: 'blur(50px)',
                    opacity: 0.2,
                    zIndex: 0
                }}
            />

            {/* Glass Console Card */}
            <motion.div
                style={{
                    width: '100%',
                    maxWidth: '700px',
                    position: 'relative',
                    zIndex: 1,
                    scale,
                    opacity,
                    y,
                    rotateX,
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '20px',
                    padding: 'clamp(2rem, 5vw, 4rem)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontFamily: 'var(--font-family-serif)',
                            color: 'white',
                            marginBottom: '0.5rem',
                            fontWeight: 300,
                            letterSpacing: '-0.02em',
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}
                    >
                        Get in Touch
                    </motion.h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>
                        Start the conversation.
                    </p>
                </div>

                <style>{`
                    .glass-input::placeholder {
                        color: rgba(255, 255, 255, 0.4);
                        font-weight: 300;
                    }
                `}</style>
                {formStatus === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ textAlign: 'center', padding: '2rem' }}
                    >
                        <div style={{
                            width: '80px', height: '80px',
                            background: 'rgba(181, 142, 125, 0.2)',
                            borderRadius: '50%', margin: '0 auto 2rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--color-copper)', fontSize: '2rem'
                        }}>✓</div>
                        <h3 style={{ color: 'white', fontFamily: 'var(--font-family-serif)', marginBottom: '1rem', fontSize: '2rem' }}>Message Received</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            We'll be in touch shortly.
                        </p>
                        <button
                            onClick={() => setFormStatus('idle')}
                            style={{
                                color: 'var(--color-copper)',
                                background: 'none',
                                border: 'none',
                                borderBottom: '1px solid var(--color-copper)',
                                cursor: 'pointer',
                                paddingBottom: '0.2rem',
                                fontSize: '1rem',
                                letterSpacing: '0.05em'
                            }}
                        >
                            Send another
                        </button>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                            <div style={inputWrapperStyle}>
                                <input
                                    className="glass-input"
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="YOUR NAME"
                                    style={inputStyle}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderBottomColor = 'var(--color-copper)';
                                        e.currentTarget.style.background = 'linear-gradient(to bottom, transparent, rgba(181, 142, 125, 0.05))';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                />
                            </div>
                            <div style={inputWrapperStyle}>
                                <input
                                    className="glass-input"
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="EMAIL ADDRESS"
                                    style={inputStyle}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderBottomColor = 'var(--color-copper)';
                                        e.currentTarget.style.background = 'linear-gradient(to bottom, transparent, rgba(181, 142, 125, 0.05))';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ ...inputWrapperStyle, marginBottom: '3rem' }}>
                            <input
                                className="glass-input"
                                type="tel"
                                name="phone"
                                placeholder="PHONE (OPTIONAL)"
                                style={inputStyle}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderBottomColor = 'var(--color-copper)';
                                    e.currentTarget.style.background = 'linear-gradient(to bottom, transparent, rgba(181, 142, 125, 0.05))';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
                                    e.currentTarget.style.background = 'transparent';
                                }}
                            />
                        </div>

                        <div style={{ ...inputWrapperStyle, marginBottom: '4rem' }}>
                            <textarea
                                className="glass-input"
                                name="message"
                                required
                                rows={2}
                                placeholder="TELL US ABOUT YOUR PROJECT..."
                                style={{ ...inputStyle, resize: 'none', overflow: 'hidden' }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderBottomColor = 'var(--color-copper)';
                                    e.currentTarget.style.background = 'linear-gradient(to bottom, transparent, rgba(181, 142, 125, 0.05))';
                                    e.currentTarget.rows = 4;
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.2)';
                                    e.currentTarget.style.background = 'transparent';
                                    if (!e.currentTarget.value) e.currentTarget.rows = 2;
                                }}
                            />
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'var(--color-copper)' }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={formStatus === 'submitting'}
                                style={{
                                    padding: '1.2rem 4rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    borderRadius: '50px' // Pill shape
                                }}
                            >
                                {formStatus === 'submitting' ? 'Sending...' : 'Submit Request'}
                            </motion.button>
                        </div>
                    </form>
                )}
            </motion.div>
        </section>
    );
}
