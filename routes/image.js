const express = require("express");
const router = express.Router();
const upload = require("../middleware/imageUpload"); // multer
const {
  uploadHandler,
  deleteHandler,
} = require("../controller/ImageController");

router.post("/upload", upload.single("image"), uploadHandler);
router.delete("/delete/:public_id", deleteHandler);

module.exports = router;
