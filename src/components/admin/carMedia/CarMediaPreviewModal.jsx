import React from "react";

const CarMediaPreviewModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <img
        src={imageUrl}
        alt="Preview"
        className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
      />
    </div>
  );
};

export default CarMediaPreviewModal;
