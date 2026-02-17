import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type MouseEvent } from 'react';

// Data derived from "What We Do.txt"
const services = [
    {
        title: "AI-Generated Video & Content",
        description: "High-quality AI videos for brand campaigns, product demos, and social media.",
        tags: ["Brand Campaigns", "Product Demos", "Corporate Presentations", "Social Media Ads"]
    },
    {
        title: "Website Design & Development",
        description: "Modern, high-conversion websites that represent your brand professionally.",
        tags: ["Corporate Profile", "E-commerce", "Landing Pages", "3D Hero Sections"]
    },
    {
        title: "AI for Industrial Sectors",
        description: "Specialized AI solutions for Lift, Fire Safety, and Industrial automation.",
        tags: ["Lead Generation", "Inquiry Automation", "Training Avatars", "Predictive Maintenance"]
    },
    {
        title: "AI-Powered CRM Systems",
        description: "Intelligent systems for automated lead capture and customer relationship management.",
        tags: ["Auto Lead Capture", "AI Chatbots", "Call Center Automation", "Smart Follow-ups"]
    },
    {
        title: "Market Intelligence & Analytics",
        description: "Deep dive analysis of audience behavior, competitor activity, and content performance.",
        tags: ["Audience Behavior", "Competitor Activity", "Sentiment Analysis", "Growth Mapping"]
    },
    {
        title: "Performance Dashboards",
        description: "Real-time AI dashboards to track KPIs, conversion rates, and brand health.",
        tags: ["Lead Gen Tracking", "ROI Analysis", "Sales Pipeline", "Brand Health Score"]
    }
];

export function WhatWeDoSection() {
    const containerRef = useRef<HTMLElement>(null);
    // Removed unused scroll hooks for performance


    return (
        <section
            ref={containerRef}
            onMouseMove={(e: MouseEvent<HTMLElement>) => {
                const { left, top } = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - left;
                const y = e.clientY - top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
            }}
            style={{
                marginTop: '-10vh', // Pull up to overlap hero slightly
                position: 'relative',
                zIndex: 10,
                backgroundColor: 'rgba(5, 5, 5, 0.65)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                padding: '20vh 5vw', // Symmetrical top and bottom padding
                minHeight: '100vh', // Ensure full screen height
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Center content vertically
                overflow: 'hidden'
            }}
        >
            {/* Ambient Background Glows */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                left: '-10%',
                width: '50vw',
                height: '50vw',
                background: 'radial-gradient(circle, rgba(100,100,255,0.08) 0%, rgba(0,0,0,0) 70%)',
                filter: 'blur(60px)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-10%',
                width: '60vw',
                height: '60vw',
                background: 'radial-gradient(circle, rgba(255,100,200,0.05) 0%, rgba(0,0,0,0) 70%)',
                filter: 'blur(80px)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <div style={{
                position: 'relative',
                zIndex: 1,
                maxWidth: '1400px',
                margin: '0 auto',
                width: '100%'
            }}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '300',
                        color: '#fff',
                        marginBottom: '4rem',
                        marginTop: 0,
                        textAlign: 'center',
                        letterSpacing: '-0.02em'
                    }}
                >
                    Our <span style={{ fontFamily: 'var(--font-family-serif)', fontStyle: 'italic', fontWeight: 400 }}>Capabilities</span>
                </motion.h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2rem',
                    perspective: '1000px'
                }}>
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Subtle parallax for the border or content inside
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <motion.div
            ref={cardRef}
            initial={{
                opacity: 0,
                y: 50,
                scale: 0.9,
                filter: "blur(10px)"
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)"
            }}
            // Smoother trigger with better margin to prevent flickering at edges
            viewport={{ once: false, amount: 0.2, margin: "0px 0px -50px 0px" }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1], // Custom snappy ease-out
                delay: index * 0.05
            }}
            // Reduced hover strength
            whileHover={{
                scale: 1.02,
                rotateX: 2,
                rotateY: 2,
                z: 10,
                transition: { duration: 0.3 }
            }}
            style={{
                y,
                transformStyle: 'preserve-3d',
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backdropFilter: 'blur(10px)',
                overflow: 'hidden',
                minHeight: '300px'
            }}
        >
            {/* Hover Reveal Gradient */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)',
                    zIndex: 0,
                    opacity: 0,
                }}
                whileHover={{ opacity: 1 }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '400',
                    marginBottom: '1rem',
                    color: '#fff',
                    letterSpacing: '-0.01em'
                }}>
                    {service.title}
                </h3>

                <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: '2rem'
                }}>
                    {service.description}
                </p>
            </div>

            <div style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
            }}>
                {service.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '100px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'rgba(255, 255, 255, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        {tag}
                    </span>
                ))}
                {service.tags.length > 3 && (
                    <span style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        color: 'rgba(255, 255, 255, 0.4)',
                    }}>
                        +{service.tags.length - 3} more
                    </span>
                )}
            </div>
        </motion.div>
    );
}
