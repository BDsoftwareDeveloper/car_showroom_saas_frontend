import { useSmtpSettings } from '@/hooks/useSmtpSettings';
import SmtpSettingsForm from '@/components/smtp/SmtpSettingsForm';

const SmtpSettingsPage = () => {
  const { settings, loading, error, updateSettings } = useSmtpSettings();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">SMTP Settings</h2>
      <SmtpSettingsForm settings={settings} onUpdate={updateSettings} />
    </div>
  );
};

export default SmtpSettingsPage;
