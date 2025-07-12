const blog = require("../model/blog");

/** * @desc Get all blogs
 * @route GET /api/blogs
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
 * @route GET /api/blogs
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

/** * @desc Create a new blog
 * @route POST /api/blogs
 * @access Public
 */
const createBlog = async (req, res) => {
  try {
    const blog = await blog.create(req.body);
    res.status(201).json({
      success: true,
      data: blog,
      message: "Blog created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

/**
 * @desc   Create multiple blogs at once
 * @route  POST /api/blogs/bulk
 * @access Public
 */
const bulkCreateBlogs = async (req, res) => {
  try {
    const blogs = await blog.insertMany(req.body);
    res.status(201).json({
      success: true,
      data: blogs,
      message: "Multiple blogs created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

/** * @desc Get a blog by ID
 * @route GET /api/blogs/:id
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

/** * @desc Update a blog by ID
 * @route PUT /api/blogs/:id
 * @access Public
 * @param {string} id - The ID of the blog to update
 */
const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blogData = await blog.findByIdAndUpdate({ _id: blogId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blogData) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      data: blogData,
      message: "Blog updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

/** * @desc Delete a blog by ID
 * @route PUT /api/blogs/:id
 * @access Public
 * @param {string} id - The ID of the blog to update
 */
const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blogData = await blog.findByIdAndDelete({ _id: blogId });
    if (!blogData) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = {
  getAllBlogs,
  getLatestBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  bulkCreateBlogs,
};
