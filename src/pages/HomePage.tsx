import { PageLayout } from '../components/layout/PageLayout';
import { HeroSection } from '../sections/home/HeroSection';
import { SpacerSection } from '../sections/home/SpacerSection';
import { FeaturedWorkSection } from '../sections/home/FeaturedWorkSection';
import { PhilosophyStrip } from '../sections/home/PhilosophyStrip';
import { EditorialGrid } from '../sections/home/EditorialGrid';
import { MicroStatement } from '../sections/home/MicroStatement';
import { FinalCTA } from '../sections/home/FinalCTA';
import { Footer } from '../sections/home/Footer';

export function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <SpacerSection />
      <FeaturedWorkSection />
      <PhilosophyStrip />
      <EditorialGrid />
      <MicroStatement />
      <FinalCTA />
      <Footer />
    </PageLayout>
  );
}
