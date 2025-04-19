import HeroSection from "./components/home/HeroSection";
import FeaturesSection from "./components/home/FeaturesSection";
import PlatformExamplesSection from "./components/home/PlatformExamplesSection";
import ProcessSection from "./components/home/ProcessSection";
import OptionsSection from "./components/home/OptionsSection";
import TechSection from "./components/home/TechSection";
import SupportSection from "./components/home/SupportSection";

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-50">
      <HeroSection />
      <FeaturesSection />
      <PlatformExamplesSection />
      <ProcessSection />
      <OptionsSection />
      <TechSection />
      <SupportSection />
    </div>
  );
}
