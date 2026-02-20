import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, MotionValue, type Variants } from 'framer-motion';
import { Compass, Sparkles, Film, Globe } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "Discovery & Blueprint",
        text: "We align creative vision with technical constraints, mapping out storyboards that blend brand identity with high-conversion psychology.",
        icon: Compass,
        color: "var(--color-copper)"
    },
    {
        id: 2,
        title: "Generative Synthesis",
        text: "Leveraging custom-trained AI models to generate high-fidelity base assets, reducing production time by 60%.",
        icon: Sparkles,
        color: "#5D8AA8"
    },
    {
        id: 3,
        title: "Motion & Physics",
        text: "Injecting soul into static generations. We apply 3D camera movements, particle physics, and cinematic color grading.",
        icon: Film,
        color: "#9F2B68"
    },
    {
        id: 4,
        title: "Deployment & Scale",
        text: "Delivery of optimized 4K formats for all platforms, ready for instant integration into high-performance web backends.",
        icon: Globe,
        color: "#00A86B"
    }
];

export function ProductionPipeline() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeCardIndex, setActiveCardIndex] = useState(-1);
    const [viewState, setViewState] = useState<'intro' | 'flow' | 'fan-out'>('intro');

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768; // Simple check for mobile

    // Detect state changes tied to scroll milestones
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // --- PHASE 1: INTRO (0 - 0.15) ---
        if (latest < 0.15) {
            setViewState('intro');
            setActiveCardIndex(-1);
        }
        // --- PHASE 2: FLOW (0.15 - 0.85) ---
        else if (latest >= 0.15 && latest < 0.85) {
            setViewState('flow');
            // Milestones for triggering card entry
            // 4 Cards spread over 0.70 range -> approx 0.175 per card window
            // Card 1 triggers at 0.15
            // Card 2 triggers at 0.325
            // Card 3 triggers at 0.50
            // Card 4 triggers at 0.675

            if (latest >= 0.15 && latest < 0.325) setActiveCardIndex(0);
            else if (latest >= 0.325 && latest < 0.50) setActiveCardIndex(1);
            else if (latest >= 0.50 && latest < 0.675) setActiveCardIndex(2);
            else if (latest >= 0.675) setActiveCardIndex(3);
        }
        // --- PHASE 3: FAN OUT (0.85 - 1.0) ---
        else {
            setViewState('fan-out');
            setActiveCardIndex(4); // All active effectively
        }
    });

    return (
        <section
            ref={containerRef}
            style={{
                height: '600vh',
                background: '#0a0a0a',
                color: '#fff',
                position: 'relative'
            }}
        >
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflow: 'hidden',
                perspective: viewState === 'fan-out' ? 'none' : '1200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Background Atmosphere */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 30%, rgba(20,20,30,1) 0%, #000 70%)',
                    zIndex: 0
                }} />

                {/* Grid Floor */}
                <div style={{
                    position: 'absolute',
                    bottom: '-20%',
                    left: '-50%',
                    width: '200%',
                    height: '100%',
                    background: `
                        linear-gradient(transparent 0%, rgba(50,50,80,0.1) 100%),
                        repeating-linear-gradient(90deg, transparent 0, transparent 49px, rgba(255,255,255,0.03) 50px),
                        repeating-linear-gradient(0deg, transparent 0, transparent 49px, rgba(255,255,255,0.03) 50px)
                    `,
                    transform: 'rotateX(60deg)',
                    transformOrigin: '50% 100%',
                    pointerEvents: 'none',
                    zIndex: 0
                }} />

                {/* Persistent Headline */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        position: 'absolute',
                        top: '10%',
                        zIndex: 20,
                        textAlign: 'center',
                        textShadow: '0 0 30px rgba(0,0,0,0.8)'
                    }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 200,
                        letterSpacing: '-0.02em',
                        margin: 0
                    }}>
                        Production <span style={{ fontFamily: 'var(--font-family-serif)', fontStyle: 'italic', fontWeight: 400 }}>Pipeline</span>
                    </h2>
                </motion.div>

                {/* Cards Container */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transformStyle: 'preserve-3d',
                    zIndex: 10
                }}>
                    {steps.map((step, index) => {
                        // Define filler range logic
                        // 0.15 duration per step used previously
                        // If card 1 is active (0.15 -> 0.325)
                        // Fill should happen from start of active to end of active
                        const start = 0.15 + (index * 0.175);
                        const end = start + 0.175;

                        const isActive = index === activeCardIndex;
                        const hasPassed = index < activeCardIndex;

                        // Special check for Fan Out
                        const isFanOut = viewState === 'fan-out';

                        return (
                            <CinematicCard
                                key={step.id}
                                step={step}
                                index={index}
                                isActive={isActive}
                                hasPassed={hasPassed}
                                isFanOut={isFanOut}
                                globalScroll={scrollYProgress}
                                fillRange={[start, end]}
                                total={steps.length}
                                isMobile={isMobile}
                            />
                        )
                    })}
                </div>

                {/* Circular Indicators (Right Side) */}
                <div style={{
                    position: 'absolute',
                    right: '5%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    zIndex: 50
                }}>
                    <AnimatePresence>
                        {(activeCardIndex >= 0 || viewState === 'fan-out') && steps.map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <IndicatorDot
                                    isActive={i === activeCardIndex}
                                    isCompleted={i < activeCardIndex || viewState === 'fan-out'}
                                    color={steps[i].color}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

function CinematicCard({
    step,
    index,
    isActive,
    hasPassed,
    isFanOut,
    globalScroll,
    fillRange,
    total,
    isMobile
}: {
    step: any,
    index: number,
    isActive: boolean,
    hasPassed: boolean,
    isFanOut: boolean,
    globalScroll: MotionValue<number>,
    fillRange: [number, number],
    total: number,
    isMobile: boolean
}) {
    // --- ANIMATION STATE LOGIC ---

    const cardVariants: Variants = {
        initial: {
            z: -2000,
            y: 0,
            opacity: 0.4,
            scale: 0.8,
            filter: "blur(20px)",
            rotateX: 0
        },
        active: {
            z: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            rotateX: 0,
            transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1]
            }
        },
        exit: {
            z: 500,
            y: -1000,
            opacity: 0,
            scale: 1.2,
            filter: "blur(10px)",
            rotateX: 20,
            transition: { duration: 0.8, ease: "easeInOut" }
        },
        fanOut: {
            z: 0,
            y: isMobile ? index * 40 : 0, // Vertical stack for mobile
            x: isMobile ? 0 : ((index - (total - 1) / 2) * (320 + 40)),
            opacity: 1,
            scale: isMobile ? 0.9 : 0.85,
            filter: "blur(0px)",
            rotateX: 0,
            transition: {
                duration: 0.8,
                delay: index * 0.05,
                ease: "backOut"
            }
        }
    };

    // Determine current variant
    let currentVariant = "initial";
    if (isFanOut) currentVariant = "fanOut";
    else if (isActive) currentVariant = "active";
    else if (hasPassed) currentVariant = "exit";

    // Scroll Progress Bar Logic
    const fillHeight = useTransform(globalScroll, fillRange, ["0%", "100%"]);

    return (
        <motion.div
            initial="initial"
            animate={currentVariant}
            variants={cardVariants}
            style={{
                position: 'absolute',
                width: 'min(85vw, 450px)',
                minHeight: '280px',
                zIndex: index,
                transformOrigin: 'center center'
            }}
        >
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                background: 'rgba(20, 20, 25, 0.9)', // High opacity for clarity
                backdropFilter: 'blur(40px)', // High blur for glass feel
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                boxShadow: `0 30px 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(0,0,0,0.3)`,
                padding: '3rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                overflow: 'hidden'
            }}>
                {/* Scroll Progress Bar (Bottom) */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'rgba(255,255,255,0.05)'
                }}>
                    <motion.div style={{
                        height: '100%',
                        width: fillHeight,
                        background: step.color,
                        boxShadow: `0 0 15px ${step.color}`
                    }} />
                </div>

                {/* Neon Edge Glow (Top) */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
                    opacity: 1
                }} />

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        minWidth: '48px', height: '48px',
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.05)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: `1px solid ${step.color}40`,
                        color: step.color
                    }}>
                        <step.icon size={24} />
                    </div>
                    <h3 style={{
                        margin: 0,
                        fontSize: '1.6rem', // Slightly smaller
                        fontFamily: 'var(--font-family-serif)',
                        fontWeight: 500,
                        color: '#fff',
                        whiteSpace: 'normal',
                        lineHeight: 1.2
                    }}>
                        {step.title}
                    </h3>
                </div>

                {/* Body */}
                <p style={{
                    margin: 0,
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.95)',
                    fontWeight: 300,
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}>
                    {step.text}
                </p>

                {/* Tech Decoration */}
                <div style={{
                    marginTop: 'auto',
                    paddingTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.7rem',
                    color: 'rgba(255,255,255,0.3)',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                }}>
                    <span>Step 0{step.id}</span>

                </div>
            </div>
        </motion.div>
    );
}

function IndicatorDot({ isActive, isCompleted, color }: { isActive: boolean, isCompleted: boolean, color: string }) {
    return (
        <motion.div
            animate={{
                scale: isActive ? 1.5 : 1,
                opacity: (isActive || isCompleted) ? 1 : 0.3,
                borderColor: isActive ? color : '#fff',
                background: isCompleted ? color : 'transparent'
            }}
            style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: '2px solid #fff',
                boxShadow: isActive ? `0 0 15px ${color}` : 'none'
            }}
        />
    )
}
