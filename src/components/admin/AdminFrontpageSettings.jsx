// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// const categories = [
//   { key: "hero", label: "Hero Section" },
//   { key: "cta", label: "Call to Action" },
//   { key: "about", label: "About" },
//   { key: "social", label: "Social Media" },
//   { key: "theme", label: "Theme Colors" },
//   { key: "footer", label: "Footer" },
//   { key: "logo", label: "Logo Upload" },
// ];

// const demoDefaults = {
//   homepage_title: "SpeedAuto - Your Trusted Car Dealer",
//   about_text: "We provide premium vehicles with unmatched service quality.",
//   hero_title: "Welcome to SpeedAuto",
//   hero_subtitle: "Your trusted partner for premium vehicles",
//   cta_button_text: "Explore Cars",
//   cta_button_link: "#explore",
//   facebook_url: "https://facebook.com/speedauto",
//   twitter_url: "https://twitter.com/speedauto",
//   instagram_url: "https://instagram.com/speedauto",
//   primary_color: "#1d4ed8",
//   secondary_color: "#facc15",
//   footer_text: "© 2025 SpeedAuto. All rights reserved.",
// };

// export default function AdminFrontpageSettings() {
//   const [form, setForm] = useState(demoDefaults);
//   const [logoFile, setLogoFile] = useState(null);
//   const [logoUrl, setLogoUrl] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("hero");

//   const extractSubdomain = () => {
//     const host = window.location.hostname;
//     const parts = host.split(".");
//     return parts.length >= 3 ? parts[0] : "default";
//   };

//   const tenant = extractSubdomain();

//   useEffect(() => {
//     api
//       .get(`/admin/frontpage-settings`, { params: { tenant_subdomain: tenant } })
//       .then((res) => {
//         if (res.data && Object.keys(res.data).length > 0) {
//           setForm((prev) => ({ ...prev, ...res.data }));
//           setLogoUrl(res.data.logo_url ? `/api${res.data.logo_url}` : "");
//         } else {
//           setForm(demoDefaults);
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to fetch settings:", err);
//         setForm(demoDefaults);
//       });
//   }, [tenant]);

//   const handleInputChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleTextUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await api.patch(`/admin/frontpage-settings`, form, {
//         params: { tenant_subdomain: tenant },
//       });
//       alert("Settings updated!");
//     } catch (err) {
//       console.error("Save error:", err);
//       alert("Failed to update settings.");
//     }
//   };

//   const handleLogoUpload = async (e) => {
//     e.preventDefault();
//     if (!logoFile) return;

//     const formData = new FormData();
//     formData.append("file", logoFile);

//     try {
//       const res = await api.post(`/admin/upload-logo`, formData, {
//         params: { tenant_subdomain: tenant },
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setLogoUrl(`/api${res.data.logo_url}`);
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Failed to upload logo.");
//     }
//   };

//   const handleDeleteLogo = async () => {
//     try {
//       await api.delete(`/admin/delete-logo`, {
//         params: { tenant_subdomain: tenant },
//       });
//       setLogoUrl("");
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert("Failed to delete logo.");
//     }
//   };

