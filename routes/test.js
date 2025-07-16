// const UploadOnCloud = require("../config/Cloudinary");
// const express = require("express");
// const router = express.Router();

// // POST /api/upload
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded." });
//     }

//     // Upload to Cloudinary
//     const cloudResult = await UploadOnCloud(req.file.path);

//     // Clean up local temp file
//     fs.unlinkSync(req.file.path);

//     // Send response
//     res.status(200).json({
//       message: "File uploaded to Cloudinary successfully",
//       url: cloudResult.secure_url,
//       public_id: cloudResult.public_id,
//     });
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     res.status(500).json({
//       message: "Upload failed",
//       error: error.message || error,
//     });
//   }
// });

// module.exports = router;
