const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [200, "Title must be at most 200 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      minlength: [2, "Author name must be at least 2 characters"],
      maxlength: [100, "Author name must be at most 100 characters"],
    },
    tags: {
      type: [String],
      validate: {
        validator: function (tags) {
          return tags.length <= 5;
        },
        message: "Maximum 5 tags allowed",
      },
      default: [],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["Food", "Travel", "Tech", "Lifestyle", "News"],
        message: "Category must be one of Food, Travel, Tech, Lifestyle, News",
      },
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [20, "Content must be at least 20 characters"],
    },
    coverImage: {
      imageUrl: { type: String, required: false },
      public_id: { type: String, required: false },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", BlogSchema);
