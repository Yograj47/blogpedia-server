const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");

const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  // bulkCreateBlogs,
  getLatestBlogs,
} = require("../controller/blog");

router.route("/").get(getAllBlogs).post(upload.single("file"), createBlog); // Route to get all blogs and create a new blog
// router.route("/bulk").post(bulkCreateBlogs); // Testing route for bulk creation
router.route("/latest").get(getLatestBlogs); // Route to get latest blogs
router.route("/:id").get(getBlogById).patch(updateBlog).delete(deleteBlog); // CRUD operations for individual blog posts

module.exports = router;