//   const renderFields = () => {
//     switch (selectedCategory) {
//       case "hero":
//         return (
//           <>
//             <label className="block mb-1 font-medium">Homepage Title</label>
//             <input
//               type="text"
//               name="homepage_title"
//               value={form.homepage_title || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//             <label className="block mb-1 font-medium">Hero Title</label>
//             <input
//               type="text"
//               name="hero_title"
//               value={form.hero_title || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//             <label className="block mb-1 font-medium">Hero Subtitle</label>
//             <input
//               type="text"
//               name="hero_subtitle"
//               value={form.hero_subtitle || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//           </>
//         );
//       case "cta":
//         return (
//           <>
//             <label className="block mb-1 font-medium">CTA Button Text</label>
//             <input
//               type="text"
//               name="cta_button_text"
//               value={form.cta_button_text || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//             <label className="block mb-1 font-medium">CTA Button Link</label>
//             <input
//               type="text"
//               name="cta_button_link"
//               value={form.cta_button_link || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//           </>
//         );
//       case "about":
//         return (
//           <>
//             <label className="block mb-1 font-medium">About Text</label>
//             <textarea
//               name="about_text"
//               value={form.about_text || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//               rows="4"
//             ></textarea>
//           </>
//         );
//       case "social":
//         return (
//           <>
//             <label className="block mb-1 font-medium">Facebook URL</label>
//             <input
//               type="text"
//               name="facebook_url"
//               value={form.facebook_url || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//             <label className="block mb-1 font-medium">Twitter URL</label>
//             <input
//               type="text"
//               name="twitter_url"
//               value={form.twitter_url || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//             <label className="block mb-1 font-medium">Instagram URL</label>
//             <input
//               type="text"
//               name="instagram_url"
//               value={form.instagram_url || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//           </>
//         );
//       case "theme":
//         return (
//           <>
//             <label className="block mb-1 font-medium">Primary Color</label>
//             <input
//               type="color"
//               name="primary_color"
//               value={form.primary_color || "#1d4ed8"}
//               onChange={handleInputChange}
//               className="w-full mb-4 rounded"
//               title="Pick a primary color"
//             />
//             <label className="block mb-1 font-medium">Secondary Color</label>
//             <input
//               type="color"
//               name="secondary_color"
//               value={form.secondary_color || "#facc15"}
//               onChange={handleInputChange}
//               className="w-full mb-4 rounded"
//               title="Pick a secondary color"
//             />
//           </>
//         );
//       case "footer":
//         return (
//           <>
//             <label className="block mb-1 font-medium">Footer Text</label>
//             <textarea
//               name="footer_text"
//               value={form.footer_text || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//               rows="2"
//             ></textarea>
//           </>
//         );
//       case "logo":
//         return (
//           <>
//             {logoUrl && (
//               <div className="mb-4">
//                 <img
//                   src={logoUrl}
//                   alt="Tenant Logo"
//                   className="h-16 object-contain mb-2"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleDeleteLogo}
//                   className="text-red-600 hover:underline text-sm"
//                 >
//                   Delete Logo
//                 </button>
//               </div>
//             )}
//             <form onSubmit={handleLogoUpload}>
//               <input
//                 type="file"
//                 onChange={(e) => setLogoFile(e.target.files[0])}
//                 className="mb-2 block w-full text-sm text-gray-700 file:bg-blue-50 file:border file:border-blue-200 file:rounded file:px-4 file:py-2 file:text-blue-600 hover:file:bg-blue-100"
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Upload
//               </button>
//             </form>
//           </>
//         );
//       default:
//         return <p>No category selected.</p>;
//     }
//   };

//   const previewStyle = {
//     backgroundColor: form.primary_color,
//     color: form.secondary_color,
//     padding: "2rem",
//     borderRadius: "8px",
//     marginTop: "2rem",
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-bold text-blue-600 mb-6">Frontpage Settings</h2>

//       <div className="mb-6">
//         <label className="block font-medium mb-2">Select Category</label>
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="w-full border border-gray-300 rounded px-3 py-2"
//         >
//           {categories.map((cat) => (
//             <option key={cat.key} value={cat.key}>
//               {cat.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <form onSubmit={handleTextUpdate} className="space-y-4">
//         {renderFields()}
//         {selectedCategory !== "logo" && (
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//           >
//             Save Settings
//           </button>
//         )}
//       </form>

//       <div className="mt-10">
//         <h3 className="text-xl font-semibold mb-4">Live Preview</h3>
//         <div style={previewStyle}>
//           <h1 className="text-4xl font-bold mb-2">{form.hero_title}</h1>
//           <p className="mb-4">{form.hero_subtitle}</p>
//           <a
//             href={form.cta_button_link || "#"}
//             className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100"
//           >
//             {form.cta_button_text}
//           </a>
//           <div className="mt-6 border-t pt-4">
//             <h2 className="text-2xl mb-2">{form.homepage_title}</h2>
//             <p className="mb-2">{form.about_text}</p>
//             <p>
//               Follow us: {" "}
//               <a href={form.facebook_url} className="underline mr-2" target="_blank" rel="noreferrer">
//                 Facebook
//               </a>
//               <a href={form.twitter_url} className="underline mr-2" target="_blank" rel="noreferrer">
//                 Twitter
//               </a>
//               <a href={form.instagram_url} className="underline" target="_blank" rel="noreferrer">
//                 Instagram
//               </a>
//             </p>
//             <footer className="mt-6 border-t pt-4 text-sm">{form.footer_text}</footer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { API_BASE_URL } from "../../api/constants";

