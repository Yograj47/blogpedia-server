const blog = require("../model/blog");
const handleImageUpload = require("../utils/handleImageUpload.js");

/** * @desc Get all blogs
 * @route GET /api/v1/blog
 * @access Public
 */
const getAllBlogs = async (req, res) => {
  try {
    const { category } = req.query;
    let blogs;

    if (category) {
      blogs = await blog.find({ category });
    } else {
      blogs = await blog.find({});
    }

    res.status(200).json({
      success: true,
      data: blogs,
      message: "Blogs fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

/** * @desc Get all blogs
 * @route GET /api/v1/blog/latest
 * @access Public
 */
const getLatestBlogs = async (req, res) => {
  try {
    const blogs = await blog.find().sort({ createdAt: -1 }).limit(4);

    res.status(200).json({
      success: true,
      data: blogs,
      message: "Blogs fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

/**
 * @desc    Create a new blog
 * @route   POST /api/v1/blog
 * @access  Public
 */
const createBlog = async (req, res) => {
  try {
    const file = req.file;

    // Upload image if provided
    let imageUrl = "";
    let cloudinaryId = "";

    const { secure_url, public_id } = await handleImageUpload(file);
    imageUrl = secure_url;
    cloudinaryId = public_id;

    // Parse JSON stringified content if coming via multipart/form-data
    let parsedContent;
    if (typeof req.body.content === "string") {
      try {
        parsedContent = JSON.parse(req.body.content);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid content format. Must be valid JSON.",
        });
      }
    } else {
      parsedContent = req.body.content;
    }

    // Build blog object
    const newBlog = await blog.create({
      title: req.body.title,
      content: parsedContent,
      author: req.body.author || "Admin",
      category: req.body.category,
      tags: req.body.tags ? JSON.parse(req.body.tags) : [], // if tags come as string
      imageUrl,
      cloudinaryId,
    });

    res.status(201).json({
      success: true,
      data: newBlog,
      message: "Blog created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

/** * @desc Get a blog by ID
 * @route GET /api/v1/blog/:id
 * @access Public
 *  @param {string} id - The ID of the blog to retrieve
 */
const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blogData = await blog.findById({ _id: blogId });
    if (!blogData) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      data: blogData,
      message: "Blog fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

/** * @desc patch/put a blog by ID
 * @route PATCH /api/v1/blog/:id
 * @access Public
 *  @param {string} id - The ID of the blog to update
 */
const updateBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const existingBlog = await blog.findById(blogId);
    if (!existingBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    let imageUrl = existingBlog.imageUrl;
    let cloudinaryId = existingBlog.cloudinaryId;

    if (req.file) {
      const uploadResult = await handleImageUpload(
        req.file,
        existingBlog.cloudinaryId
      );
      imageUrl = uploadResult.secure_url;
      cloudinaryId = uploadResult.public_id;
    }

    const parsedTags = req.body.tags
      ? JSON.parse(req.body.tags)
      : existingBlog.tags;
    const parsedContent =
      typeof req.body.content === "string"
        ? JSON.parse(req.body.content)
        : req.body.content;

    // Now update blog
    const updatedBlog = await blog.findByIdAndUpdate(
      blogId,
      {
        title: req.body.title,
        content: parsedContent,
        category: req.body.category,
        tags: parsedTags,
        imageUrl,
        cloudinaryId,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedBlog,
      message: "Blog updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

module.exports = {
  getAllBlogs,
  getLatestBlogs,
  createBlog,
  getBlogById,
  updateBlogById,
};
