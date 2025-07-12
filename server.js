require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectionDb = require("./config/Connection");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    // ["http://localhost:5173", "https://your-vercel-app.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
const blogRoutes = require("./routes/blog");
const contactRoutes = require("./routes/contact");

app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectionDb(process.env.MONGOOSE_URI);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

start();
