import { useEffect, useState } from "react";
import Header from "../components/public/Header";
import HeroSection from "../components/public/HeroSection";
import FeaturesSection from "../components/public/FeaturesSection";
import Footer from "../components/public/Footer";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const extractSubdomain = () => {
      const host = window.location.hostname;
      const parts = host.split(".");
      if (host.endsWith(".local")) return parts[0]; // e.g., speedauto.local
      if (parts.length >= 3) return parts[0]; // e.g., sub.domain.com
      return "default";
    };

    const tenant = extractSubdomain();
    console.log("🔍 Subdomain detected:", tenant);

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
      })
      .finally(() => setLoading(false));
  }, []);

  const logoFullUrl = settings.logo_url
    ? `${API_BASE_URL.replace(/\/+$/, "")}${settings.logo_url}`
    : null;

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading...</div>;
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundColor: settings.primary_color || "#1d4ed8",
        color: settings.secondary_color || "#facc15",
      }}
    >
      <div className="sticky top-0 z-50 shadow-md bg-white">
        <Header
          logoUrl={logoFullUrl}
          title={settings.homepage_title || `${settings.company_name} Landing`}
        />
      </div>

      <main className="flex-1 bg-white text-gray-900">
        <HeroSection
          heroTitle={settings.hero_title}
          heroSubtitle={settings.hero_subtitle}
          ctaText={settings.cta_button_text}
          ctaLink={settings.cta_button_link}
        />
        <FeaturesSection />
      </main>

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
