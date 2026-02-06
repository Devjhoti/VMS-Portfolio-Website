import type { ReactNode } from 'react';
import { useRef, useState, useEffect } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  stagger?: number;
}

export function RevealOnScroll({ children, stagger = 0 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = () => setPrefersReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: prefersReduced ? 1 : visible ? 1 : 0,
        transform: prefersReduced ? 'none' : visible ? 'translateY(0)' : 'translateY(var(--translate-reveal))',
        transition: `opacity var(--transition-reveal), transform var(--transition-reveal)`,
        transitionDelay: prefersReduced ? undefined : `${stagger}ms`,
      }}
    >
      {children}
    </div>
  );
}
