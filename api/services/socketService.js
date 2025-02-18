const socketIO = require("socket.io");
const fetchRandomVideos = require("../Events/getRandomFrames");

exports.sio = (server) => {
    return socketIO(server, {
        transports: ["websocket", "polling"], // Using both websocket and polling
        cors: {
            origin: "*", // Ideally replace * with specific domains in production
            methods: ['GET', 'POST'], // Restrict allowed HTTP methods
        },
    });
};

exports.connection = (io) => {
    // Handle socket connection
    io.on("connection", (socket) => {
        console.log("An end user is connected", socket.id);

        fetchRandomVideos.fetchRandomVideosAndFrame(socket)

        // Handle socket errors
        socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
        });

        // Handle socket disconnection
        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} disconnected`);

            // Optionally, remove the user from an active users list or perform cleanup
            // If you're tracking live users, you might do something like:
            // removeFromActiveUsers(socket.id);
        });
    });
};
