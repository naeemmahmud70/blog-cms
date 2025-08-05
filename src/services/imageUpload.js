import axios from "axios";

export const generateImageUrl = async (file) => {
  const hostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  try {
    const imageData = new FormData();
    imageData.set("key", hostingKey);
    imageData.append("image", file);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      imageData
    );
    return response.data.data.display_url;
  } catch (error) {
    console.error("error", error?.response?.data?.error?.message ?? error.message);
    return null;
  }
};
