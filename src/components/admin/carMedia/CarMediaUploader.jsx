import React, { useState } from "react";

const CarMediaUploader = ({ carId, uploadMedia }) => {
  const [files, setFiles] = useState([]);

  const handleUpload = () => {
    if (!files.length) return;
    uploadMedia(files);
    setFiles([]);
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        multiple
        onChange={(e) => setFiles([...e.target.files])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="btn bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Upload
      </button>
    </div>
  );
};

export default CarMediaUploader;
