// backend/app.js
const express = require('express');
const https = require('https'); // Used HTTPS for secure communication
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const videoRoutes = require('./routes/videoRoutes');
const socketServer = require("./services/socketService");
require('dotenv').config(); 
const cors = require('cors');

const app = express();

// Load certificates for HTTPS
const certPath = process.env.CERT_PATH || path.join(__dirname, 'certs', 'localhost.key');
const certKey = process.env.CERT_KEY || path.join(__dirname, 'certs', 'localhost.crt');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware to handle JSON data
app.use(express.json());
app.use(cors({ origin: '*' })); // Be mindful with CORS in production, consider restricting origins

// Set up routes
app.use('/api/video', videoRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the app if MongoDB connection fails
});

// Create HTTPS server with the certificates
const server = https.createServer(
    {
        key: fs.readFileSync(certPath),
        cert: fs.readFileSync(certKey),
    },
    app
);

// Initialize Socket.io after server creation
const io = socketServer.sio(server);
socketServer.connection(io);

// Start the server only after everything is set up
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
