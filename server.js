require("dotenv").config();

const express = require("express");
const cors = require("cors");
const PORT = 3000;

const app = express();
const connectionDb = require("./config/Connection");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//routes
const blogRoutes = require("./routes/blog");
const contactRoutes = require("./routes/contact");

app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);

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
