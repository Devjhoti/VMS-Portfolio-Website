import { useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { HeroSection } from '../sections/home/HeroSection';
import { WhatWeDoSection } from '../sections/home/WhatWeDoSection';
import { BrandLogosSection } from '../sections/home/BrandLogosSection';
import { FeaturedWorkSection } from '../sections/home/FeaturedWorkSection';
import { PhilosophyStrip } from '../sections/home/PhilosophyStrip';
import { EditorialGrid } from '../sections/home/EditorialGrid';
import { MicroStatement } from '../sections/home/MicroStatement';
import { VisionArchitectureSection } from '../sections/home/VisionArchitectureSection';
import { ReviewsSection } from '../sections/home/ReviewsSection';
import { ContactFormSection } from '../sections/home/ContactFormSection';
import { Footer } from '../sections/home/Footer';
import { ProductionPipeline } from '../sections/home/ProductionPipeline';
import { AboutModal } from '../components/modals/AboutModal';

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
    </PageLayout>
  );
}
