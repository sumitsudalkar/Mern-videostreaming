import React, { useEffect, useState } from 'react';
import { useSocket } from './SocketProvider';

const FrameGrid = () => {
  const { socket } = useSocket();
  const [frames, setFrames] = useState(Array(4).fill(null)); // Initial state for frames

  // Request random video frames when the component mounts
  useEffect(() => {
    if (socket) {
      console.log("Requesting random video frames...");
      socket.emit("fetchFrames");
    }
  }, [socket]);

  // Handle incoming frames and update state
  useEffect(() => {
    if (!socket) return;

    const handleNewFrames = (data) => {
      console.log(data); // Log the incoming data for debugging
      // Check if data contains framePath, which is a pattern
      if (data && data.framePath) {
        const framePathPattern = data.framePath;  // Get the pattern (e.g., 'uploads/frames/%03d.jpg')

        // Generate 4 distinct frame paths by replacing the pattern with numbers (001, 002, 003, 004)
        const newFrames = [];
        for (let i = 1; i <= 4; i++) {
          const framePath = framePathPattern.replace('%03d', String(i).padStart(3, '0'));  // Replace with 001, 002, 003, 004
          newFrames.push(framePath);
        }

        // Update the frames state with generated frame paths
        setFrames(newFrames);
      } else {
        console.error('Expected framePath in data, but received:', data);
      }
    };

    socket.on("new-frame", handleNewFrames);

    // Cleanup the socket listener on unmount
    return () => {
      socket.off("new-frame", handleNewFrames);
    };
  }, [socket]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        padding: '20px',
        minHeight: '100vh',  // Ensure the container takes the full height of the viewport
      }}
    >
      {frames && frames.length > 0 && frames.every(frame => frame === null) ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh', // Make it take full height of the viewport
            textAlign: 'center',
            gridColumn: 'span 2', // Make this span across all columns in the grid
          }}
        >
          <div
            style={{
              fontSize: '40px',
              marginBottom: '20px',
            }}
          >
            🙂 No frames available yet!
          </div>
          <div>Loading frames...</div>
        </div>
      ) : (
        frames.map((frame, index) => (
          <div
            key={index}
            style={{
              border: '1px solid black',
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {frame ? (
              <img
                src={`https://localhost:5000/${frame}`} // Assuming frame is a URL or relative path
                alt={`Frame ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.5s ease-in-out',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#ccc',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className="spinner"></div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default FrameGrid;
