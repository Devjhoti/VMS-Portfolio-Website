import { useEffect, useRef } from 'react';

/**
 * Ensures that if a user rotates their device (changes orientation) and viewport dimensions change,
 * they are kept inside the exact same section they were viewing.
 * Prevents users from being kicked completely out of section flows.
 */
export function ScrollRestorer() {
    const scrollData = useRef({
        scrollId: '',
        progress: 0,
    });

    useEffect(() => {
        let ticking = false;
        let windowWidth = window.innerWidth;

        const recordScroll = () => {
            const scrollY = window.scrollY;
            const sections = Array.from(document.querySelectorAll('section'));

            let found = false;
            for (const section of sections) {
                if (!section.hasAttribute('data-scroll-id')) {
                    section.setAttribute('data-scroll-id', 'sec-' + Math.random().toString(36).substring(2, 9));
                }

                const rect = section.getBoundingClientRect();
                // Since getBoundingClientRect() is relative to the viewport, top + scrollY gives absolute doc position
                const top = rect.top + scrollY;
                const height = rect.height;

                // Find the section that covers the center of the viewport
                const viewportCenter = scrollY + (window.innerHeight / 2);

                if (viewportCenter >= top && viewportCenter <= top + height) {
                    scrollData.current = {
                        scrollId: section.getAttribute('data-scroll-id') || '',
                        // Calculate progress relative to the entire section height
                        progress: height > 0 ? (viewportCenter - top) / height : 0,
                    };
                    found = true;
                    break;
                }
            }

            // Fallback
            if (!found && sections.length > 0) {
                for (const section of sections) {
                    const rect = section.getBoundingClientRect();
                    const top = rect.top + scrollY;
                    const height = rect.height;
                    if (scrollY >= top && scrollY <= top + height) {
                        scrollData.current = {
                            scrollId: section.getAttribute('data-scroll-id') || '',
                            progress: height > 0 ? (scrollY - top) / height : 0,
                        };
                        break;
                    }
                }
            }

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(recordScroll);
                ticking = true;
            }
        };

        const handleResize = () => {
            const currentWidth = window.innerWidth;

            // Only do heavy layout restoration if the width changed significantly (like an orientation change)
            // We don't want to mess up natural scroll if mobile browsers shrink height due to URL bar
            if (Math.abs(currentWidth - windowWidth) < 50) return;
            windowWidth = currentWidth;

            const { scrollId, progress } = scrollData.current;
            if (!scrollId) return;

            const restore = () => {
                const section = document.querySelector(`[data-scroll-id="${scrollId}"]`);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const top = rect.top + window.scrollY;
                    const height = rect.height;

                    // Re-calculate the top based on the progress of the center
                    const targetViewportCenter = top + (progress * height);
                    const targetScrollY = targetViewportCenter - (window.innerHeight / 2);

                    window.scrollTo({
                        // Ensure we don't scroll above 0
                        top: Math.max(0, targetScrollY),
                        behavior: 'instant'
                    });
                }
            };

            // We wait for the DOM to reflow fully (usually rotation takes a few frames)
            setTimeout(restore, 50);
            setTimeout(restore, 150);
            setTimeout(restore, 300); // safety catch for heavy layout
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        // Initial record
        recordScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, []);

    return null;
}
