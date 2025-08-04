const fs = require("fs");
const path = require("path");
const UploadOnCloud = require("../config/Cloudinary");
const cloudinary = require("cloudinary").v2;

/**
 * Handles uploading image to Cloudinary and deleting the old image if provided
 * @param {Object} file - The uploaded file object (from multer)
 * @param {string} [oldPublicId] - The public_id of the previous image (optional)
 * @returns {Promise<{ secure_url: string, public_id: string }> }
 */
const handleImageUpload = async (file, oldPublicId = "") => {
  if (!file || !file.path) {
    throw new Error("filepath is not defined");
  }

  try {
    // Delete old image if provided
    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId);
    }

    // Upload to Cloudinary
    const uploadResult = await UploadOnCloud(file.path);

    // Only delete the temp file if it still exists
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return {
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  } catch (error) {
    // Safe unlink if needed
    if (file?.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    throw new Error("Image upload failed: " + error.message);
  }
};

module.exports = handleImageUpload;
