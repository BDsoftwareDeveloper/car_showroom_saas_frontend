


import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

const SmtpSettingsForm = ({ initialData, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    smtp_host: "",
    smtp_port: 587,
    smtp_user: "",
    smtp_password: "",
    smtp_from_email: "",
    smtp_from_name: "",
    use_tls: false,
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {[
        { label: "SMTP Host", name: "smtp_host", type: "text", placeholder: "e.g. smtp.mailtrap.io" },
        { label: "SMTP Port", name: "smtp_port", type: "number", placeholder: "e.g. 587" },
        { label: "SMTP User", name: "smtp_user", type: "text" },
        { label: "SMTP Password", name: "smtp_password", type: "password" },
        { label: "From Email", name: "smtp_from_email", type: "email", placeholder: "noreply@example.com" },
        { label: "From Name", name: "smtp_from_name", type: "text", placeholder: "e.g. Car Showroom" },
      ].map(({ label, name, type, placeholder }) => (
        <div key={name} className="flex flex-col">
          <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            value={formData[name] || ""}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
      ))}

      {/* TLS toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Use TLS</span>
        <Switch
          checked={formData.use_tls}
          onChange={(value) => setFormData((prev) => ({ ...prev, use_tls: value }))}
          className={`${
            formData.use_tls ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
        >
          <span
            className={`${
              formData.use_tls ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : "Save SMTP Settings"}
        </button>
      </div>
    </form>
  );
};

export default SmtpSettingsForm;
