require("dotenv").config();

const express = require("express");
const cors = require("cors");
const PORT = 5000;

const app = express();
const connectionDb = require("./config/Connection");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const userRoute = require("./routes/userRoute");
const imageRoute = require("./routes/imageRoute");
const blogRoute = require("./routes/blogRoute");

app.use("/api/v1/users", userRoute);
app.use("/api/v1/images", imageRoute);
app.use("/api/v1/blogs", blogRoute);

const start = async () => {
  try {
    await connectionDb(process.env.MONGOOSE_URI);
    app.listen(PORT, () => console.log(`Server running on:${PORT}`));
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

// Start the server
start();
