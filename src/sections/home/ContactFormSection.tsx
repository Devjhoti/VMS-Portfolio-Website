import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';

export function ContactFormSection() {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');

        try {
            const form = e.currentTarget;
            const data = new FormData(form);
            const response = await fetch('https://formspree.io/f/xykdkpzn', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
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

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '500',
        color: 'var(--color-navy-base)',
        fontSize: '0.9rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase' as const,
    };

    const inputStyle = {
        width: '100%',
        padding: '1rem',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '0',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-family-sans)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    };

    return (
        <section
            id="contact-form"
            style={{
                padding: 'var(--section-padding-y) var(--side-margin)',
                background: 'var(--color-bg-secondary)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontFamily: 'var(--font-family-serif)',
                        color: 'var(--color-navy-base)',
                        marginBottom: 'var(--space-sm)',
                        fontWeight: 700
                    }}>
                        Get in Touch
                    </h2>
                    <div style={{
                        width: '60px',
                        height: '3px',
                        background: 'var(--color-copper)',
                        margin: '1.5rem auto 0'
                    }} />
                </motion.div>

                {formStatus === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            padding: 'var(--space-xl)',
                            backgroundColor: 'white',
                            border: '1px solid var(--color-silver)',
                            textAlign: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                        }}
                    >
                        <h3 style={{
                            marginBottom: 'var(--space-sm)',
                            fontFamily: 'var(--font-family-serif)',
                            fontSize: '1.5rem',
                            color: 'var(--color-navy-base)'
                        }}>Message Sent</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>Thank you for reaching out. We will respond to your inquiry shortly.</p>
                        <button
                            onClick={() => setFormStatus('idle')}
                            style={{
                                marginTop: 'var(--space-md)',
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-copper)',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}
                        >
                            Send another message
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                            <div style={{ flex: '1 1 300px' }}>
                                <label htmlFor="name" style={labelStyle}>Name (Required)</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    style={inputStyle}
                                    placeholder="Enter your name"
                                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-copper)'}
                                    onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                />
                            </div>
                            <div style={{ flex: '1 1 300px' }}>
                                <label htmlFor="email" style={labelStyle}>Email (Required)</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    style={inputStyle}
                                    placeholder="Enter your email"
                                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-copper)'}
                                    onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" style={labelStyle}>Phone (Optional)</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                style={inputStyle}
                                placeholder="Enter your phone number"
                                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-copper)'}
                                onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" style={labelStyle}>Message (Required)</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={6}
                                style={{ ...inputStyle, resize: 'vertical' }}
                                placeholder="How can we help you?"
                                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-copper)'}
                                onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                            />
                        </div>

                        <div style={{ marginTop: 'var(--space-sm)' }}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={formStatus === 'submitting'}
                                style={{
                                    width: '100%',
                                    padding: '1.2rem',
                                    backgroundColor: 'var(--color-navy-base)',
                                    color: 'white',
                                    border: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    transition: 'opacity 0.3s ease',
                                    opacity: formStatus === 'submitting' ? 0.7 : 1
                                }}
                            >
                                {formStatus === 'submitting' ? 'Sending...' : 'Submit Message'}
                            </motion.button>
                        </div>

                        {formStatus === 'error' && (
                            <p style={{ color: '#d32f2f', textAlign: 'center', fontSize: '0.9rem' }}>
                                There was an error sending your message. Please try again later.
                            </p>
                        )}
                    </motion.form>
                )}
            </div>
        </section>
    );
}
