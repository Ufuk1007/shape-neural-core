import CRTFlickerOverlay from "@/components/CRTFlickerOverlay";
import HeroSection from "@/components/HeroSection";

const Index = () => {
  return (
    <main className="scanlines relative min-h-screen bg-background">
      <CRTFlickerOverlay />
      <HeroSection />
    </main>
  );
};

export default Index;
