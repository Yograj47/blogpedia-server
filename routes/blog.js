const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");

const {
  getAllBlogs,
  createBlog,
  getBlogById,
  getLatestBlogs,
  updateBlogById,
} = require("../controller/blog");

router.route("/").get(getAllBlogs).post(upload.single("file"), createBlog); // Route to get all blogs and create a new blog
router.route("/latest").get(getLatestBlogs); // Route to get latest blogs
router
  .route("/:id")
  .get(getBlogById)
  .patch(upload.single("file"), updateBlogById); // Route to get a blog by ID

module.exports = router;
