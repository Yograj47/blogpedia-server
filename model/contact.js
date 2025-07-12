// model/contact.js
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "User must provide their name"],
    maxLength: [50, "Name cannot be greater than 50 characters"],
  },
  Email: {
    type: String,
    required: [true, "User must provide their email"],
    maxLength: [100, "Email should not be greater than 100 characters"],
  },
  Message: {
    type: String,
    required: [true, "Message is also needed"],
  },
});

module.exports = mongoose.model("Contact", ContactSchema); // ✅ Fixed
