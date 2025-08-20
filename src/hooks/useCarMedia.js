


// // hooks/useCarMedia.js
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import api from "../api/axios";

// export const useCarMedia = (carId) => {
//   const [mediaList, setMediaList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchMedia = async () => {
//     if (!carId) return;
//     setLoading(true);
//     try {
//       const res = await api.get(`/cars/${carId}/media/`);
//       setMediaList(res.data);
//     } catch {
//       toast.error("Failed to load media");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadMedia = async (files) => {
//     const formData = new FormData();
//     [...files].forEach((f) => formData.append("files", f));
//     try {
//       await api.post(`/cars/${carId}/media/`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Media uploaded successfully");
//       fetchMedia();
//     } catch {
//       toast.error("Upload failed");
//     }
//   };

//   const deleteMedia = async (mediaId) => {
//     try {
//       await api.delete(`/cars/${carId}/media/${mediaId}`);
//       toast.success("Deleted successfully");
//       setMediaList((prev) => prev.filter((m) => m.id !== mediaId)); // Optimistic update
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   const setPrimaryMedia = async (mediaId) => {
//     try {
//       await api.patch(`/cars/${carId}/media/${mediaId}/primary`);
//       toast.success("Primary image updated");
//       setMediaList((prev) =>
//         prev.map((m) => ({ ...m, is_primary: m.id === mediaId }))
//       );
//     } catch {
//       toast.error("Failed to set primary");
//     }
//   };

//   const reorderMedia = async (orderIds) => {
//     try {
//       await api.patch(`/cars/${carId}/media/reorder`, { order: orderIds });
//       toast.success("Media reordered");
//       fetchMedia();
//     } catch {
//       toast.error("Reorder failed");
//     }
//   };

//   useEffect(() => {
//     fetchMedia();
//   }, [carId]);

//   return {
//     mediaList,
//     loading,
//     fetchMedia,
//     uploadMedia,
//     deleteMedia,
//     setPrimaryMedia,
//     reorderMedia,
//   };
// };



// hooks/useCarMedia.js
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

export const useCarMedia = (carId) => {
  const [mediaList, setMediaList] = useState([]);
  const [mainImage, setMainImage] = useState(null); // <-- main image for CarInfo
  const [loading, setLoading] = useState(false);

  const fetchMedia = async () => {
    if (!carId) return;
    setLoading(true);
    try {
      const res = await api.get(`/cars/${carId}/media/`);
      setMediaList(res.data);

      // Set mainImage: primary or first media
      const primary = res.data.find((m) => m.is_primary);
      setMainImage(primary ? primary.url : res.data[0]?.url || null);
    } catch {
      toast.error("Failed to load media");
      setMainImage(null);
    } finally {
      setLoading(false);
    }
  };

  const uploadMedia = async (files) => {
    const formData = new FormData();
    [...files].forEach((f) => formData.append("files", f));
    try {
      await api.post(`/cars/${carId}/media/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Media uploaded successfully");
      fetchMedia();
    } catch {
      toast.error("Upload failed");
    }
  };

  const deleteMedia = async (mediaId) => {
    try {
      await api.delete(`/cars/${carId}/media/${mediaId}`);
      setMediaList((prev) => prev.filter((m) => m.id !== mediaId));
      toast.success("Deleted successfully");

      // Update mainImage if deleted media was primary
      setMainImage((prev) => {
        if (prev === mediaList.find((m) => m.id === mediaId)?.url) {
          const newPrimary = mediaList.find((m) => m.id !== mediaId && m.is_primary);
          return newPrimary ? newPrimary.url : mediaList[0]?.url || null;
        }
        return prev;
      });
    } catch {
      toast.error("Delete failed");
    }
  };

  const setPrimaryMedia = async (mediaId) => {
  try {
    await api.patch(`/cars/${carId}/media/${mediaId}/primary`);

    setMediaList((prev) => {
      const updated = prev.map((m) => ({ ...m, is_primary: m.id === mediaId }));
      // Update mainImage based on updated list
      const primary = updated.find((m) => m.is_primary);
      setMainImage(primary?.url || null);
      return updated;
    });

    toast.success("Primary image updated");
  } catch {
    toast.error("Failed to set primary");
  }
};

  const reorderMedia = async (orderIds) => {
    try {
      await api.patch(`/cars/${carId}/media/reorder`, { order: orderIds });
      toast.success("Media reordered");
      fetchMedia();
    } catch {
      toast.error("Reorder failed");
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [carId]);

  return {
    mediaList,
    mainImage, // <-- expose main image
    loading,
    fetchMedia,
    uploadMedia,
    deleteMedia,
    setPrimaryMedia,
    reorderMedia,
  };
};
