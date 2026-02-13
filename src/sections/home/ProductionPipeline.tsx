import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
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
        text: "Leveraging custom-trained AI models (Midjourney/Runway) to generate high-fidelity base assets, reducing production time by 60%.",
        icon: Sparkles,
        color: "#5D8AA8"
    },
    {
        id: 3,
        title: "Motion & Physics",
        text: "Injecting soul into static generations. We apply 3D camera movements, particle physics, and cinematic color grading in After Effects.",
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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section
            ref={containerRef}
            style={{
                height: '400vh',
                position: 'relative',
                background: 'var(--color-bg-primary)',
                color: 'var(--color-text-primary)'
            }}
        >
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1000px'
            }}>

                {/* Background Elements */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #f0f0f0 100%)',
                    zIndex: 0,
                    opacity: 0.5
                }} />

                {/* Section Header */}
                <SectionHeader progress={scrollYProgress} />

                {/* Creative Horizontal Progress Bar */}
                <div style={{
                    position: 'absolute',
                    bottom: 'calc(10vh - 50px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '200px',
                    height: '2px',
                    background: 'rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    borderRadius: '2px',
                    zIndex: 20
                }}>
                    <motion.div style={{
                        width: '100%',
                        height: '100%',
                        background: 'var(--color-copper)',
                        scaleX: scrollYProgress,
                        transformOrigin: 'left'
                    }} />
                </div>


                {/* Cards Container */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1400px',
                    height: '60vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10
                }}>
                    {steps.map((step, index) => (
                        <PipelineCard
                            key={step.id}
                            step={step}
                            index={index}
                            total={steps.length}
                            progress={scrollYProgress}
                            isMobile={isMobile}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

// --- SECTION HEADER COMPONENT ---
function SectionHeader({ progress }: { progress: MotionValue<number> }) {
    // 1. FAST ENTRY: [0, 0.05]
    const opacity = useTransform(progress, [0, 0.05], [0, 1]);
    const scale = useTransform(progress, [0, 0.05], [0.8, 1]);
    const y = useTransform(progress, [0, 0.05], [50, 0]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: '15vh',
                textAlign: 'center',
                zIndex: 10,
                opacity,
                scale,
                y
            }}
        >
            <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 'var(--font-weight-light)',
                letterSpacing: 'var(--letter-spacing-tight)',
                lineHeight: 1,
                margin: 0,
                color: 'var(--color-text-primary)'
            }}>
                Production<br />
                <span style={{ fontFamily: 'var(--font-family-serif)', fontStyle: 'italic' }}>Pipeline</span>
            </h2>
        </motion.div>
    );
}

