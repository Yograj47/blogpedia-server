const Blog = require("../model/blog");

const createBlog = async (req, res) => {
  const { title, author, tags, category, content, coverImage } = req.body;

  if (
    !title ||
    !author ||
    !Array.isArray(tags) ||
    tags.length === 0 ||
    !category ||
    !content ||
    !coverImage ||
    !coverImage.imageUrl
  ) {
    return res.status(400).json({
      message: "Empty or invalid value detected",
    });
  }

  try {
    const newPost = new Blog({
      title,
      author,
      tags,
      category,
      content,
      coverImage,
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      message: "Posted successfully",
      blogId: savedPost._id,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
    });
  }
};

module.exports = {
  createBlog,
};
