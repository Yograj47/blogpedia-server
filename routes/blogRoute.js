const express = require("express");
const { createBlog } = require("../controller/BlogController");
const router = express.Router();

router.route("/create").post(createBlog);

module.exports = router;
