import { useEffect, useState } from "react";
import Header from "../components/public/Header";
import HeroSection from "../components/public/HeroSection";
import FeaturesSection from "../components/public/FeaturesSection";
import Footer from "../components/public/Footer";
import FeaturedCarsSection from "../components/public/FeaturedCarsSection";
import api from "../api/axios";
import { API_BASE_URL } from "../api/constants";

export default function PublicLandingPage() {
  const defaultSettings = {
    company_name: "SpeedAuto",
    homepage_title: "SpeedAuto - Your Trusted Car Dealer",
    hero_title: "Welcome to SpeedAuto",
    hero_subtitle: "Your trusted partner for premium vehicles",
    cta_button_text: "Explore Cars",
    cta_button_link: "#explore",
    primary_color: "#1d4ed8",
    secondary_color: "#facc15",
    logo_url: null,
    about_text: "We provide premium vehicles with unmatched service quality.",
    footer_text: "© 2025 SpeedAuto. All rights reserved.",
    social_links: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const extractSubdomain = () => {
      const host = window.location.hostname;
      const parts = host.split(".");
      if (host.endsWith(".local")) return parts[0];
      if (parts.length >= 3) return parts[0];
      return "default";
    };

    const tenant = extractSubdomain();

    api
      .get("/public/frontpage-settings", {
        params: { subdomain: tenant },
      })
      .then((res) => {
        const serverSettings = res.data || {};
        setSettings((prev) => ({
          ...prev,
          ...serverSettings,
          social_links: {
            ...prev.social_links,
            ...(serverSettings.social_links ?? {}),
          },
        }));
      })
      .catch((err) => {
        console.error("❌ Failed to fetch frontpage settings:", err);
      });

    async function fetchCars() {
      try {
        const res = await api.get(`/cars?subdomain=${tenant}`);
        setCars(res.data);
      } catch (err) {
        setCars([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  const logoFullUrl = settings.logo_url
    ? `${API_BASE_URL.replace(/\/+$/, "")}${settings.logo_url}`
    : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-yellow-50 to-blue-400 w-full">
        <span className="text-2xl font-bold text-blue-800 animate-pulse drop-shadow-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-blue-200 via-yellow-50 to-blue-400 overflow-x-hidden">
      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700 text-white text-center py-3 font-semibold tracking-wide shadow">
        🚗 Summer Sale! Get up to <span className="text-yellow-300 font-bold">20% off</span> on select models!
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 shadow-xl bg-white/90 backdrop-blur-lg border-b border-blue-100 w-full">
        <Header
          logoUrl={logoFullUrl}
          title={settings.homepage_title || `${settings.company_name} Landing`}
        />
      </div>

      <div className="flex flex-1 w-full">
        {/* Sidebar (desktop only) */}
        <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-blue-100 via-white to-blue-50 border-r border-blue-200 shadow-lg py-8 px-4">
          <nav className="space-y-6">
            <a href="#explore" className="block text-blue-700 font-semibold hover:text-blue-900 transition">Featured Cars</a>
            <a href="#features" className="block text-blue-700 font-semibold hover:text-blue-900 transition">Key Features</a>
            <a href="#contact" className="block text-blue-700 font-semibold hover:text-blue-900 transition">Contact Us</a>
          </nav>
          <div className="mt-auto pt-8 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {settings.company_name}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white/80 text-gray-900 w-full">
          <section className="w-full px-4 md:px-12 py-16">
            <HeroSection
              heroTitle={settings.hero_title}
              heroSubtitle={settings.hero_subtitle}
              ctaText={settings.cta_button_text}
              ctaLink={settings.cta_button_link}
            />
          </section>
          <section className="w-full px-4 md:px-12 py-16 bg-gradient-to-r from-blue-50 via-white to-blue-100">
            <FeaturedCarsSection cars={cars} />
          </section>
          <section className="w-full px-4 md:px-12 py-16 ">
            <FeaturesSection />
          </section>
        </main>
      </div>

      <Footer
        aboutText={settings.about_text}
        facebookUrl={settings.social_links.facebook}
        twitterUrl={settings.social_links.twitter}
        instagramUrl={settings.social_links.instagram}
        linkedinUrl={settings.social_links.linkedin}
        footerText={settings.footer_text}
      />
    </div>
  );
}
