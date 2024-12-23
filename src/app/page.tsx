import HeroSection from '@/app/landing/HeroSection';
import FeaturesSection from '@/app/landing/FeaturesSection';
import CtaSection from '@/app/landing/CtaSection';

export default function Home() {
    return (
        <main className="min-h-screen bg-black">
            <HeroSection />
            <FeaturesSection />
            <CtaSection />
        </main>
    );
}