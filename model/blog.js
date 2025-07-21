const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    content: {
      htmlContent: {
        type: String,
        required: [true, "HTML content is required"],
        maxlength: [20000, "HTML content is too long"],
      },
      jsonContent: {
        type: mongoose.Schema.Types.Mixed, // Stores Tiptap JSON structure
        required: [true, "JSON content is required"],
      },
    },

    author: {
      type: String,
      default: "Admin",
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      maxlength: [50, "Category cannot exceed 50 characters"],
      enum: ["Technology", "Lifestyle", "Travel", "Food", "Other"],
    },

    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)$/.test(v);
        },
        message: "Please enter a valid image URL (jpg, png, etc.)",
      },
    },

    cloudinaryId: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    likes: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    comments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
