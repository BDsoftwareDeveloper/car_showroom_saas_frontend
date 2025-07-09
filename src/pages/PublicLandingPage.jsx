import Header from "../components/public/Header";
import HeroSection from "../components/public/HeroSection";
import FeaturesSection from "../components/public/FeaturesSection";
import Footer from "../components/public/Footer";

export default function PublicLandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
