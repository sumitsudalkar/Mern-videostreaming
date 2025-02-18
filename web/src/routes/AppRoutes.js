import React from "react";
import { Routes, Route } from "react-router-dom";
import UploadVideo from "../components/UploadVideo";
import FrameGrid from "../components/FrameGrid";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h2>Welcome to Video Streaming App</h2>} />
      <Route path="/upload" element={<UploadVideo />} />
      <Route path="/Stream" element={<FrameGrid />} />
    </Routes>
  );
};

export default AppRoutes;
