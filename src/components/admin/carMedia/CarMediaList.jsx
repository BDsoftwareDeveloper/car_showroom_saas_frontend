// import React, { useState } from "react";

// import { API_BASE_URL } from "../../../api/constants";

// import CarMediaPreviewModal from "./CarMediaPreviewModal";

// const CarMediaList = ({
//   carId,
//   mediaList,
//   deleteMedia,
//   setPrimaryMedia,
//   reorderMedia,
// }) => {
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const handleDragEnd = (e) => {
//     const order = Array.from(mediaList);
//     const [moved] = order.splice(e.source.index, 1);
//     order.splice(e.destination.index, 0, moved);
//     reorderMedia(order.map((m) => m.id));
//   };

//   return (
//     <div className="mt-4">
//       <div className="grid grid-cols-3 gap-4">
//         {mediaList.map((m) => (
//           <div key={m.id} className="relative border rounded-lg p-2">
//             <img
//               src={m.url.startsWith("http") ? m.url : API_BASE_URL + m.url}
//               alt="car"
//               className="w-full h-32 object-cover rounded cursor-pointer"
//               onClick={() =>
//                 setPreviewUrl(
//                   m.url.startsWith("http") ? m.url : API_BASE_URL + m.url
//                 )
//               }
//             />
//             <div className="flex justify-between mt-2">
//               <button
//                 onClick={() => setPrimaryMedia(m.id)}
//                 className={`text-xs px-2 py-1 rounded ${
//                   m.is_primary
//                     ? "bg-green-600 text-white"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {m.is_primary ? "Primary" : "Set Primary"}
//               </button>
//               <button
//                 onClick={() => deleteMedia(m.id)}
//                 className="text-xs bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {previewUrl && (
//         <CarMediaPreviewModal
//           imageUrl={previewUrl}
//           onClose={() => setPreviewUrl(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default CarMediaList;




// import React, { useState } from "react";
// import { API_BASE_URL } from "../../../api/constants";
// import CarMediaPreviewModal from "./CarMediaPreviewModal";

// const CarMediaList = ({
//   mediaList,
//   deleteMedia,
//   setPrimaryMedia,
//   reorderMedia,
// }) => {
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const handleSetPrimary = async (mediaId) => {
//     await setPrimaryMedia(mediaId); // hook updates state internally
//   };

//   return (
//     <div className="mt-4">
//       <div className="grid grid-cols-3 gap-4">
//         {mediaList.map((m) => (
//           <div key={m.id} className="relative border rounded-lg p-2">
//             <img
//               src={m.url.startsWith("http") ? m.url : API_BASE_URL + m.url}
//               alt="car"
//               className="w-full h-32 object-cover rounded cursor-pointer"
//               onClick={() =>
//                 setPreviewUrl(m.url.startsWith("http") ? m.url : API_BASE_URL + m.url)
//               }
//             />
//             <div className="flex justify-between mt-2">
//               <button
//                 onClick={() => handleSetPrimary(m.id)}
//                 className={`text-xs px-2 py-1 rounded ${
//                   m.is_primary ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {m.is_primary ? "Primary" : "Set Primary"}
//               </button>
//               <button
//                 onClick={() => deleteMedia(m.id)}
//                 className="text-xs bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {previewUrl && (
//         <CarMediaPreviewModal
//           imageUrl={previewUrl}
//           onClose={() => setPreviewUrl(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default CarMediaList;


import React, { useState } from "react";
import { API_BASE_URL } from "../../../api/constants";
import CarMediaPreviewModal from "./CarMediaPreviewModal";

const CarMediaList = ({ mediaList, deleteMedia, setPrimaryMedia, reorderMedia }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSetPrimary = (id) => {
    setPrimaryMedia(id);
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 gap-4">
        {mediaList.map((m) => (
          <div key={m.id} className="relative border rounded-lg p-2">
            <img
              src={m.url.startsWith("http") ? m.url : API_BASE_URL + m.url}
              alt="car"
              className="w-full h-32 object-cover rounded cursor-pointer"
              onClick={() => setPreviewUrl(m.url.startsWith("http") ? m.url : API_BASE_URL + m.url)}
            />
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleSetPrimary(m.id)}
                className={`text-xs px-2 py-1 rounded ${
                  m.is_primary
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {m.is_primary ? "Primary" : "Set Primary"}
              </button>
              <button
                onClick={() => deleteMedia(m.id)}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {previewUrl && (
        <CarMediaPreviewModal
          imageUrl={previewUrl}
          onClose={() => setPreviewUrl(null)}
        />
      )}
    </div>
  );
};

export default CarMediaList;
