const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  bulkCreateBlogs,
  getLatestBlogs,
} = require("../controller/blog");

router.route("/").get(getAllBlogs).post(createBlog);
router.route("/bulk").post(bulkCreateBlogs);
router.route("/latest").get(getLatestBlogs);
router.route("/:id").get(getBlogById).patch(updateBlog).delete(deleteBlog);

module.exports = router;
