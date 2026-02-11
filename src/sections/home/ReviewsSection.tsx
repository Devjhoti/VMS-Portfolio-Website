import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';

interface Review {
    id: number;
    name: string;
    role: string;
    brand: string;
    image: string;
    text: string;
    fullText: string;
    rating: number;
    initialX: number;
    initialY: number;
    depth: number;
}

const REVIEWS: Review[] = [
    {
        id: 1,
        name: "Elena Rossi",
        role: "Global Creative Director",
        brand: "Gucci",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "VMS redefined our digital runway experience...",
        fullText: "Virtual Model Studio redefined our digital runway experience. The hyper-realistic avatars allowed us to showcase our collection in ways physical constraints previously made impossible. A game-changer for digital fashion.",
        rating: 5,
        initialX: 10,
        initialY: 20,
        depth: 0.8
    },
    {
        id: 2,
        name: "Jean-Pierre Dubois",
        role: "VP of Digital Strategy",
        brand: "Chanel",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "Ethereal, yet technically flawless...",
        fullText: "Ethereal, yet technically flawless. The integration of 3D assets into our campaign felt seamless. VMS understands the nuance of luxury—where every pixel must whisper quality.",
        rating: 5,
        initialX: 70,
        initialY: 30,
        depth: 0.6
    },
    {
        id: 3,
        name: "Sarah Jenkins",
        role: "Head of Innovation",
        brand: "Ralph Lauren",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        text: "The speed of iteration was incredible...",
        fullText: "The speed of iteration was incredible. We could visualize entire seasonal shifts in days, not weeks. VMS brings a level of agility to heritage brands that is absolutely essential today.",
        rating: 5,
        initialX: 20,
        initialY: 70,
        depth: 0.9
    },
    {
        id: 4,
        name: "Michael Chang",
        role: "Brand Director",
        brand: "Levi's",
        image: "https://randomuser.me/api/portraits/men/86.jpg",
        text: "Perfectly captured the texture of denim...",
        fullText: "Denim is notoriously hard to render digitally. VMS perfectly captured the texture, weight, and wear of our fabrics. The virtual models moved with the same attitude as our real ones.",
        rating: 5,
        initialX: 60,
        initialY: 60,
        depth: 0.7
    },
    {
        id: 5,
        name: "Amara Singh",
        role: "Marketing Lead",
        brand: "Dabur",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
        text: "Blending tradition with futuristic tech...",
        fullText: "Blending tradition with futuristic tech is our motto, and VMS delivered exactly that. The visual storytelling for our new line was immersive and deeply engaging for our younger audience.",
        rating: 5,
        initialX: 40,
        initialY: 45,
        depth: 0.5
    },
    {
        id: 6,
        name: "Louis Durand",
        role: "Art Director",
        brand: "Louis Vuitton",
        image: "https://randomuser.me/api/portraits/men/54.jpg",
        text: "Absolute luxury in every frame...",
        fullText: "Absolute luxury in every frame. The lighting, readability of materials, and the sheer artistic direction were on par with our highest production standards. VMS is the future.",
        rating: 5,
        initialX: 15,
        initialY: 40,
        depth: 0.4
    },
    {
        id: 7,
        name: "Sophie Laurent",
        role: "Senior Digital Designer",
        brand: "Burberry",
        image: "https://randomuser.me/api/portraits/women/23.jpg",
        text: "A seamless bridge between physical and digital...",
        fullText: "A seamless bridge between physical and digital. VMS helped us translate our classic check patterns into the metaverse with stunning accuracy. The team's attention to detail is unmatched.",
        rating: 5,
        initialX: 80,
        initialY: 15,
        depth: 0.75
    },
    {
        id: 8,
        name: "Alessandro Ricci",
        role: "Chief Marketing Officer",
        brand: "Armani",
        image: "https://randomuser.me/api/portraits/men/41.jpg",
        text: "Elegance digitized. Simply superb.",
        fullText: "Elegance digitized. Simply superb. We were skeptical about virtual models initially, but VMS proved that the essence of Armani could be preserved and even heightened in a digital environment.",
        rating: 5,
        initialX: 30,
        initialY: 80,
        depth: 0.55
    },
    {
        id: 9,
        name: "Priya Sharma",
        role: "Director of Brand Experience",
        brand: "Tata",
        image: "https://randomuser.me/api/portraits/women/9.jpg",
        text: "Innovation that drives engagement...",
        fullText: "Innovation that drives engagement. VMS's 3D solutions gave our campaign a cutting-edge appeal that resonated strongly with our tech-savvy consumers. Highly recommended.",
        rating: 5,
        initialX: 65,
        initialY: 85,
        depth: 0.85
    }
];

