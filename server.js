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

const userRoute = require("./routes/user");
const imageRoute = require("./routes/image");
const blogRoute = require("./routes/blog");

app.use("/api/v1/user", userRoute);
app.use("/api/v1/image", imageRoute);
app.use("/api/v1/blog", blogRoute);

const start = async () => {
  try {
    await connectionDb(process.env.MONGOOSE_URI);
    app.listen(PORT, () =>
      console.log(`Server running: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

// Start the server
start();
