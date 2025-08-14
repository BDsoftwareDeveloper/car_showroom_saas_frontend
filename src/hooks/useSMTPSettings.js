// src/hooks/useSmtpSettings.js
import { useState, useEffect } from 'react';
import axios from '../api/axios';

export const useSmtpSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/admin/smtp-settings/');
      setSettings(response.data);
      console.log("SMTP settings fetched:", response.data);
    } catch (err) {
      setError(err?.response?.data?.detail || 'Failed to fetch SMTP settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (data) => {
    try {
      await axios.put('/admin/smtp-settings', data);
      await fetchSettings();
    } catch (err) {
      throw err?.response?.data || err;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading, error, updateSettings };
};
