import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hi there! I am VMS Bot. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            // Create message history for the API
            const apiMessages = messages.map(msg => ({
                role: msg.role,
                content: msg.content
            })).concat([{ role: 'user', content: userMessage }]);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: apiMessages }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch response');
            }

            const data = await response.json();
            const assistantMessage = data.choices?.[0]?.message?.content || 'Sorry, I encountered an issue.';

            setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Oops! Something went wrong connecting to the server. Please try again later.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;

        if (submitBtn) {
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
        }

        try {
            const data = new FormData(form);
            const response = await fetch('https://formspree.io/f/xykdkpzn', {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                form.outerHTML = '<div style="color: #22c55e; font-weight: 500; font-size: 0.9rem; text-align: center; padding: 1rem 0;">✓ Request Sent!</div>';
                setMessages(prev => [...prev, { role: 'assistant', content: 'Awesome! We have received your request and our team will get back to you shortly.' }]);
            } else {
                if (submitBtn) {
                    submitBtn.innerText = 'Submit Request';
                    submitBtn.disabled = false;
                }
                setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, the form could not be submitted right now.' }]);
            }
        } catch (err) {
            if (submitBtn) {
                submitBtn.innerText = 'Submit Request';
                submitBtn.disabled = false;
            }
        }
    };

    return (
        <>
            <AnimatePresence>
                {/* Chat Button */}
                {!isOpen && (
                    <motion.button
                        onClick={() => setIsOpen(true)}
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            position: 'fixed',
                            bottom: '2rem',
                            right: '6.5rem', // Positioned left of the ScrollToTopButton
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(5, 5, 5, 0.6)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 9999,
                            color: '#ffffff',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                        }}
                        aria-label="Open chat"
                    >
                        <MessageCircle size={24} />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {/* Chat Window */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            bottom: '2rem',
                            right: '2rem',
                            width: '350px',
                            maxWidth: 'calc(100vw - 4rem)',
                            height: '500px',
                            maxHeight: 'calc(100vh - 4rem)',
                            backgroundColor: 'rgba(10, 10, 10, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '1.5rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            zIndex: 9999,
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '1.25rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: '#22c55e',
                                    boxShadow: '0 0 12px #22c55e',
                                    animation: 'pulse 2s infinite'
                                }} />
                                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: '#ffffff' }}>
                                    VMS Assistant
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '50%',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    cursor: 'pointer',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div style={{
                            flex: 1,
                            padding: '1.25rem',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            scrollbarWidth: 'none', // Hide scrollbar for Firefox
                            msOverflowStyle: 'none',  // Hide scrollbar for IE/Edge
                        }}>
                            {messages.map((msg, idx) => {
                                const hasForm = msg.content.includes('[SHOW_CONTACT_FORM]');
                                const cleanContent = msg.content.replace(/\[SHOW_CONTACT_FORM\]/g, '').trim();

                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={idx}
                                        style={{
                                            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                            maxWidth: '85%',
                                            padding: '0.85rem 1.15rem',
                                            borderRadius: '1.25rem',
                                            borderBottomRightRadius: msg.role === 'user' ? '0.25rem' : '1.25rem',
                                            borderBottomLeftRadius: msg.role === 'assistant' ? '0.25rem' : '1.25rem',
                                            backgroundColor: msg.role === 'user' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid',
                                            borderColor: msg.role === 'user' ? 'transparent' : 'rgba(255, 255, 255, 0.05)',
                                            color: '#ffffff',
                                            fontSize: '0.95rem',
                                            lineHeight: '1.5',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        {cleanContent && <div style={{ whiteSpace: 'pre-wrap' }}>{cleanContent}</div>}
                                        {hasForm && msg.role === 'assistant' && (
                                            <form
                                                onSubmit={handleFormSubmit}
                                                style={{
                                                    marginTop: '1rem',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '0.75rem',
                                                    background: 'rgba(0,0,0,0.2)',
                                                    padding: '1rem',
                                                    borderRadius: '0.75rem',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                                }}
                                            >
                                                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.25rem' }}>Send a request</div>
                                                <input type="text" name="name" required placeholder="Name" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.6rem', borderRadius: '0.5rem', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
                                                <input type="email" name="email" required placeholder="Email" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.6rem', borderRadius: '0.5rem', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
                                                <textarea name="message" required placeholder="Tell us about your project" rows={2} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.6rem', borderRadius: '0.5rem', color: '#fff', fontSize: '0.9rem', outline: 'none', resize: 'none' }} />
                                                <button type="submit" style={{ background: 'var(--color-copper, #B58E7D)', color: '#fff', padding: '0.6rem', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s', marginTop: '0.25rem' }} onMouseOver={e => e.currentTarget.style.opacity = '0.9'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>Submit Request</button>
                                            </form>
                                        )}
                                    </motion.div>
                                );
                            })}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        alignSelf: 'flex-start',
                                        padding: '0.85rem 1.15rem',
                                        borderRadius: '1.25rem',
                                        borderBottomLeftRadius: '0.25rem',
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    >
                                        <Loader2 size={16} />
                                    </motion.div>
                                    Thinking...
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                padding: '1.25rem',
                                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                                display: 'flex',
                                gap: '0.75rem',
                                background: 'rgba(0,0,0,0.2)'
                            }}
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                style={{
                                    flex: 1,
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '2rem',
                                    padding: '0.85rem 1.25rem',
                                    color: '#ffffff',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                style={{
                                    background: input.trim() && !isLoading ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '50%',
                                    width: '3rem',
                                    height: '3rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                                    color: input.trim() && !isLoading ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                                    transition: 'all 0.2s ease',
                                    flexShrink: 0
                                }}
                                onMouseOver={(e) => {
                                    if (input.trim() && !isLoading) {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (input.trim() && !isLoading) {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }
                                }}
                            >
                                <Send size={18} style={{ marginLeft: '2px' }} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
