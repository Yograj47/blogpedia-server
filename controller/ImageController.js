const handleImageUpload = require("../utils/handleImageUpload");
const cloudinary = require("cloudinary").v2;

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