export function ReviewsSection() {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // We no longer track "read" reviews or stack them. 
    // The only interaction state is whether a review is selected (modal open).

    return (
        <section
            ref={containerRef}
            style={{
                position: 'relative',
                minHeight: '100vh', // Allow scroll on mobile
                height: isMobile ? 'auto' : '100vh',
                overflow: isMobile ? 'visible' : 'hidden', // Allow scroll on mobile
                background: '#0F1115',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: isMobile ? 'flex-start' : 'center',
                perspective: '1000px',
                padding: isMobile ? '6rem 1rem 4rem' : '0'
            }}
        >
            {/* Background Atmosphere */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'radial-gradient(circle at center, #1a1f2e 0%, #000000 100%)',
                zIndex: 0
            }} />

            {/* Curtain Reveal */}
            {!isMobile && (
                <>
                    <motion.div
                        initial={{ x: 0 }}
                        animate={isInView ? { x: '-100%' } : { x: 0 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'absolute',
                            top: 0, left: 0, width: '50%', height: '100%',
                            background: '#0F1115', zIndex: 20,
                        }}
                    />
                    <motion.div
                        initial={{ x: 0 }}
                        animate={isInView ? { x: '100%' } : { x: 0 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'absolute',
                            top: 0, right: 0, width: '50%', height: '100%',
                            background: '#0F1115', zIndex: 20,
                        }}
                    />
                </>
            )}

            <h2 style={{
                position: isMobile ? 'relative' : 'absolute',
                top: isMobile ? '0' : '10%',
                left: isMobile ? '0' : '50%',
                transform: isMobile ? 'none' : 'translateX(-50%)',
                fontFamily: 'var(--font-family-serif)',
                color: 'rgba(255,255,255,0.05)',
                fontSize: isMobile ? '3rem' : 'clamp(4rem, 10vw, 8rem)',
                whiteSpace: 'nowrap',
                zIndex: 1, // Visible above background
                pointerEvents: 'none',
                textAlign: 'center',
                lineHeight: 1,
                marginBottom: isMobile ? '3rem' : '0'
            }}>
                CLIENT VOICES
            </h2>

            {isMobile ? (
                <MobileReviewsView
                    onSelect={setSelectedReview}
                />
            ) : (
                /* Floating Reviews Container */
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 1
                }}>
                    {REVIEWS.map((review) => (
                        <BouncingCard
                            key={review.id}
                            review={review}
                            onClick={() => setSelectedReview(review)}
                            isPaused={selectedReview !== null}
                        />
                    ))}
                </div>
            )}

            <AnimatePresence>
                {selectedReview && (
                    <ReviewModal
                        review={selectedReview}
                        onClose={() => setSelectedReview(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

function MobileReviewsView({ onSelect }: { onSelect: (r: Review) => void }) {
    const [showAll, setShowAll] = useState(false);
    const displayedReviews = showAll ? REVIEWS : REVIEWS.slice(0, 4);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            width: '100%',
            maxWidth: '500px',
            zIndex: 2,
            position: 'relative'
        }}>
            {displayedReviews.map((review, index) => (
                <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => onSelect(review)}
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img
                            src={review.image}
                            alt={review.name}
                            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                            <h4 style={{ margin: 0, color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>{review.name}</h4>
                            <p style={{ margin: 0, color: 'var(--color-copper)', fontSize: '0.75rem' }}>{review.brand}</p>
                        </div>
                    </div>
                    {/* Simplified content for mobile card if needed, effectively same structure */}
                    <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(review.rating)].map((_, i) => (
                            <span key={i} style={{ color: '#FFD700', fontSize: '0.8rem' }}>★</span>
                        ))}
                    </div>
                    <p style={{
                        margin: 0,
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.85rem',
                        fontStyle: 'italic',
                        lineHeight: 1.4
                    }}>
                        "{review.text}"
                    </p>
                </motion.div>
            ))}

            {!showAll && (
                <motion.button
                    onClick={() => setShowAll(true)}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--color-copper)',
                        color: 'var(--color-copper)',
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        marginTop: '1rem',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        alignSelf: 'center'
                    }}
                >
                    See More
                </motion.button>
            )}
        </div>
    );
}