// const categories = [
//   { key: "hero", label: "Hero Section" },
//   { key: "cta", label: "Call to Action" },
//   { key: "about", label: "About" },
//   { key: "social", label: "Social Media" },
//   { key: "theme", label: "Theme Colors" },
//   { key: "footer", label: "Footer" },
//   { key: "logo", label: "Logo Upload" },
// ];

// const demoDefaults = {
//   homepage_title: "SpeedAuto - Your Trusted Car Dealer",
//   about_text: "We provide premium vehicles with unmatched service quality.",
//   hero_title: "Welcome to SpeedAuto",
//   hero_subtitle: "Your trusted partner for premium vehicles",
//   cta_button_text: "Explore Cars",
//   cta_button_link: "#explore",
//   facebook_url: "https://facebook.com/speedauto",
//   twitter_url: "https://twitter.com/speedauto",
//   instagram_url: "https://instagram.com/speedauto",
//   primary_color: "#1d4ed8",
//   secondary_color: "#facc15",
//   footer_text: "© 2025 SpeedAuto. All rights reserved.",
// };

// export default function AdminFrontpageSettings() {
//   const [form, setForm] = useState(demoDefaults);
//   const [logoFile, setLogoFile] = useState(null);
//   const [logoUrl, setLogoUrl] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("hero");
//   const [displayMode, setDisplayMode] = useState("dropdown");

//   const extractSubdomain = () => {
//     const host = window.location.hostname;
//     const parts = host.split(".");
//     return parts.length >= 3 ? parts[0] : "default";
//   };

//   const tenant = extractSubdomain();

//   useEffect(() => {
//     const stored = localStorage.getItem("displayMode");
//     if (stored) setDisplayMode(stored);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("displayMode", displayMode);
//   }, [displayMode]);

//   useEffect(() => {
//     api
//       .get(`/admin/frontpage-settings`)
//       .then((res) => {
//         if (res.data && Object.keys(res.data).length > 0) {
//           setForm((prev) => ({ ...prev, ...res.data }));
//           setLogoUrl(res.data.logo_url ? `/api${res.data.logo_url}` : "");
//         } else {
//           setForm(demoDefaults);
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to fetch settings:", err);
//         setForm(demoDefaults);
//       });
//   }, [tenant]);

//   const handleInputChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleTextUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await api.patch(`/admin/frontpage-settings`, form);
//       alert("Settings updated!");
//     } catch (err) {
//       console.error("Save error:", err);
//       alert("Failed to update settings.");
//     }
//   };



// const handleLogoUpload = async (e) => {
//   e.preventDefault();
//   if (!logoFile) return alert("Please select a file");

//   const formData = new FormData();
//   formData.append("file", logoFile);

//   const token = localStorage.getItem("admin_token"); // Adjust if using a different key

//   try {
//     const res = await api.post(`/admin/upload-logo`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`, // ✅ Add this
//       },
//     });

//     console.log("🔁 Upload response:", res);

//     if (res.data?.logo_url) {
//       setLogoUrl(`/API_BASE_URL${res.data.logo_url}`);
//       alert("✅ Logo uploaded!");
//     } else {
//       alert("⚠️ Unexpected response format.");
//     }
//   } catch (err) {
//     console.error("❌ Upload error:", err);
//     if (err.response) {
//       console.error("Backend responded with:", err.response.data);
//     }
//     alert("Upload failed");
//   }
// };




// const handleDeleteLogo = async () => {
//   const confirmDelete = window.confirm("Are you sure you want to delete the logo?");
//   if (!confirmDelete) return;

//   try {
//     const res = await api.delete(`/admin/delete-logo`);

