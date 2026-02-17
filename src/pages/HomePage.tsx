import { PageLayout } from '../components/layout/PageLayout';
import { HeroSection } from '../sections/home/HeroSection';
import { WhatWeDoSection } from '../sections/home/WhatWeDoSection';
import { BrandLogosSection } from '../sections/home/BrandLogosSection';
import { FeaturedWorkSection } from '../sections/home/FeaturedWorkSection';
import { PhilosophyStrip } from '../sections/home/PhilosophyStrip';
import { EditorialGrid } from '../sections/home/EditorialGrid';
import { MicroStatement } from '../sections/home/MicroStatement';
import { FinalCTA } from '../sections/home/FinalCTA';
import { VisionArchitectureSection } from '../sections/home/VisionArchitectureSection';
import { ReviewsSection } from '../sections/home/ReviewsSection';
import { ContactFormSection } from '../sections/home/ContactFormSection';
import { Footer } from '../sections/home/Footer';
import { ProductionPipeline } from '../sections/home/ProductionPipeline';

export function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <WhatWeDoSection />
      <BrandLogosSection />
      <FeaturedWorkSection />
      <ProductionPipeline />
      <PhilosophyStrip />
      <EditorialGrid />
      <MicroStatement />
      <FinalCTA />
      <VisionArchitectureSection />
      <ReviewsSection />
      <ContactFormSection />
      <Footer />
    </PageLayout>
  );
}
