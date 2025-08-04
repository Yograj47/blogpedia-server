const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    match: [/^[a-zA-Z\s]+$/, "Name should contain only letters and spaces"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
  },
  role: {
    type: String,
    enum: ["admin", "author", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