//     if (res.status === 200) {
//       setLogoUrl("");
//       alert("🗑️ Logo deleted successfully.");
//     } else {
//       alert("⚠️ Logo not deleted. Unexpected response.");
//     }
//   } catch (err) {
//     console.error("❌ Delete failed:", err);
//     alert("Failed to delete logo. Please try again.");
//   }
// };


//   const renderFields = (key = selectedCategory) => {
//     switch (key) {
//       case "hero":
//         return (
//           <>
//             <label className="block mb-1 font-medium">Homepage Title</label>
//             <input
//               type="text"
//               name="homepage_title"
//               value={form.homepage_title || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//             <label className="block mb-1 font-medium">Hero Title</label>
//             <input
//               type="text"
//               name="hero_title"
//               value={form.hero_title || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//             <label className="block mb-1 font-medium">Hero Subtitle</label>
//             <input
//               type="text"
//               name="hero_subtitle"
//               value={form.hero_subtitle || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//           </>
//         );
//       case "cta":
//         return (
//           <>
//             <label className="block mb-1 font-medium">CTA Button Text</label>
//             <input
//               type="text"
//               name="cta_button_text"
//               value={form.cta_button_text || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//             <label className="block mb-1 font-medium">CTA Button Link</label>
//             <input
//               type="text"
//               name="cta_button_link"
//               value={form.cta_button_link || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//           </>
//         );
//       case "about":
//         return (
//           <>
//             <label className="block mb-1 font-medium">About Text</label>
//             <textarea
//               name="about_text"
//               value={form.about_text || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//               rows="4"
//             ></textarea>
//           </>
//         );
//       case "social":
//         return (
//           <>
//             <label className="block mb-1 font-medium">Facebook URL</label>
//             <input
//               type="text"
//               name="facebook_url"
//               value={form.facebook_url || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//             <label className="block mb-1 font-medium">Twitter URL</label>
//             <input
//               type="text"
//               name="twitter_url"
//               value={form.twitter_url || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//             <label className="block mb-1 font-medium">Instagram URL</label>
//             <input
//               type="text"
//               name="instagram_url"
//               value={form.instagram_url || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//             />
//           </>
//         );
//       case "theme":
//         return (
//           <>
//             <label className="block mb-1 font-medium">Primary Color</label>
//             <input
//               type="color"
//               name="primary_color"
//               value={form.primary_color || "#1d4ed8"}
//               onChange={handleInputChange}
//               className="w-full mb-4 rounded"
//               title="Pick a primary color"
//             />
//             <label className="block mb-1 font-medium">Secondary Color</label>
//             <input
//               type="color"
//               name="secondary_color"
//               value={form.secondary_color || "#facc15"}
//               onChange={handleInputChange}
//               className="w-full mb-4 rounded"
//               title="Pick a secondary color"
//             />
//           </>
//         );
//       case "footer":
//         return (
//           <>
//             <label className="block mb-1 font-medium">Footer Text</label>
//             <textarea
//               name="footer_text"
//               value={form.footer_text || ""}
//               onChange={handleInputChange}
//               className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
//               rows="2"
//             ></textarea>
//           </>
//         );
//       case "logo":
//         return (
//           <>
//             {logoUrl && (
//               <div className="mb-4">
//                 <img
//                   src={logoUrl}
//                   alt="Tenant Logo"
//                   className="h-16 object-contain mb-2"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleDeleteLogo}
//                   className="text-red-600 hover:underline text-sm"
//                 >
//                   Delete Logo
//                 </button>
//               </div>
//             )}

//       <div>
//         <input
//           type="file"
//           onChange={(e) => setLogoFile(e.target.files[0])}
//           className="mb-2 block w-full text-sm text-gray-700 file:bg-blue-50 file:border file:border-blue-200 file:rounded file:px-4 file:py-2 file:text-blue-600 hover:file:bg-blue-100"
//         />
//         <button
//           type="button"
//           onClick={handleLogoUpload}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Upload
//         </button>
//       </div>
//     </>
//   );

//       default:
//         return <p>No category selected.</p>;
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-bold text-blue-600 mb-6">Frontpage Settings</h2>

