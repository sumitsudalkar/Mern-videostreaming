const { extractFrames, getRandomVideoFromDirectory } = require("../services/videoUploadService");
const path = require('path');
const uploadDirectory = 'uploads/videos/';


class fetchRandomVideos {
    static fetchRandomVideosAndFrame(socket) {
        socket.on("fetchFrames", async () => {
            try {
                // Fetch a random video (might be a single video or an array)
                const videos = await getRandomVideoFromDirectory();
        
                console.log("Fetched videos:", videos); // Log the fetched data
        
                // Ensure `videos` is an array, if not, make it an array
                const videoList = Array.isArray(videos) ? videos : [videos];
        
                // Loop through each video and extract frames
                videoList.forEach((video) => {
                    const videoPath = video;
                    console.log(video)
                    extractFrames(videoPath, socket);
                });
            } catch (error) {
                console.log("fetchFrames error:", error);
                socket.emit("new-frame", { data: "Error" });
            }
        });
        
    }
}



module.exports = fetchRandomVideos;
