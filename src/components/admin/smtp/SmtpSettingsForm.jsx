// import React, { useState, useEffect } from "react";

// const SmtpSettingsForm = ({ initialData, onSubmit, isSubmitting }) => {
//   const [formData, setFormData] = useState({
//     smtp_host: "",
//     smtp_port: 587,
//     smtp_user: "",
//     smtp_password: "",
//     smtp_from_email: "",
//     smtp_from_name: "",
//     use_tls: false,
//   });

//   useEffect(() => {
//     if (initialData) setFormData(initialData);
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form className="space-y-4" onSubmit={handleSubmit}>
//       {[
//         { label: "SMTP Host", name: "smtp_host", type: "text" },
//         { label: "SMTP Port", name: "smtp_port", type: "number" },
//         { label: "SMTP User", name: "smtp_user", type: "text" },
//         { label: "SMTP Password", name: "smtp_password", type: "password" },
//         { label: "From Email", name: "smtp_from_email", type: "email" },
//         { label: "From Name", name: "smtp_from_name", type: "text" },
//       ].map(({ label, name, type }) => (
//         <div key={name}>
//           <label className="block font-medium">{label}</label>
//           <input
//             type={type}
//             name={name}
//             value={formData[name] || ""}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>
//       ))}

//       <div>
//         <label className="inline-flex items-center">
//           <input
//             type="checkbox"
//             name="use_tls"
//             checked={formData.use_tls}
//             onChange={handleChange}
//             className="mr-2"
//           />
//           Use TLS
//         </label>
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//         disabled={isSubmitting}
//       >
//         {isSubmitting ? "Saving..." : "Save Settings"}
//       </button>
//     </form>
//   );
// };

// export default SmtpSettingsForm;





// import React, { useEffect, useState } from "react";
// import { Switch } from "@headlessui/react"; // Optional: headlessui for better toggle

// const SmtpSettingsForm = ({ initialData, onSubmit, isSubmitting }) => {
//   const [formData, setFormData] = useState({
//     smtp_host: "",
//     smtp_port: 587,
//     smtp_user: "",
//     smtp_password: "",
//     smtp_from_email: "",
//     smtp_from_name: "",
//     use_tls: false,
//   });

//   useEffect(() => {
//     if (initialData) setFormData(initialData);
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="text-sm text-gray-600 mb-4">
//         Configure your SMTP server settings below. These will be used to send
//         system and notification emails from your application.
//       </div>

//       {[
//         {
//           label: "SMTP Host",
//           name: "smtp_host",
//           type: "text",
//           placeholder: "e.g. smtp.mailtrap.io",
//         },
//         {
//           label: "SMTP Port",
//           name: "smtp_port",
//           type: "number",
//           placeholder: "e.g. 587",
//         },
//         {
//           label: "SMTP User",
//           name: "smtp_user",
//           type: "text",
//         },
//         {
//           label: "SMTP Password",
//           name: "smtp_password",
//           type: "password",
//         },
//         {
//           label: "From Email",
//           name: "smtp_from_email",
//           type: "email",
//           placeholder: "noreply@example.com",
//         },
//         {
//           label: "From Name",
//           name: "smtp_from_name",
//           type: "text",
//           placeholder: "e.g. Car Showroom",
//         },
//       ].map(({ label, name, type, placeholder }) => (
//         <div key={name}>
//           <label htmlFor={name} className="block text-sm font-medium text-gray-700">
//             {label}
//           </label>
//           <input
//             type={type}
//             name={name}
//             id={name}
//             placeholder={placeholder}
//             value={formData[name] || ""}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//             required
//           />
//         </div>
//       ))}

//       <div className="flex items-center justify-between">
//         <label htmlFor="use_tls" className="text-sm font-medium text-gray-700">
//           Use TLS
//         </label>
//         <Switch
//           checked={formData.use_tls}
//           onChange={(value) =>
//             setFormData((prev) => ({ ...prev, use_tls: value }))
//           }
//           className={`${
//             formData.use_tls ? "bg-blue-600" : "bg-gray-200"
//           } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
//         >
//           <span
//             className={`${
//               formData.use_tls ? "translate-x-6" : "translate-x-1"
//             } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
//           />
//         </Switch>
//       </div>

//       <div>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
//         >
//           {isSubmitting ? "Saving..." : "Save SMTP Settings"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SmtpSettingsForm;



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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Info */}
      <p className="text-sm text-gray-600">
        Configure your SMTP server settings below. These settings are used to send system
        and notification emails from your application.
      </p>

      {/* Input Fields */}
      {[
        { label: "SMTP Host", name: "smtp_host", type: "text", placeholder: "e.g. smtp.mailtrap.io" },
        { label: "SMTP Port", name: "smtp_port", type: "number", placeholder: "e.g. 587" },
        { label: "SMTP User", name: "smtp_user", type: "text" },
        { label: "SMTP Password", name: "smtp_password", type: "password" },
        { label: "From Email", name: "smtp_from_email", type: "email", placeholder: "noreply@example.com" },
        { label: "From Name", name: "smtp_from_name", type: "text", placeholder: "e.g. Car Showroom" },
      ].map(({ label, name, type, placeholder }) => (
        <div key={name}>
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={formData[name] || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
      ))}

      {/* TLS Switch */}
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
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isSubmitting ? "Saving..." : "Save SMTP Settings"}
      </button>
    </form>
  );
};

export default SmtpSettingsForm;