//       <div className="mb-6">
//         <label className="block font-medium mb-1">Select Display Mode</label>
//         <select
//           value={displayMode}
//           onChange={(e) => setDisplayMode(e.target.value)}
//           className="w-full border border-gray-300 rounded px-3 py-2"
//         >
//           <option value="dropdown">Dropdown</option>
//           <option value="list">List</option>
//           <option value="tabs">Tabs</option>
//           <option value="accordion">Accordion</option>
//           <option value="all">All</option>
//         </select>
//       </div>

//       {/* Category selector UI based on displayMode */}
//       {displayMode === "dropdown" && (
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
//         >
//           {categories.map((cat) => (
//             <option key={cat.key} value={cat.key}>
//               {cat.label}
//             </option>
//           ))}
//         </select>
//       )}

//       {displayMode === "list" && (
//         <div className="flex gap-6 mb-4">
//           {/* Left side: Category list */}
//           <div className="w-1/4 flex flex-col gap-2">
//             {categories.map((cat) => (
//               <button
//                 key={cat.key}
//                 type="button"
//                 onClick={() => setSelectedCategory(cat.key)}
//                 className={`px-4 py-2 rounded border text-left ${
//                   selectedCategory === cat.key
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "bg-white border-gray-300 text-gray-700"
//                 } hover:bg-blue-50`}
//               >
//                 {cat.label}
//               </button>
//             ))}
//           </div>

//           {/* Right side: Form for selected category */}
//           <div className="w-3/4 border rounded p-4 bg-white shadow">
//             <form onSubmit={handleTextUpdate} className="space-y-4">
//               {renderFields(selectedCategory)}
//               {selectedCategory !== "logo" && (
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//                 >
//                   Save Settings
//                 </button>
//               )}
//             </form>
//           </div>
//         </div>
//       )}

//       {displayMode === "tabs" && (
//         <div className="mb-4 border-b flex gap-4">
//           {categories.map((cat) => (
//             <button
//               key={cat.key}
//               type="button"
//               onClick={() => setSelectedCategory(cat.key)}
//               className={`py-2 px-4 border-b-2 ${
//                 selectedCategory === cat.key
//                   ? "border-blue-600 text-blue-600 font-semibold"
//                   : "border-transparent text-gray-600"
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>
//       )}

//       {displayMode === "accordion" &&
//         categories.map((cat) => (
//           <div key={cat.key} className="mb-4 border rounded">
//             <button
//               onClick={() =>
//                 setSelectedCategory((prev) => (prev === cat.key ? "" : cat.key))
//               }
//               className="w-full text-left px-4 py-2 font-medium bg-gray-100 hover:bg-gray-200"
//             >
//               {cat.label}
//             </button>
//             {selectedCategory === cat.key && (
//               <div className="p-4 border-t">{renderFields(cat.key)}</div>
//             )}
//           </div>
//         ))}

//       {displayMode !== "all" && selectedCategory && displayMode !== "accordion" && (
//         <form onSubmit={handleTextUpdate} className="space-y-4">
//           {renderFields()}
//           {selectedCategory !== "logo" && (
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//             >
//               Save Settings
//             </button>
//           )}
//         </form>
//       )}

//       {displayMode === "all" && (
//         <form onSubmit={handleTextUpdate} className="space-y-8">
//           {categories.map((cat) => (
//             <div key={cat.key} className="border rounded p-4">
//               <h4 className="text-lg font-semibold mb-4 text-blue-700">{cat.label}</h4>
//               {renderFields(cat.key)}
//               <hr className="my-4" />
//             </div>
//           ))}
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//           >
//             Save All Settings
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import api from "../../api/axios";
import { API_BASE_URL } from "../../api/constants";

const categories = [
  { key: "company", label: "Company Info" },
  { key: "hero", label: "Hero Section" },
  { key: "cta", label: "Call to Action" },
  { key: "about", label: "About" },
  { key: "social", label: "Social Media" },
  { key: "theme", label: "Theme Colors" },
  { key: "footer", label: "Footer" },
  { key: "logo", label: "Logo Upload" },
  { key: "sidebar", label: "Sidebar" },
  { key: "banners", label: "Banners" },
];

