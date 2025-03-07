const express = require('express');  
const router = express.Router();     
const { upload, uploadVideoMetadata } = require('../services/videoUploadService'); // Multer instance for video file upload
const path = require('path'); 

// Route for uploading a video
router.post('/upload', upload.single('video'), async (req, res) => {
  // Check if a video file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No video file uploaded.' }); // If no file is uploaded, return a 400 error
  }

  try {
    // Call the uploadVideo function to save the video metadata to MongoDB
    const video = await uploadVideoMetadata(req.file); 

    // Return a success message along with the saved video metadata
    res.status(200).json({
      message: 'Video uploaded and metadata saved successfully!',
      video: video
    });
  } catch (err) {
    // Catch and handle any errors during the upload or database saving process
    res.status(500).json({ error: err.message }); // Return error message with status 500
  }
});

module.exports = router;
