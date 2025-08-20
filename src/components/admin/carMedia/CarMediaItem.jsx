import { API_BASE_URL } from "../../../api/constants"; // Adjusted import path

const CarMediaItem = ({ media, onSetPrimary, onDelete }) => {
  return (
    <div className="relative border rounded-lg p-2">
      <img
        src={media.url.startsWith("http") ? media.url : API_BASE_URL + media.url}
        alt="car"
        className="w-full h-32 object-cover rounded"
      />
      <div className="flex justify-between mt-2">
        <button
          onClick={() => onSetPrimary(media.id)}
          className={`text-xs px-2 py-1 rounded ${
            media.is_primary ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {media.is_primary ? "Primary" : "Set Primary"}
        </button>
        <button
          onClick={() => onDelete(media.id)}
          className="text-xs bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CarMediaItem;
