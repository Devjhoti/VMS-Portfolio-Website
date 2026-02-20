import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ScrollToTopButton() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Listen for modal and overlay state
    useEffect(() => {
        const handleModalChange = (e: CustomEvent) => {
            setIsModalOpen(e.detail.isOpen);
        };

        const handleOverlayOpen = () => setIsOverlayOpen(true);
        const handleOverlayClose = () => setIsOverlayOpen(false);

        window.addEventListener('about-modal-change', handleModalChange as EventListener);
        window.addEventListener('overlay-opened', handleOverlayOpen);
        window.addEventListener('overlay-closed', handleOverlayClose);

        return () => {
            window.removeEventListener('about-modal-change', handleModalChange as EventListener);
            window.removeEventListener('overlay-opened', handleOverlayOpen);
            window.removeEventListener('overlay-closed', handleOverlayClose);
        };
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsVisible(latest > 500);
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && !isModalOpen && !isOverlayOpen && (
                <motion.button
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
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
                    aria-label="Scroll to top"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
