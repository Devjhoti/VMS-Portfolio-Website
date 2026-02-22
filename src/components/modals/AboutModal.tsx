import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
// Icons
import { X, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

export function AboutModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSide, setActiveSide] = useState<'vms' | 'pkg' | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // --- Slider Logic ---
    // Constraints: 0 to 100. 50 is center.
    // Left Panel Width = x %. Right Panel Width = (100 - x) %.
    const sliderX = useMotionValue(50);

    // Manual Slider Drag Logic
    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            const percent = (e.clientX / window.innerWidth) * 100;
            // Clamp strictly for the visual slider
            const clamped = Math.min(Math.max(percent, 0), 100);
            sliderX.set(clamped);

            // "Flick" Logic: If dragged ~10% from center (50), trigger expansion
            // 50 - 10 = 40 (Left movement triggers Right Panel/PKG)
            // 50 + 10 = 60 (Right movement triggers Left Panel/VMS)
            if (clamped < 40) {
                setIsDragging(false); // Stop dragging interaction
                setActiveSide('pkg'); // Trigger expansion (PKG is on Right, so sliding Left reveals it)
            } else if (clamped > 60) {
                setIsDragging(false); // Stop dragging interaction
                setActiveSide('vms'); // Trigger expansion (VMS is on Left, so sliding Right reveals it)
            }
        };

        const handlePointerUp = () => {
            setIsDragging(false);
            document.body.style.cursor = 'auto';
            // If they release before triggering (i.e. between 40-60),
            // let's animate back to center to avoid "stuck" feeling, or leave it?
            // "The slider snaps back at the middle... don't want that" -> User said this earlier.
            // But they also said "drag just about 50-100px... right panel will start to expand automatically".
            // So if they LET GO before that, it's safer to leave it.
            // However, 40-60 is a very small zone. I'll leave it as is (no snap back) to be safe.
        };

        if (isDragging) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
            document.body.style.cursor = 'ew-resize';
        }

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            document.body.style.cursor = 'auto'; // ensure reset on unmount/change
        };
    }, [isDragging, sliderX]);
    // --- Mouse Parallax Logic (Localized) ---
    const vmsMouseX = useMotionValue(0);
    const vmsMouseY = useMotionValue(0);
    const pkgMouseX = useMotionValue(0);
    const pkgMouseY = useMotionValue(0);

    const handlePanelMouseMove = (e: React.MouseEvent, type: 'vms' | 'pkg') => {
        const x = e.clientX - window.innerWidth / 2;
        const y = e.clientY - window.innerHeight / 2;
        if (type === 'vms') {
            vmsMouseX.set(x);
            vmsMouseY.set(y);
        } else {
            pkgMouseX.set(x);
            pkgMouseY.set(y);
        }
    };

    const handlePanelMouseLeave = (type: 'vms' | 'pkg') => {
        if (type === 'vms') {
            animate(vmsMouseX, 0, { duration: 0.5 });
            animate(vmsMouseY, 0, { duration: 0.5 });
        } else {
            animate(pkgMouseX, 0, { duration: 0.5 });
            animate(pkgMouseY, 0, { duration: 0.5 });
        }
    };

    const leftWidth = useTransform(sliderX, (v) => `${v}%`);
    const rightWidth = useTransform(sliderX, (v) => `${100 - v}%`);

    // Alliance Card Animations (Fade out/Slide up when slider moves)
    const cardOpacity = useTransform(sliderX, [40, 50, 60], [0, 1, 0]);
    const cardY = useTransform(sliderX, [40, 50, 60], [-100, 0, -100]);
    const cardPointerEvents = useTransform(sliderX, (v) => (v > 45 && v < 55) ? 'auto' : 'none');

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            sliderX.set(50); // Reset slider on open
        };
        window.addEventListener('open-about-modal', handleOpen);
        return () => window.removeEventListener('open-about-modal', handleOpen);
    }, [sliderX]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.dispatchEvent(new CustomEvent('about-modal-change', { detail: { isOpen: true } }));
        } else {
            document.body.style.overflow = 'unset';
            setActiveSide(null); // Reset active state on close
            window.dispatchEvent(new CustomEvent('about-modal-change', { detail: { isOpen: false } }));
        }
    }, [isOpen]);

    // Dynamic Title Management
    useEffect(() => {
        if (!isOpen) return;

        const prevTitle = document.title;

        if (activeSide === 'vms') {
            document.title = "VMS | Creative Intelligence";
        } else if (activeSide === 'pkg') {
            document.title = "PKG IT | Technical Architecture";
        } else {
            document.title = "The Alliance | Vision & Logic";
        }

        return () => {
            document.title = prevTitle;
        };
    }, [isOpen, activeSide]);


    const handleSideClick = (side: 'vms' | 'pkg') => {
        setActiveSide(side);
    };

    const handleBack = () => {
        setActiveSide(null);
        animate(sliderX, 50, { type: 'spring', stiffness: 200, damping: 25 });
        // Reset mouse parallax too
        animate(vmsMouseX, 0); animate(vmsMouseY, 0);
        animate(pkgMouseX, 0); animate(pkgMouseY, 0);
    };

    // Animate slider when active side changes
    useEffect(() => {
        if (activeSide === 'vms') {
            // "The expansion and pushing animation will happen for about 800ms"
            animate(sliderX, 100, { duration: 0.8, ease: 'easeOut' });
        } else if (activeSide === 'pkg') {
            animate(sliderX, 0, { duration: 0.8, ease: 'easeOut' });
        }
    }, [activeSide, sliderX])


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: '#000',
                        display: 'flex',
                        flexDirection: 'row',
                        overflow: 'hidden',
                    }}
                    className="about-modal-container"
                >
                    {/* Global Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '2rem',
                            right: '2rem',
                            zIndex: 100,
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <X size={24} />
                    </button>

                    <style>{`
            .about-modal-container { flexDirection: row; }
            /* Navigation Buttons Default (Desktop) */
            .nav-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                outline: none;
                z-index: 80;
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            }
            .nav-btn:hover { transform: translateY(-50%) scale(1.1); }
            .nav-btn:active { transform: translateY(-50%) scale(0.9); }

            /* VMS -> PKG (Right Side) */
            .nav-btn.vms-to-pkg {
                right: 2rem;
                border: 1px solid rgba(255,255,255,0.2);
                background: rgba(0,0,0,0.3);
                color: white;
            }
            .nav-btn.vms-to-pkg:hover { background-color: rgba(255,255,255,0.1); }

            /* PKG -> VMS (Left Side) */
            .nav-btn.pkg-to-vms {
                left: 2rem;
                border: 1px solid rgba(6, 182, 212, 0.3);
                background: rgba(0,0,0,0.3);
                color: #22d3ee;
            }
            .nav-btn.pkg-to-vms:hover { background-color: rgba(6, 182, 212, 0.1); }

            @media (max-width: 1024px) {
               .about-modal-container { flexDirection: column !important; }
               .desktop-slider { display: none !important; }
            }
            
            /* Mobile Adjustments for Buttons to prevent overlap */
            @media (max-width: 768px) {
                .nav-btn {
                    top: auto !important;
                    bottom: 2rem !important;
                    transform: none !important;
                    width: 50px;
                    height: 50px;
                }
                .nav-btn:hover { transform: scale(1.1) !important; }
                .nav-btn:active { transform: scale(0.9) !important; }

                /* Move BOTH buttons to Bottom Right on mobile to avoid Text/Back button (Left) */
                .nav-btn.vms-to-pkg {
                    right: 1.5rem !important;
                }
                .nav-btn.pkg-to-vms {
                    left: auto !important;
                    right: 1.5rem !important;
                }
            }
          `}</style>

                    {/* ================= LEFT: VMS (VISION) ================= */}
                    <motion.div
                        className="side-panel vms"
                        style={{
                            width: leftWidth, // Always follow slider position
                            flex: 'unset',
                            flexShrink: 0, // Prevent compression
                            position: 'relative',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            borderRight: '1px solid rgba(255,255,255,0.1)',
                            cursor: activeSide ? 'default' : 'pointer'
                        }}
                        onClick={() => !activeSide && handleSideClick('vms')}
                        onMouseMove={(e) => handlePanelMouseMove(e, 'vms')}
                        onMouseLeave={() => handlePanelMouseLeave('vms')}
                    >
                        <BackgroundEffect type="vms" mouseX={vmsMouseX} mouseY={vmsMouseY} />
                        <ContentLayer
                            side="vms"
                            isActive={activeSide === 'vms'}
                            onBack={handleBack}
                            accentColor="#a855f7"
                        />
                    </motion.div>


                    {/* ================= RIGHT: PKG IT (LOGIC) ================= */}
                    <motion.div
                        className="side-panel pkg"
                        style={{
                            width: rightWidth, // Always follow slider position
                            flex: 'unset',
                            flexShrink: 0,
                            position: 'relative',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            cursor: activeSide ? 'default' : 'pointer'
                        }}
                        onClick={() => !activeSide && handleSideClick('pkg')}
                        onMouseMove={(e) => handlePanelMouseMove(e, 'pkg')}
                        onMouseLeave={() => handlePanelMouseLeave('pkg')}
                    >
                        <BackgroundEffect type="pkg" mouseX={pkgMouseX} mouseY={pkgMouseY} />
                        <ContentLayer
                            side="pkg"
                            isActive={activeSide === 'pkg'}
                            onBack={handleBack}
                            accentColor="#06b6d4"
                        />
                    </motion.div>


                    {/* ================= DRAG SLIDER (ALWAYS RENDERED TO ANIMATE) ================= */}
                    <>
                        {/* Visual Slider Handle */}
                        <motion.div
                            className="desktop-slider"
                            style={{
                                position: 'absolute',
                                left: leftWidth,
                                top: 0,
                                bottom: 0,
                                width: '40px', // Hit area
                                x: '-50%', // Center on the line
                                zIndex: 60,
                                cursor: 'ew-resize',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                touchAction: 'none', // Critical for touch devices
                                pointerEvents: activeSide ? 'none' : 'auto', // Disable interaction when expanding
                                opacity: activeSide ? 0 : 1, // Fade out at the end? Or keep visible? User wants to SEE it go.
                                // Let's try keeping it visible but maybe fading it out slightly at the very end if needed.
                                // Whatever, user said "see the slider going all the way". So let's keep it visible.
                                // Actually, if we keep `opacity: 1`, it will stay at the edge.
                                // Let's add a transition to opacity so it fades out AFTER it moves?
                                // Or maybe just keep it visible at the edge as a "closed" handle?
                                // "vanish to reveal" -> earlier request said "vanish". 
                                // So let's animate opacity to 0 *during* the move or *after*?
                                // "move all the way to the end and vanish"
                                // I will animate opacity to 0 but with a delay or duration matching the move.
                            }}
                            animate={{
                                opacity: activeSide ? 0 : 1,
                                transition: { duration: 0.3, delay: 0.5 } // Delay fade out so we see it move first
                            }}
                            onPointerDown={(e) => {
                                e.preventDefault(); // prevent selection
                                setIsDragging(true);
                            }}
                        >
                            <div style={{
                                width: '2px',
                                height: '100%',
                                background: 'rgba(255,255,255,0.5)',
                                boxShadow: '0 0 10px rgba(255,255,255,0.3)'
                            }} />
                            <div style={{
                                position: 'absolute',
                                width: '40px',
                                height: '40px',
                                background: '#0a0a0a',
                                border: '1px solid rgba(255,255,255,0.5)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backdropFilter: 'blur(5px)'
                            }}>
                                <span style={{ color: 'white', fontSize: '12px' }}>↔</span>
                            </div>
                        </motion.div>

                        {/* ================= ALLIANCE CARD (FIXED CENTER) ================= */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                top: '12%', // Top placement
                                left: '50%', // FIXED CENTER
                                x: '-50%', // Centered
                                y: cardY, // Animate Y UP
                                opacity: cardOpacity, // Fade opacity
                                zIndex: 70,
                                textAlign: 'center',
                                pointerEvents: cardPointerEvents, // Only clickable when visible
                                width: '300px'
                            }}
                        >
                            <div style={{
                                background: 'rgba(0,0,0,0.85)',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                            }}>
                                <h3 style={{
                                    fontSize: '1rem',
                                    background: 'linear-gradient(to right, #fff, #999)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    margin: '0 0 0.5rem 0',
                                    fontWeight: 600,
                                    letterSpacing: '0.2rem'
                                }}>
                                    THE ALLIANCE
                                </h3>
                                <p style={{
                                    fontSize: '1.8rem',
                                    fontFamily: 'var(--font-family-serif)',
                                    color: 'white',
                                    margin: '0 0 0.5rem 0',
                                    lineHeight: 1.4
                                }}>
                                    Convergence of<br />Vision & Logic
                                </p>
                                <p style={{
                                    fontSize: '0.65rem',
                                    color: 'rgba(6, 182, 212, 0.8)', // Cyan hint
                                    margin: 0,
                                    fontStyle: 'italic',
                                    opacity: 0.8
                                }}>
                                    Click a Logo or Drag the slider to expand
                                </p>
                            </div>
                            {/* Connector Line */}
                            <div style={{
                                width: '1px',
                                height: '60px',
                                background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
                                margin: '0 auto'
                            }} />
                        </motion.div>
                        {/* End Slider */}
                    </>


                    {/* ================= NAVIGATION BUTTONS ================= */}
                    <AnimatePresence>
                        {activeSide === 'vms' && (
                            <motion.button
                                className="nav-btn vms-to-pkg"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => setActiveSide('pkg')}
                            >
                                <ChevronRight size={32} strokeWidth={1.5} />
                            </motion.button>
                        )}

                        {activeSide === 'pkg' && (
                            <motion.button
                                className="nav-btn pkg-to-vms"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => setActiveSide('vms')}
                            >
                                <ChevronLeft size={32} strokeWidth={1.5} />
                            </motion.button>
                        )}
                    </AnimatePresence>

                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ----------------------------------------------------------------------

function BackgroundEffect({ type, mouseX, mouseY }: { type: 'vms' | 'pkg', mouseX: any, mouseY: any }) {
    // Parallax Transforms
    const vmsX = useTransform(mouseX, (v: number) => v / 15);
    const vmsY = useTransform(mouseY, (v: number) => v / 15);

    const pkgGridX = useTransform(mouseX, (v: number) => v / 25);
    const pkgGridY = useTransform(mouseY, (v: number) => v / 25);

    // Creative CSS Backgrounds
    if (type === 'vms') {
        return (
            <div style={{ position: 'absolute', inset: 0, background: '#0a001a', zIndex: 0, overflow: 'hidden' }}>
                {/* Flowing animated mesh/orb with Parallax */}
                <motion.div
                    className="vms-orb"
                    style={{ x: vmsX, y: vmsY }}
                />

                {/* Dynamic Cursor Spotlight */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: '-50%', // Large area to cover movement
                        background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15), transparent 60%)',
                        x: mouseX,
                        y: mouseY,
                        pointerEvents: 'none',
                        mixBlendMode: 'screen'
                    }}
                />

                <style>{`
                    .vms-orb {
                        position: absolute;
                        width: 150%;
                        height: 150%;
                        top: -25%;
                        left: -25%;
                        background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.4), transparent 70%);
                        filter: blur(80px);
                        animation: float 10s ease-in-out infinite;
                        opacity: 0.6;
                    }
                    @keyframes float {
                        0% { transform: scale(1); }
                        33% { transform: scale(1.1); }
                        66% { transform: scale(0.9); }
                        100% { transform: scale(1); }
                    }
                 `}</style>
            </div>
        );
    }

    // PKG SIDE - High Visibility Fix with Dynamic Grid
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            background: '#082f49', // Visible Dark Cyan/Blue (Slate 900-ish)
            zIndex: 0,
            overflow: 'hidden'
        }}>
            {/* Tech Grid with Parallax */}
            <motion.div
                className="pkg-grid"
                style={{ x: pkgGridX, y: pkgGridY }}
            />

            {/* Dynamic Light Overlay */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: '-50%',
                    background: 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1), transparent 50%)',
                    x: mouseX,
                    y: mouseY,
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay'
                }}
            />

            <style>{`
                 .pkg-grid {
                     position: absolute;
                     inset: -10%; /* Larger to allow movement without edges showing */
                     width: 120%;
                     height: 120%;
                     /* Bright Cyan Grid Lines */
                     background-image: 
                         linear-gradient(to right, rgba(34, 211, 238, 0.3) 1px, transparent 1px),
                         linear-gradient(to bottom, rgba(34, 211, 238, 0.3) 1px, transparent 1px);
                     background-size: 40px 40px;
                     animation: scrollGrid 20s linear infinite;

                 }
                 @keyframes scrollGrid {
                     0% { background-position: 0 0; }
                     100% { background-position: 40px 40px; }
                 }
                 /* Dynamic Glow Spot */
              `}</style>
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, transparent 0%, #000 90%)',
                pointerEvents: 'none'
            }} />
        </div>
    );
}

function ContentLayer({ side, isActive, onBack, accentColor }: any) {

    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    // Content Data
    const content = side === 'vms' ? {
        headline: "The Art of Perception",
        text: "Virtual Model Studio crafts the cinematic visuals and brand narratives that captivate audiences. We don't just paint the picture; we design the dream.",
        services: [
            {
                title: "Cinematic 3D Animation",
                details: ["Product Reveals", "Architectural Visualization", "Character Animation", "Motion Graphics", "Visual Effects (VFX)"]
            },
            {
                title: "Hyper-Realistic Visuals",
                details: ["Digital Twin Creation", "Photorealistic Rendering", "Automotive Visualization", "Virtual Photography", "Environment Design"]
            },
            {
                title: "Brand Storytelling",
                details: ["Campaign Direction", "Visual Identity Development", "Narrative Structuring", "Storyboarding", "Creative Consulting"]
            },
            {
                title: "Immersive Experiences (AR/VR)",
                details: ["WebGL Development", "Augmented Reality Filters", "Virtual Reality Showrooms", "Interactive Web Experiences", "3D Product Configurators"]
            },
            {
                title: "Post-Production & Editing",
                details: ["Color Grading", "Sound Design & Mixing", "Editorial Compositing", "Seamless Transitions", "Format Optimization for Social Content"]
            }
        ],
        ceoImage: "/assets/VMS-CEO.jpg",
        ceoName: "Dev Jhoti Sutradhar"
    } : {
        headline: "The Code of Growth",
        text: "PKG IT builds the rigorous digital infrastructure—websites, apps, and AI systems—that converts attention into measurable business growth.",
        services: [
            {
                title: "Enterprise Automation",
                details: ["Workflow Optimization", "ERP Integration", "Process Digitization", "Automated Reporting", "Legacy System Modernization"]
            },
            {
                title: "Custom Software",
                details: ["Web Application Development", "Mobile App Development", "SaaS Product Build", "API Development", "Cloud Architecture"]
            },
            {
                title: "AI Solutioning",
                details: ["Predictive Analytics", "Machine Learning Models", "Chatbot Integration", "Computer Vision", "Data Engineering"]
            },
            {
                title: "Cybersecurity & Compliance",
                details: ["Penetration Testing", "Data Encryption Protocols", "Zero-Trust Architecture", "Compliance Auditing (GDPR/HIPAA)", "Threat Modeling"]
            },
            {
                title: "Web3 & Blockchain Integration",
                details: ["Smart Contract Development", "Decentralized Application (dApp) Architecture", "Tokenomics Strategy", "Secure Wallet Integrations", "Ledger Audits"]
            }
        ],
        ceoImage: "/assets/PKG_IT-CEO.jpeg",
        ceoName: "Pranab Kumar"
    };

    // Stagger Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        },
        exit: { opacity: 0 }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            // maxWidth: '600px', // Removed to allow full-width click/scroll
            // padding: '2rem', // Moved to inner
            // paddingTop: ... 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Always center the content column horizontally in the panel
            // textAlign: ... // Moved to inner
            transition: 'all 0.5s ease',
            height: '100%',
            justifyContent: isActive ? 'flex-start' : 'center',
            overflowY: isActive ? 'auto' : 'hidden',
            overflowX: 'hidden',
            maxHeight: '100vh',
        }} className={`custom-scrollbar ${side}-scroll`}>
            <style>{`
                /* Neon Pulse Scrollbar */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                    transition: all 0.3s ease;
                }
                /* VMS Theme (Purple) */
                .vms-scroll::-webkit-scrollbar-thumb:hover,
                .vms-scroll::-webkit-scrollbar-thumb:active {
                    background: #a855f7;
                    box-shadow: 0 0 10px #a855f7, 0 0 20px #a855f7;
                }
                /* PKG Theme (Cyan) */
                .pkg-scroll::-webkit-scrollbar-thumb:hover,
                .pkg-scroll::-webkit-scrollbar-thumb:active {
                    background: #06b6d4;
                    box-shadow: 0 0 10px #06b6d4, 0 0 20px #06b6d4;
                }
                
                /* Firefox Support */
                .vms-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(168, 85, 247, 0.5) transparent;
                }
                .pkg-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(6, 182, 212, 0.5) transparent;
                }
            `}</style>

            {/* Inner Content Wrapper (Constrained Width) */}
            <div style={{
                width: '100%',
                maxWidth: '600px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isActive ? 'flex-start' : 'center',
                textAlign: isActive ? 'left' : 'center',
                padding: '2rem',
                paddingTop: isActive ? '6rem' : '2rem',
                transition: 'all 0.5s ease',
            }}>
                {/* LOGOS / TYPOGRAPHY */}
                <motion.div layout style={{ marginBottom: isActive ? '2rem' : '0' }}>
                    {side === 'vms' ? (
                        // Hero-style Typography for VMS
                        <div style={{ textAlign: isActive ? 'left' : 'center' }}>
                            <h2 style={{
                                fontSize: isActive ? '3rem' : 'clamp(2.5rem, 6vw, 4rem)',
                                fontWeight: '400',
                                fontFamily: 'var(--font-family-serif)',
                                fontStyle: 'italic',
                                lineHeight: '0.9',
                                letterSpacing: '-0.05em',
                                margin: 0,
                                color: '#ffffff',
                                textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                                whiteSpace: 'nowrap'
                            }}>
                                Virtual<br />Model<br />Studio
                            </h2>
                        </div>
                    ) : (
                        // PKG Logo / Text
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.9)', // High opacity white/glass
                            backdropFilter: 'blur(10px)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)', // Cyan glow
                            marginBottom: '1rem'
                        }}>
                            <img
                                src="/assets/PKG_IT-LOGO.png"
                                alt="PKG IT"
                                loading="lazy"
                                width={150}
                                height={50}
                                style={{
                                    height: '50px',
                                    width: 'auto',
                                    objectFit: 'contain',
                                    filter: 'brightness(1.1) contrast(1.1)' // Slight enhancement
                                }}
                            />
                        </div>
                    )}

                    {!isActive && (
                        <p style={{
                            marginTop: '1rem',
                            color: accentColor,
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            fontSize: '0.9rem',
                            fontWeight: 600
                        }}>
                            {side === 'vms' ? 'Creative Intelligence' : 'Technical Architecture'}
                        </p>
                    )}
                </motion.div>


                {/* EXPANDED CONTENT */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            style={{
                                color: 'rgba(255,255,255,0.9)',
                                alignSelf: 'stretch',
                                display: 'flex',
                                flexDirection: 'column', // Stack content
                                height: 'auto'
                            }}
                        >
                            {/* CEO Profile - Rounded Image */}
                            <motion.div
                                variants={itemVariants}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '2rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '1rem',
                                    borderRadius: '50px',
                                    border: `1px solid ${accentColor} 40`,
                                    alignSelf: 'flex-start'
                                }}
                            >
                                <img
                                    src={content.ceoImage}
                                    alt={content.ceoName}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: `2px solid ${accentColor} `
                                    }}
                                />
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'white', fontWeight: 600 }}>{content.ceoName}</h3>
                                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Founder & CEO
                                    </span>
                                </div>
                            </motion.div>

                            {/* Subtitle shown here when active */}
                            <motion.h4 variants={itemVariants} style={{
                                color: accentColor,
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                fontSize: '1rem',
                                margin: '0 0 1rem 0',
                                fontWeight: 600
                            }}>
                                {side === 'vms' ? 'Creative Intelligence' : 'Technical Architecture'}
                            </motion.h4>

                            <motion.h4 variants={itemVariants} style={{
                                fontSize: '2rem',
                                marginBottom: '1rem',
                                fontFamily: 'var(--font-family-serif)'
                            }}>{content.headline}</motion.h4>

                            <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                                {content.text}
                            </motion.p>

                            <motion.div variants={itemVariants} style={{ display: 'grid', gap: '1rem' }}>
                                {content.services.map((service, i) => (
                                    <div key={i}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveAccordion(activeAccordion === i ? null : i);
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {/* Accordion Header */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '1rem',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '6px', height: '6px', background: accentColor, borderRadius: '50%' }} />
                                                <span style={{ fontSize: '1rem', fontWeight: 500, color: 'white' }}>{service.title}</span>
                                            </div>
                                            <span style={{
                                                transform: activeAccordion === i ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s ease',
                                                color: 'rgba(255,255,255,0.5)'
                                            }}>▼</span>
                                        </div>

                                        {/* Accordion Body */}
                                        <AnimatePresence>
                                            {activeAccordion === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    style={{ overflow: 'hidden' }}
                                                >
                                                    <div style={{
                                                        padding: '0 1rem 1rem 1rem',
                                                        paddingLeft: '2.5rem',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '0.5rem'
                                                    }}>
                                                        {service.details.map((detail, idx) => (
                                                            <motion.div
                                                                key={idx}
                                                                initial={{ x: -10, opacity: 0 }}
                                                                animate={{ x: 0, opacity: 1 }}
                                                                transition={{ delay: idx * 0.05 }}
                                                                style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}
                                                            >
                                                                • {detail}
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.button
                                variants={itemVariants}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onBack();
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    marginTop: '3rem',
                                    background: 'transparent',
                                    border: `1px solid ${accentColor} `,
                                    color: accentColor,
                                    padding: '1rem 2rem',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    fontSize: '0.8rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    alignSelf: 'flex-start'
                                }}
                            >
                                <ArrowLeft size={16} /> Back to Alliance
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
