const handleImageUpload = require("../utils/handleImageUpload");
const cloudinary = require("cloudinary").v2;

// POST: /api/v1/users/upload
const uploadHandler = async (req, res) => {
  const file = req.file;
  console.log(file);
  if (!file) return res.status(400).json({ error: "No file provided" });

  try {
    const result = await handleImageUpload(file);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: /api/v1/users//delete/:public_id
const deleteHandler = async (req, res) => {
  try {
    const publicId = decodeURIComponent(req.params.public_id);
    if (!publicId) {
      return res.status(400).json({ error: "No public id provided" });
    }

    await cloudinary.uploader.destroy(publicId);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ error: "Failed to delete image" });
  }
};

module.exports = {
  uploadHandler,
  deleteHandler,
};
