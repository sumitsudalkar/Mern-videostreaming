# **Video Streaming Project with MERN Stack & Socket.IO**

## **Overview**

This project utilizes the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO to build a scalable, real-time video frame streaming application. The backend handles video uploads, extracts frames from the videos, and streams them to the frontend, which displays the frames in a 2x2 grid layout. The streaming process is handled with a Socket.IO service for scalability, and events are used to handle different tasks in the backend.

---

## **Features**
- **Video Upload**: Users can upload videos via an API endpoint.
- **Real-time Frame Streaming**: The backend extracts frames from videos at a 3-second interval, and streams them to the frontend using Socket.IO.
- **2x2 Grid Layout**: The frontend renders the frames in a 2x2 grid layout with seamless updates.
- **Modular Event Handling**: Different tasks (video processing, frame extraction) are handled by dedicated events in the backend for scalability.
- **Dockerized Environment**: The application is containerized using Docker, with MongoDB running in a container to store video metadata.

---

## **Technical Stack**
- **Backend**: Node.js, Express, Socket.IO, ffmpeg
- **Frontend**: React, Socket.IO Client
- **Database**: MongoDB (via Docker container)
- **Containerization**: Docker (for application and MongoDB)
- **Event Handling**: Socket.IO Events for different tasks

---

## **Endpoints**
- **Video Grid**:  
  `GET http://localhost:3000/stream`  
  Displays the 2x2 grid of frames extracted from videos.

- **Video Upload**:  
  `POST http://localhost:3000/upload`  
  Uploads a video to the server for frame extraction.

---

## **Project Structure**

### **Backend (`api` Folder)**
- The **`api`** folder contains the entire backend flow, including:
  - **Routes**: Handling video uploads and frame extraction.
  - **Events**: Managing different Socket.IO events for scalability and task separation.
  - **Services**: Logic for frame extraction and video processing.
  - **Socket.IO**: A service that manages the real-time communication between backend and frontend.
  - **Uploads**: Directory for storing uploaded video files and temporary frame storage.

### **Frontend**
- **`/src`**: Contains React components for displaying the 2x2 grid and handling Socket.IO client-side logic.
- **`/context`**: Contains the Socket.IO provider to manage the socket connection with the backend.

---

## **Setup and Usage**

### **Prerequisites**
- Docker and Docker Compose installed on your system.
- Node.js and npm (for local development setup).
- ffmpeg installed (for video frame extraction).

---

## **How to Build and Run Using Docker Compose**

### **Docker Setup:**

1. **Clone the Repository**:
   Clone the repository to your local machine.

   ```bash
   git clone https://github.com/your-repository/video-streaming
   cd video-streaming
2. **Build the Docker Containers**:
    Build the necessary images for the backend, frontend, and MongoDB services defined in docker-compose.yml:
    docker-compose up --build
   This command will:
   Build the Docker images for all services (backend, frontend, MongoDB).
   Start the backend API, frontend React application, and Mongo

3. **Start the Docker Containers**:
  Once the build process is complete, the following command will run the containers:
  docker-compose up
  This will:
  Start the application, including the backend, frontend, and MongoDB services in Docker containers.
  The application will be accessible at http://localhost:3000/.

4. **Access the Application**:
    Frontend (2x2 Grid):
    Visit http://localhost:3000/stream to see the 2x2 grid displaying frames from the uploaded videos.
    Video Upload:
    Use the POST endpoint at http://localhost:3000/upload to upload your video (via API, Postman, or other tools).
    **Note**: Ensure your system has enough memory to run the MongoDB Docker container, especially if your machine has limited resources. If MongoDB fails to start, try running on a VM or system         with more memory.
       
**How to Run Without Docker**
If you prefer not to use Docker, follow these instructions to run the project locally.

Install Dependencies:

**Backend**: In the backend directory, run the following command to install the required dependencies:
cd api
npm install
**Frontend**: In the frontend directory, run the following command to install the required dependencies:
cd web
npm install

**Start the Backend**: In the backend directory, start the backend server using:
npm start
This will run the backend on http://localhost:5000.
**Start the Frontend**: In the frontend directory, start the React app using:
npm start
This will run the frontend on http://localhost:3000.

**Creating a Self-Signed SSL Certificate**
Step 1: Generate the Private Key
openssl genpkey -algorithm RSA -out localhost.key -aes256

Step 2: Create the Self-Signed Certificate
openssl x509 -req -in localhost.csr -signkey localhost.key -out localhost.crt

**File and Directory Structure**
**Backend (api)**
/api: Contains the entire backend logic, including:
/routes: Defines routes for video upload and frame extraction.
/events: Handles all Socket.IO events for tasks like frame extraction and streaming.
/services: Contains the logic for frame extraction and video processing.
/socket: Manages the real-time communication between frontend and backend using Socket.IO.
/uploads: Folder to store video files and metadata.
**Frontend**
/src: Contains React components.
/context: Manages the Socket.IO provider to maintain the connection to the backend.
Known Issues and Troubleshooting
Memory Constraints for MongoDB: The MongoDB Docker container might fail to start on machines with insufficient memory. If this happens, the application should work on virtual machines or systems with more resources. Ensure Docker is allocated sufficient memory for MongoDB to function properly.

Video Upload Failures: If the video upload API doesn’t work, ensure the backend server has the correct permissions to write files to the /uploads directory, and ensure that ffmpeg is correctly configured.
