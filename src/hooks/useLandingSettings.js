// src/hooks/useLandingSettings.js
import { useEffect, useState } from "react";
import api from "../api/axios";

const useLandingSettings = () => {
  const [settings, setSettings] = useState(null);
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    const tenantSubdomain = localStorage.getItem("tenant_subdomain");

    const fetchLandingData = async () => {
      try {
        const [settingsRes, carsRes] = await Promise.all([
          api.get(`/public/frontpage-settings?subdomain=${tenantSubdomain}`),
          api.get(`/public/featured-cars?subdomain=${tenantSubdomain}`),
        ]);

        setSettings(settingsRes.data);
        setFeaturedCars(carsRes.data);
      } catch (error) {
        console.error("Error loading landing page data:", error);
      }
    };

    if (tenantSubdomain) {
      fetchLandingData();
    }
  }, []);

  return { settings, featuredCars };
};

export default useLandingSettings;

