// backend/models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    filePath: {
        type: String,
        required: true, // Store the path to the uploaded video
    },
    fileName: {
        type: String,
        required: true, // Original name of the file
    },
    uploadDate: {
        type: Date,
        default: Date.now, // Store the upload time
    }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
