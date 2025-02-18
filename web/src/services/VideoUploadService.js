import axios from "axios";
import ApiUrlConstants from "../constants/ApiUrlConstants";

const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append("video", file);

  try {
    const response = await axios.post(ApiUrlConstants.UPLOAD_VIDEO, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Return the uploaded video's response (metadata or success message)
  } catch (error) {
    // Handle error here
    throw new Error(error.response?.data?.message || "Error uploading video");
  }
};


export default uploadVideo
