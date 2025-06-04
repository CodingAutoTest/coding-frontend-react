import LandingHeader from '@/features/landing/components/LandingHeader';
import LandingHero from '@/features/landing/components/LandingHero';
import LandingFeatures from '@/features/landing/components/LandingFeatures';
import LandingFooter from '@/features/landing/components/LandingFooter';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
      <LandingFooter />
    </div>
  );
}
