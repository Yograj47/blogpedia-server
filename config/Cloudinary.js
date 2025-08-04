require("dotenv").config();
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const UploadOnCloud = async (filepath) => {
  try {
    if (!filepath) {
      throw new Error("Filepath is required for uploading to Cloudinary");
    }
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });
    console.log("File uploaded successfully:", response);
    return response;
  } catch (error) {
    fs.unlinkSync(filepath);
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

module.exports = UploadOnCloud;