const demoDefaults = {
  company_name: "SpeedAuto",
  homepage_title: "SpeedAuto - Your Trusted Car Dealer",
  about_text: "We provide premium vehicles with unmatched service quality.",
  hero_title: "Welcome to SpeedAuto",
  hero_subtitle: "Your trusted partner for premium vehicles",
  cta_button_text: "Explore Cars",
  cta_button_link: "#explore",
  social_links: {
    facebook: "https://facebook.com/speedauto",
    twitter: "https://twitter.com/speedauto",
    instagram: "https://instagram.com/speedauto",
  },
  primary_color: "#1d4ed8",
  secondary_color: "#facc15",
  footer_text: "© 2025 SpeedAuto. All rights reserved.",
  sidebar_title: "Quick Links",
  sidebar_items: [
    { label: "Home", link: "/" },
    { label: "Cars", link: "/cars" },
    { label: "Contact", link: "/contact" },
  ],
  
  banners: [],
};




export default function AdminFrontpageSettings() {
  const [form, setForm] = useState({
    ...demoDefaults,
    banners: [],
    sidebar_items: [],
    sidebar_title: "",
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("hero");
  const [displayMode, setDisplayMode] = useState("dropdown");

  useEffect(() => {
    const stored = localStorage.getItem("displayMode");
    if (stored) setDisplayMode(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("displayMode", displayMode);
  }, [displayMode]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get(`/admin/frontpage-settings`);
        const data = res.data;

        if (data && typeof data === "object" && Object.keys(data).length > 0) {
          setForm((prev) => ({
            ...prev,
            ...data,
            banners: data.banners || [],
            sidebar_items: data.sidebar_items || [],
            sidebar_title: data.sidebar_title || "",
          }));

          setLogoUrl(data.logo_url ? `/api${data.logo_url}` : "");
        } else {
          setForm((prev) => ({
            ...prev,
            ...demoDefaults,
            banners: [],
            sidebar_items: [],
            sidebar_title: "",
          }));
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
        setForm((prev) => ({
          ...prev,
          ...demoDefaults,
          banners: [],
          sidebar_items: [],
          sidebar_title: "",
        }));
      }
    };

    fetchSettings();
  }, []);


  const handleInputChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [name]: value,
      },
    }));
  };

  const handleTextUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/admin/frontpage-settings`, form);
      alert("Settings updated!");
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to update settings.");
    }
  };

  const handleLogoUpload = async (e) => {
    e.preventDefault();
    if (!logoFile) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", logoFile);

    const token = localStorage.getItem("admin_token");

    try {
      const res = await api.post(`/admin/upload-logo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.logo_url) {
        setLogoUrl(`/api${res.data.logo_url}`);
        alert("✅ Logo uploaded!");
      } else {
        alert("⚠️ Unexpected response format.");
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("Upload failed");
    }
  };

  const handleDeleteLogo = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete the logo?");
    if (!confirmDelete) return;

    try {
      const res = await api.delete(`/admin/delete-logo`);

      if (res.status === 200) {
        setLogoUrl("");
        alert("🗑️ Logo deleted successfully.");
      } else {
        alert("⚠️ Logo not deleted. Unexpected response.");
      }
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("Failed to delete logo. Please try again.");
    }
  };

  const renderFields = (key = selectedCategory) => {
    switch (key) {
      case "company":
        return (
          <>
            <label className="block mb-1 font-medium">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={form.company_name || ""}
              onChange={handleInputChange}
              className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
            />
          </>
        );
      case "hero":
        return (
          <>
            <label className="block mb-1 font-medium">Homepage Title</label>
            <input
              type="text"
              name="homepage_title"
              value={form.homepage_title || ""}
              onChange={handleInputChange}
              className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
            />
            <label className="block mb-1 font-medium">Hero Title</label>
            <input
              type="text"
              name="hero_title"
              value={form.hero_title || ""}
              onChange={handleInputChange}
              className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
            />
            <label className="block mb-1 font-medium">Hero Subtitle</label>
            <input
              type="text"
              name="hero_subtitle"
              value={form.hero_subtitle || ""}
              onChange={handleInputChange}
              className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
            />
          </>
        );
      case "cta":
        return (
          <>
            <label className="block mb-1 font-medium">CTA Button Text</label>
            <input
              type="text"
              name="cta_button_text"
              value={form.cta_button_text || ""}
              onChange={handleInputChange}
              className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
            />
            <label className="block mb-1 font-medium">CTA Button Link</label>
            <input
              type="text"
              name="cta_button_link"
              value={form.cta_button_link || ""}
              onChange={handleInputChange}
              className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
            />
          </>
        );
      case "about":
        return (
          <>
            <label className="block mb-1 font-medium">About Text</label>
            <textarea
              name="about_text"
              value={form.about_text || ""}
              onChange={handleInputChange}
              className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
              rows="4"
            ></textarea>
          </>
        );
      case "social":
        return (
          <>
            <label className="block mb-1 font-medium">Facebook URL</label>
            <input
              type="text"
              name="facebook"
              value={form.social_links?.facebook || ""}
              onChange={handleSocialChange}
              className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
            />
            <label className="block mb-1 font-medium">Twitter URL</label>
            <input
              type="text"
              name="twitter"
              value={form.social_links?.twitter || ""}
              onChange={handleSocialChange}
              className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
            />
            <label className="block mb-1 font-medium">Instagram URL</label>
            <input
              type="text"
              name="instagram"
              value={form.social_links?.instagram || ""}
              onChange={handleSocialChange}
              className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
            />
          </>
        );
      case "theme":
        return (
          <>
            <label className="block mb-1 font-medium">Primary Color</label>
            <input
              type="color"
              name="primary_color"
              value={form.primary_color || "#1d4ed8"}
              onChange={handleInputChange}
              className="w-full mb-4 rounded"
              title="Pick a primary color"
            />
            <label className="block mb-1 font-medium">Secondary Color</label>
            <input
              type="color"
              name="secondary_color"
              value={form.secondary_color || "#facc15"}
              onChange={handleInputChange}
              className="w-full mb-4 rounded"
              title="Pick a secondary color"
            />
          </>
        );
      case "footer":
        return (
          <>
            <label className="block mb-1 font-medium">Footer Text</label>
            <textarea
              name="footer_text"
              value={form.footer_text || ""}
              onChange={handleInputChange}
              className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
              rows="2"
            ></textarea>
          </>
        );
      case "logo":
        return (
          <>
            {logoUrl && (
              <div className="mb-4">
                <img
                  src={logoUrl}
                  alt="Tenant Logo"
                  className="h-16 object-contain mb-2"
                />
                <button
                  type="button"
                  onClick={handleDeleteLogo}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete Logo
                </button>
              </div>
            )}
            <div>
              <input
                type="file"
                onChange={(e) => setLogoFile(e.target.files[0])}
                className="mb-2 block w-full text-sm text-gray-700 file:bg-blue-50 file:border file:border-blue-200 file:rounded file:px-4 file:py-2 file:text-blue-600 hover:file:bg-blue-100"
              />
              <button
                type="button"
                onClick={handleLogoUpload}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Upload
              </button>
            </div>
          </>
        );
      case "sidebar":
        return (
          <>
            <label className="block mb-1 font-medium">Sidebar Title</label>
            <input
              type="text"
              name="sidebar_title"
              value={form.sidebar_title || ""}
              onChange={handleInputChange}
              className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
            />

            <label className="block mb-1 font-medium">Sidebar Items</label>
            {form.sidebar_items?.map((item, index) => (
              <div key={index} className="mb-2 flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Label"
                  value={item.label}
                  onChange={(e) => {
                    const updated = [...form.sidebar_items];
                    updated[index].label = e.target.value;
                    setForm((prev) => ({ ...prev, sidebar_items: updated }));
                  }}
                  className="w-1/3 border px-2 py-1"
                />
                <input
                  type="text"
                  placeholder="Link"
                  value={item.link}
                  onChange={(e) => {
                    const updated = [...form.sidebar_items];
                    updated[index].link = e.target.value;
                    setForm((prev) => ({ ...prev, sidebar_items: updated }));
                  }}
                  className="w-2/3 border px-2 py-1"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...form.sidebar_items];
                    updated.splice(index, 1);
                    setForm((prev) => ({ ...prev, sidebar_items: updated }));
                  }}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  sidebar_items: [...(prev.sidebar_items || []), { label: "", link: "" }],
                }))
              }
              className="text-blue-600 hover:underline text-sm"
            >
              + Add Sidebar Item
            </button>
          </>
        );

      case "banners":
        return (
          <div>
            {form.banners && form.banners.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {form.banners.map((banner) => (
                  <div key={banner.id} className="border rounded overflow-hidden">
                    <img
                      src={`/api${banner.image_url}`}
                      alt={banner.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-2 text-sm font-medium">{banner.title}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No banners uploaded.</p>
            )}
          </div>
        );

      default:
        return <p>No category selected.</p>;
    }
  };

  // ...UI render structure remains the same
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Frontpage Settings</h2>

      <div className="mb-6">
        <label className="block font-medium mb-1">Select Display Mode</label>
        <select
          value={displayMode}
          onChange={(e) => setDisplayMode(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="dropdown">Dropdown</option>
          <option value="list">List</option>
          <option value="tabs">Tabs</option>
          <option value="accordion">Accordion</option>
          <option value="all">All</option>
        </select>
      </div>

      {displayMode === "dropdown" && (
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        >
          {categories.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.label}
            </option>
          ))}
        </select>
      )}

      {/* {displayMode === "list" && (
        <div className="flex gap-6 mb-4">
          <div className="w-1/4 flex flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded border text-left ${
                  selectedCategory === cat.key
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-gray-300 text-gray-700"
                } hover:bg-blue-50`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="w-3/4 border rounded p-4 bg-white shadow">
            <form onSubmit={handleTextUpdate} className="space-y-4">
              {renderFields(selectedCategory)}
              {selectedCategory !== "logo" && (
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Save Settings
                </button>
              )}
            </form>
          </div>
        </div>
      )} */}


      {displayMode === "list" && (
        <div className="flex gap-6 mb-4">
          {/* Left side: Category list */}
          <div className="w-1/4 flex flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded border text-left ${
                  selectedCategory === cat.key
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-gray-300 text-gray-700"
                } hover:bg-blue-50`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right side: Selected category form */}
          <div className="w-3/4 border rounded p-4 bg-white shadow">
            {selectedCategory === "logo" || selectedCategory === "banners" ? (
              renderFields(selectedCategory)
            ) : (
              <form onSubmit={handleTextUpdate} className="space-y-4">
                {renderFields(selectedCategory)}
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Save Settings
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {displayMode === "tabs" && (
        <>
          <div className="mb-4 border-b flex gap-4">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`py-2 px-4 border-b-2 ${
                  selectedCategory === cat.key
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleTextUpdate} className="space-y-4">
            {renderFields(selectedCategory)}
            {selectedCategory !== "logo" && (
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Save Settings
              </button>
            )}
          </form>
        </>
      )}

      {displayMode === "accordion" &&
        categories.map((cat) => (
          <div key={cat.key} className="mb-4 border rounded">
            <button
              onClick={() =>
                setSelectedCategory((prev) => (prev === cat.key ? "" : cat.key))
              }
              className="w-full text-left px-4 py-2 font-medium bg-gray-100 hover:bg-gray-200"
            >
              {cat.label}
            </button>
            {selectedCategory === cat.key && (
              <div className="p-4 border-t">{renderFields(cat.key)}</div>
            )}
          </div>
        ))}

      {/* {displayMode !== "all" && selectedCategory && displayMode !== "accordion" && (
        <form onSubmit={handleTextUpdate} className="space-y-4">
          {renderFields()}
          {selectedCategory !== "logo" && (
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save Settings
            </button>
          )}
        </form>
      )} */}

      {displayMode === "all" && (
        <form onSubmit={handleTextUpdate} className="space-y-8">
          {categories.map((cat) => (
            <div key={cat.key} className="border rounded p-4">
              <h4 className="text-lg font-semibold mb-4 text-blue-700">{cat.label}</h4>
              {renderFields(cat.key)}
              <hr className="my-4" />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save All Settings
          </button>
        </form>
      )}
    </div>
  );
}
