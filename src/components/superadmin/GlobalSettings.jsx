// import React, { useState, useEffect } from "react";
// import EntityManagement from "./EntityManagement";
// import apiGlobal from "../../api/axiosGlobal";

// export default function AdminCarManagement() {
//   const [tab, setTab] = useState("brands");
//   const [brands, setBrands] = useState([]);
//   const [models, setModels] = useState([]);
//   const [selectedBrandId, setSelectedBrandId] = useState(null);
//   const [selectedModelId, setSelectedModelId] = useState(null);

//   // Fetch all brands
//   const fetchBrands = async () => {
//     try {
//       const res = await apiGlobal.get("/car-brands/");
//       setBrands(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Fetch models by brand
//   const fetchModels = async (brandId) => {
//     if (!brandId) {
//       setModels([]);
//       setSelectedModelId(null);
//       return;
//     }
//     try {
//       const res = await apiGlobal.get("/car-models/by-brand", {
//         params: { brand_id: brandId },
//       });
//       setModels(res.data);
//     } catch (err) {
//       console.error(err);
//       setModels([]);
//       setSelectedModelId(null);
//     }
//   };

//   useEffect(() => {
//     fetchBrands();
//   }, []);

//   // Update models when brand changes
//   useEffect(() => {
//     fetchModels(selectedBrandId);
//   }, [selectedBrandId]);

//   return (
//     <div className="p-6">
//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6 border-b pb-2">
//         {["brands", "models", "variants"].map((t) => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             className={`px-4 py-2 rounded ${
//               tab === t ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             {t.charAt(0).toUpperCase() + t.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Brand Selection (for Models & Variants) */}
//       {(tab === "models" || tab === "variants") && (
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Select Brand</label>
//           <select
//             className="border rounded px-2 py-1 w-full"
//             value={selectedBrandId || ""}
//             onChange={(e) =>
//               setSelectedBrandId(Number(e.target.value) || null)
//             }
//           >
//             <option value="">-- Select Brand --</option>
//             {brands.map((b) => (
//               <option key={b.id} value={b.id}>
//                 {b.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Model Selection (for Variants) */}
//       {tab === "variants" && (
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Select Model</label>
//           <select
//             className="border rounded px-2 py-1 w-full"
//             value={selectedModelId || ""}
//             onChange={(e) =>
//               setSelectedModelId(Number(e.target.value) || null)
//             }
//             disabled={!selectedBrandId}
//           >
//             <option value="">-- Select Model --</option>
//             {models.map((m) => (
//               <option key={m.id} value={m.id}>
//                 {m.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Entity Management */}
//       {tab === "brands" && <EntityManagement entityType="brand" brands={brands} />}

//       {tab === "models" && selectedBrandId && (
//         <EntityManagement
//           entityType="model"
//           selectedBrandId={selectedBrandId}
//           brands={brands}
//           models={models}
//         />
//       )}

//       {tab === "variants" && selectedBrandId && selectedModelId && (
//         <EntityManagement
//           entityType="variant"
//           selectedBrandId={selectedBrandId}
//           selectedModelId={selectedModelId}
//           brands={brands}
//           models={models}
//         />
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import EntityManagement from "./EntityManagement";
import apiGlobal from "../../api/axiosGlobal";

export default function AdminCarManagement() {
  const [tab, setTab] = useState("brands");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedModelId, setSelectedModelId] = useState(null);

  // Fetch all brands
  const fetchBrands = async () => {
    try {
      const res = await apiGlobal.get("/car-brands/");
      setBrands(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch models by brand
  const fetchModels = async (brandId) => {
    if (!brandId) {
      setModels([]);
      setSelectedModelId(null);
      return;
    }
    try {
      const res = await apiGlobal.get("/car-models/by-brand", {
        params: { brand_id: brandId },
      });
      setModels(res.data);
    } catch (err) {
      console.error(err);
      setModels([]);
      setSelectedModelId(null);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Update models when brand changes
  useEffect(() => {
    fetchModels(selectedBrandId);
  }, [selectedBrandId]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b pb-2">
        {["brands", "models", "variants"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 font-semibold rounded-md transition ${
              tab === t
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Brand Selection (for Models & Variants) */}
      {(tab === "models" || tab === "variants") && (
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Select Brand</label>
          <select
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedBrandId || ""}
            onChange={(e) => setSelectedBrandId(Number(e.target.value) || null)}
          >
            <option value="">-- Select Brand --</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Model Selection (for Variants) */}
      {tab === "variants" && (
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Select Model</label>
          <select
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            value={selectedModelId || ""}
            onChange={(e) => setSelectedModelId(Number(e.target.value) || null)}
            disabled={!selectedBrandId}
          >
            <option value="">-- Select Model --</option>
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Entity Management */}
      <div className="bg-white rounded-lg shadow p-4">
        {tab === "brands" && <EntityManagement entityType="brand" brands={brands} />}
        {tab === "models" && selectedBrandId && (
          <EntityManagement
            entityType="model"
            selectedBrandId={selectedBrandId}
            brands={brands}
            models={models}
          />
        )}
        {tab === "variants" && selectedBrandId && selectedModelId && (
          <EntityManagement
            entityType="variant"
            selectedBrandId={selectedBrandId}
            selectedModelId={selectedModelId}
            brands={brands}
            models={models}
          />
        )}
      </div>
    </div>
  );
}
