const mongoose = require("mongoose");

const connectionDb = async (url) => {
  return mongoose.connect(url);
};

module.exports = connectionDb;
