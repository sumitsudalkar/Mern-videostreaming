const multer = require('multer');
const Video = require('../models/Video');  // Import the Video model
const fs = require('fs');
const uploadDirectory = 'uploads/videos/';
const path = require('path');
const ffmpeg = require("fluent-ffmpeg");


// Service to handle saving video metadata
const uploadVideo = async (file) => {
  try {
    // Save video metadata to MongoDB
    const video = new Video({
      filename: file.filename,
      filePath: file.path,
      uploadedAt: Date.now(),
      fileSize: file.size, // Store file size in the database if needed
    });

    await video.save(); // Save video metadata to MongoDB
    return video; // Return the saved video object
  } catch (err) {
    throw new Error('Error saving video metadata: ' + err.message); // Proper error handling
  }
};

// Service to retrieve a random video from the database
const getRandomVideoFromMongo = async () => {
  try {
    // Using MongoDB's aggregate with $sample to pick a random video
    const randomVideo = await Video.aggregate([{ $sample: { size: 1 } }]);

    if (randomVideo.length === 0) {
      throw new Error('No videos found');
    }

    return randomVideo[0]; // Return the random video document
  } catch (error) {
    throw new Error('Error retrieving random video: ' + error.message);
  }
};

// Set up Multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    cb(null, uploadDirectory); // Set destination for file upload
  },
  filename: (req, file, cb) => {
    // Create a unique filename using timestamp and original file name
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName); // Generate the unique file name
  },
});

// Filter to allow only video files
const fileFilter = (req, file, cb) => {
  const validMimeTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi'];
  if (validMimeTypes.includes(file.mimetype)) {
    cb(null, true); // File type is valid
  } else {
    cb(new Error('Invalid file type. Only videos are allowed!'), false); // Reject file if invalid type
  }
};

// Multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 },  // Limit file size to 100MB
});

// Service to handle video metadata storage in MongoDB
const uploadVideoMetadata = async (file) => {
  try {
    // Save video metadata to MongoDB
    const video = new Video({
      fileName: file.filename,
      filePath: file.path,
      uploadDate: Date.now(),
      fileSize: file.size,
    });

    await video.save(); // Save video metadata to MongoDB
    return video; // Return the saved video object
  } catch (err) {
    throw new Error('Error saving video metadata: ' + err.message); // Proper error handling
  }
};

// Function to get a random video from the directory
const getRandomVideoFromDirectory = () => {
  const files = fs.readdirSync(uploadDirectory).filter(file => ['.mp4', '.webm', '.avi'].includes(path.extname(file).toLowerCase()));

  if (files.length === 0) {
    throw new Error('No video files found in the directory');
  }

  const randomVideo = files[Math.floor(Math.random() * files.length)];
  return path.join(uploadDirectory, randomVideo);
};

const extractFrames = (videoPath, socket) => {
  const outputDirectory = 'uploads/frames';

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  // Frame extraction every 3 seconds
  ffmpeg(videoPath)
    .on('end', () => {
      console.log('Frames extraction complete');
      sendFrames(socket, outputDirectory); // After extraction, send the frames
    })
    .on('error', (err) => {
      console.error('Error extracting frames:', err.message);
    })
    .output(path.join(outputDirectory, '%03d.jpg')) // Save as frame-001.jpg, frame-002.jpg, etc.
    .fps(1 / 3) // Frame extraction every 3 seconds
    .run();

  // Function to send frames after extraction
  const sendFrames = (socket, dir) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.error('Error reading frames directory:', err);
        return;
      }

      // Sort the files in numerical order (001.jpg, 002.jpg, ...)
      files = files.filter(file => file.endsWith('.jpg')).sort();

      let frameIndex = 0;
      const frameInterval = setInterval(() => {
        if (frameIndex < files.length) {
          const framePath = path.join(dir, files[frameIndex]);
          socket.emit('new-frame', { framePath });
          frameIndex++;
        } else {
          clearInterval(frameInterval); // Stop sending frames after all are sent
        }
      }, 3000); // Send a frame every 3 seconds
    });
  };
};



module.exports = {
  uploadVideo,
  getRandomVideoFromMongo,
  uploadVideoMetadata,
  getRandomVideoFromDirectory,
  extractFrames,
  upload
};