function BouncingCard({
    review,
    onClick,
    isPaused
}: {
    review: Review,
    onClick: () => void,
    isPaused: boolean
}) {
    const controls = useAnimation();

    // Store random durations in ref
    const durationX = useRef(3 + Math.random() * 4); // Fast: 3-7s
    const durationY = useRef(3 + Math.random() * 4); // Fast: 3-7s

    // Unified animation logic
    useEffect(() => {
        if (isPaused) {
            controls.stop();
        } else {
            // Wobble relative to the CSS-positioned anchor
            // Increased range for more visible movement
            const xWobble = 10 + Math.random() * 10; // +/- 10-20vw
            const yWobble = 10 + Math.random() * 10; // +/- 10-20vh

            controls.start({
                x: [0, xWobble, -xWobble, 0],
                y: [0, -yWobble, yWobble, 0],
                transition: {
                    x: {
                        duration: durationX.current,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                    },
                    y: {
                        duration: durationY.current,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                    }
                }
            });
        }
    }, [isPaused, controls]);


    return (
        <motion.div
            // layoutId removed to prevent conflict with manual controls
            onClick={onClick}
            initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1
            }}
            animate={controls}
            whileHover={!isPaused ? { scale: 1.1, zIndex: 100, cursor: 'pointer' } : {}}
            style={{
                position: 'absolute',
                top: `${review.initialY}vh`,
                left: `${review.initialX}vw`,
                width: '280px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1.5rem',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                zIndex: Math.floor(review.depth * 10) // Z-index based on depth
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <motion.img
                    // layoutId removed
                    src={review.image}
                    alt={review.name}
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                    <h4 style={{ margin: 0, color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>{review.name}</h4>
                    <p style={{ margin: 0, color: 'var(--color-copper)', fontSize: '0.75rem' }}>{review.brand}</p>
                </div>
            </div>

            <motion.div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(review.rating)].map((_, i) => (
                    <span key={i} style={{ color: '#FFD700', fontSize: '0.8rem' }}>★</span>
                ))}
            </motion.div>

            <motion.p
                style={{
                    margin: 0,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.85rem',
                    fontStyle: 'italic',
                    lineHeight: 1.4
                }}
            >
                "{review.text}"
            </motion.p>
        </motion.div>
    );
}

function ReviewModal({ review, onClose }: { review: Review, onClose: () => void }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            pointerEvents: 'none'
        }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(5px)',
                    pointerEvents: 'auto'
                }}
            />

            <motion.div
                // layoutId removed
                style={{
                    width: '90%',
                    maxWidth: '600px',
                    background: '#1D263D',
                    padding: '3rem',
                    borderRadius: '24px',
                    position: 'relative',
                    zIndex: 1001,
                    pointerEvents: 'auto',
                    border: '1px solid var(--color-copper)',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                    overflow: 'hidden'
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        opacity: 0.5
                    }}
                >
                    ✕
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
                    <motion.img
                        // layoutId removed
                        src={review.image}
                        alt={review.name}
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid var(--color-copper)'
                        }}
                    />

                    <div>
                        <h3 style={{ margin: 0, color: 'white', fontSize: '1.8rem', fontFamily: 'var(--font-family-serif)' }}>{review.name}</h3>
                        <p style={{ margin: '0.5rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {review.role} at <span style={{ color: 'white', fontWeight: 600 }}>{review.brand}</span>
                        </p>
                    </div>

                    <motion.div style={{ display: 'flex', gap: '4px' }}>
                        {[...Array(review.rating)].map((_, i) => (
                            <span key={i} style={{ color: '#FFD700', fontSize: '1.2rem' }}>★</span>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p style={{
                            color: 'rgba(255,255,255,0.9)',
                            fontSize: '1.25rem',
                            lineHeight: 1.6,
                            fontStyle: 'italic',
                            maxWidth: '500px',
                            margin: '0 auto'
                        }}>
                            "{review.fullText}"
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
