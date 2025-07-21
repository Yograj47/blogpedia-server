const UploadOnCloud = require("../config/Cloudinary");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

/**
 * Handles uploading image to Cloudinary and deleting the old image if provided
 * @param {Object} file - The uploaded file object (from multer)
 * @param {string} [oldPublicId] - The public_id of the previous image (optional)
 * @returns {Promise<{ secure_url: string, public_id: string }>}
 */
const handleImageUpload = async (file, oldPublicId = "") => {
  if (!file) return { secure_url: "", public_id: "" };

  try {
    // Delete old image if provided
    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId);
    }

    // Upload new image
    const uploadResult = await UploadOnCloud(file.path);

    // Delete local temp file
    fs.unlinkSync(file.path);

    return {
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  } catch (error) {
    throw new Error("Image upload failed: " + error.message);
  }
};

module.exports = handleImageUpload;
