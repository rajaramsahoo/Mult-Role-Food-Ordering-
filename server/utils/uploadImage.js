import cloudinary from "./cloudinary.js";

const uploadImage = async (file) => {
  const base64Image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  const uploadResponse = await cloudinary.uploader.upload(base64Image);
  return uploadResponse.secure_url;
};

export default uploadImage;
