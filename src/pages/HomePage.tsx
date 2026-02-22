import { useEffect, lazy, Suspense } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { HeroSection } from '../sections/home/HeroSection';
import { WhatWeDoSection } from '../sections/home/WhatWeDoSection';
import { AboutModal } from '../components/modals/AboutModal';

// Lazy loading below-the-fold components
const BrandLogosSection = lazy(() => import('../sections/home/BrandLogosSection').then(m => ({ default: m.BrandLogosSection })));
const FeaturedWorkSection = lazy(() => import('../sections/home/FeaturedWorkSection').then(m => ({ default: m.FeaturedWorkSection })));
const PhilosophyStrip = lazy(() => import('../sections/home/PhilosophyStrip').then(m => ({ default: m.PhilosophyStrip })));
const EditorialGrid = lazy(() => import('../sections/home/EditorialGrid').then(m => ({ default: m.EditorialGrid })));
const MicroStatement = lazy(() => import('../sections/home/MicroStatement').then(m => ({ default: m.MicroStatement })));
const VisionArchitectureSection = lazy(() => import('../sections/home/VisionArchitectureSection').then(m => ({ default: m.VisionArchitectureSection })));
const ReviewsSection = lazy(() => import('../sections/home/ReviewsSection').then(m => ({ default: m.ReviewsSection })));
const ContactFormSection = lazy(() => import('../sections/home/ContactFormSection').then(m => ({ default: m.ContactFormSection })));
const Footer = lazy(() => import('../sections/home/Footer').then(m => ({ default: m.Footer })));
const ProductionPipeline = lazy(() => import('../sections/home/ProductionPipeline').then(m => ({ default: m.ProductionPipeline })));

export function HomePage() {
  useEffect(() => {
    const defaultTitle = "Virtual Model Studio | Top AI Video Ad Agency in Bangladesh";

    const handleScroll = () => {
      const sections = [
        { id: 'editorial', title: "Work | Virtual Model Studio" },
        { id: 'about', title: "About | Virtual Model Studio" },
        { id: 'contact', title: "Contact | Virtual Model Studio" }
      ];

      let newTitle = defaultTitle;

      const midPoint = window.innerHeight / 2;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if the section is currently active (covering the middle of the screen)
          if (rect.top <= midPoint && rect.bottom >= midPoint) {
            newTitle = section.title;
            break;
          }
        }
      }

      if (document.title !== newTitle) {
        document.title = newTitle;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PageLayout>
      <AboutModal />
      <HeroSection />
      <WhatWeDoSection />

      <Suspense fallback={<div style={{ height: '50vh', background: 'var(--color-bg-primary)' }} />}>
        <BrandLogosSection />
        <FeaturedWorkSection />
        <ProductionPipeline />
        <PhilosophyStrip />
        <EditorialGrid />
        <MicroStatement />
        <VisionArchitectureSection />
        <ReviewsSection />
        <ContactFormSection />
        <Footer />
      </Suspense>
    </PageLayout>
  );
}
