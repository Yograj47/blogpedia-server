require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectionDb = require("./config/Connection");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    // ["http://localhost:5173", "https://your-vercel-app.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Routes
const blogRoutes = require("./routes/blog");
const contactRoutes = require("./routes/contact");

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: "Server running",
    status: true,
  });
});

// API Routes
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/contact", contactRoutes);

// Start Server
const PORT = process.env.PORT;
const start = async () => {
  try {
    await connectionDb(process.env.MONGOOSE_URI);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

start();
