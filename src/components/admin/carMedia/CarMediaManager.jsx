// import CarMediaUploader from "./CarMediaUploader";

// import CarMediaList from "./CarMediaList";
// import { useCarMedia } from "../../../hooks/useCarMedia";

// const CarMediaManager = ({ carId }) => {
//   const mediaHook = useCarMedia(carId);

//   return (
//     <div className="mt-6">
//       <h3 className="text-xl font-semibold text-blue-700 mb-4">Car Media</h3>

//       {/* Uploader */}
//       <CarMediaUploader carId={carId} uploadMedia={mediaHook.uploadMedia} />

//       {/* Media List */}
//       <CarMediaList
//         carId={carId}
//         mediaList={mediaHook.mediaList}
//         deleteMedia={mediaHook.deleteMedia}
//         setPrimaryMedia={mediaHook.setPrimaryMedia}
//         reorderMedia={mediaHook.reorderMedia}
//       />
//     </div>
//   );
// };

// export default CarMediaManager;


// const CarMediaManager = ({ carId }) => {
//   const { 
//     mediaList, 
//     loading, 
//     uploadMedia, 
//     deleteMedia, 
//     setPrimaryMedia, 
//     reorderMedia 
//   } = useCarMedia(carId);

//   return (
//     <div className="mt-6">
//       <h3 className="text-xl font-semibold text-blue-700 mb-4">Car Media</h3>

//       <CarMediaUploader uploadMedia={uploadMedia} />

//       {loading ? (
//         <p className="text-gray-500">Loading media...</p>
//       ) : (
//         <CarMediaList
//           mediaList={mediaList}
//           deleteMedia={deleteMedia}
//           setPrimaryMedia={setPrimaryMedia}
//           reorderMedia={reorderMedia}
//         />
//       )}
//     </div>
//   );
// };




import CarMediaUploader from "./CarMediaUploader";
import CarMediaList from "./CarMediaList";
import { useCarMedia } from "../../../hooks/useCarMedia";

const CarMediaManager = ({ carId }) => {
  const mediaHook = useCarMedia(carId);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">Car Media</h3>

      {/* Uploader */}
      <CarMediaUploader carId={carId} uploadMedia={mediaHook.uploadMedia} />

      {/* Media List */}
      <CarMediaList
        mediaList={mediaHook.mediaList}
        setPrimaryMedia={mediaHook.setPrimaryMedia}
        deleteMedia={mediaHook.deleteMedia}
        reorderMedia={mediaHook.reorderMedia}
      />
    </div>
  );
};

export default CarMediaManager;