// --- PIPELINE CARD COMPONENT (HYBRID LOGIC) ---
function PipelineCard({ step, index, total, progress, isMobile }: {
    step: any,
    index: number,
    total: number,
    progress: MotionValue<number>,
    isMobile: boolean
}) {
    // 1. TRIGGERED ENTRY (The "Race")
    // Trigger point: when user scrolls > 20% + stagger
    // Mobile: Spaced out slightly more for cleaner "replace" feel? Or keep same.
    const stagger = isMobile ? 0.15 : 0.1;
    const triggerThreshold = 0.2 + (index * stagger);
    const [hasTriggered, setHasTriggered] = useState(index === 0); // First card always visible/triggered? 
    // Actually, first card should just be there or slide in? 
    // Existing logic: index 0 triggers at 0.2. Before that? Offscreen? 
    // Let's make index 0 start visible or trigger immediately.
    // If index 0, trigger at 0.

    useEffect(() => {
        const threshold = index === 0 ? 0 : triggerThreshold;
        const unsubscribe = progress.on("change", (latest) => {
            if (latest >= threshold && !hasTriggered) {
                setHasTriggered(true);
            } else if (latest < threshold && hasTriggered) {
                setHasTriggered(false);
            }
        });
        return unsubscribe;
    }, [progress, triggerThreshold, hasTriggered, index]);


    // 2. POSITIONS
    const screenH = typeof window !== 'undefined' ? window.innerHeight : 1000;
    const offscreenY = screenH * 0.8; // Start from bottom

    // Stack Position
    const baseOffset = 0;
    const stackGap = 100;

    // Mobile: No stack gap (they overlap/replace). Desktop: Stack.
    const targetStackY = isMobile
        ? 0
        : baseOffset + (index * stackGap);

    // Spring Physics
    const springConfig = { damping: 20, stiffness: 90, mass: 1 };
    const rawY = useSpring(index === 0 ? targetStackY : offscreenY, springConfig);

    useEffect(() => {
        // If Mobile + Index 0: Always at target (static).
        // Else: trigger logic.
        if (isMobile && index === 0) {
            rawY.set(targetStackY);
        } else {
            rawY.set(hasTriggered ? targetStackY : offscreenY);
        }
    }, [hasTriggered, targetStackY, offscreenY, rawY, isMobile, index]);

    // 3. DYNAMIC STACK LIFT (Desktop Only)
    // As we scroll deeper (more cards enter), lift the whole group UP.
    const dynamicLift = useTransform(
        progress,
        [0.2, 0.6, 0.8, 0.95],
        [0, 150, 150, 0]
    );

    // 4. FAN PHASE (Desktop Only)
    const fanStart = 0.8;
    const fanEnd = 0.98;
    const fanAdjustment = useTransform(
        progress,
        [fanStart, fanEnd],
        [0, isMobile ? 0 : targetStackY]
    );

    // 5. OPACITY (Mobile Only - Fade Out Exiting Cards)
    // Next card enters at `triggerThreshold + stagger`. 
    // So this card should fade out around then.
    // Last card stays visible.
    const fadeStart = triggerThreshold + stagger;
    const opacityMobile = useTransform(
        progress,
        [fadeStart, fadeStart + 0.05],
        [1, 0]
    );
    // Desktop: Always 1 (managed by stacking order)
    const opacity = isMobile && index < total - 1 ? opacityMobile : 1;


    // Final Y Composition
    // Mobile: Just rawY (Spring). 
    // Desktop: rawY - lift - fan.
    const finalY = useTransform(() => {
        if (isMobile) return rawY.get();
        return rawY.get() - dynamicLift.get() - fanAdjustment.get();
    });


    // X SPREAD (Fan Phase - Desktop Only)
    const cardWidth = 320;
    const gap = 20;
    const totalFanWidth = (total * cardWidth) + ((total - 1) * gap);
    const xFanTarget = (index * (cardWidth + gap)) - (totalFanWidth / 2) + (cardWidth / 2);

    const xDesktop = useTransform(
        progress,
        [fanStart, fanEnd],
        ['0px', `${xFanTarget}px`]
    );

    const x = isMobile ? 0 : xDesktop;
    const rotateZ = useTransform(progress, [fanStart, fanEnd], ['0deg', '0deg']);

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: '28vh',
                y: finalY,
                x,
                opacity, // Apply Opacity
                rotateZ,
                zIndex: index,
            }}
        >
            <LightCard step={step} />
        </motion.div>
    )
}

function LightCard({ step }: { step: any }) {
    return (
        <div style={{
            width: '300px',
            height: '380px', // REDUCED HEIGHT (was 450px)
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.05)',
            borderRadius: '24px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // CHANGED from space-between
            gap: '1.5rem', // ADDED GAP
            boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.1)',
            color: 'var(--color-text-primary)',
            textAlign: 'left',
            position: 'relative',
            overflow: 'hidden'
        }}>

            {/* Icon Area */}
            <div style={{
                width: '60px',
                height: '60px',
                flexShrink: 0,
                borderRadius: '50%',
                background: 'var(--color-bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // marginBottom: '1rem', // REMOVED (Handled by gap)
                border: `1px solid ${step.color}`
            }}>
                <step.icon size={28} color={step.color} strokeWidth={1.5} />
            </div>

            {/* Content */}
            <div style={{ zIndex: 2 }}>
                <h3 style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem', // REDUCED
                    lineHeight: 1.1,
                    color: '#1d1d1f'
                }}>
                    {step.title}
                </h3>

                <p style={{
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: '0.9rem', // SMALLER TEXT
                    lineHeight: 1.5,
                    color: '#6e6e73'
                }}>
                    {step.text}
                </p>
            </div>

            {/* Decorative Number */}
            <div style={{
                fontSize: '4rem',
                fontWeight: 700,
                color: 'rgba(0,0,0,0.03)',
                position: 'absolute',
                bottom: '-0.5rem',
                right: '0.5rem',
                fontFamily: 'var(--font-family-sans)',
                lineHeight: 1,
                zIndex: 1
            }}>
                0{step.id}
            </div>
        </div>
    );
}
