import React, { useState } from "react";
import "../styles/upload.css";
import uploadVideo from "../services/VideoUploadService";

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle video upload
  const handleUpload = async () => {
    debugger;
    if (!file) {
      setUploadMessage("Please select a video to upload.");
      return;
    }

    setIsUploading(true);
    setUploadMessage(""); // Clear any previous messages

    try {
      const data = await uploadVideo(file);
      console.log(data)
      setUploadMessage(`Video uploaded successfully`);
    } catch (error) {
      setUploadMessage(`Error: ${error.message}`);
    } finally {
      setIsUploading(false); 
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>

      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default UploadVideo;
