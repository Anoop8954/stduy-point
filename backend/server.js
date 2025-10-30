const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

// Middlewares
app.use(cors({
  origin: ["https://studypointtechy.netlify.app"], // ✅ remove trailing slash
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/enroll", enrollmentRoutes);

// Database
const sequelize = require("./config/database");

sequelize.sync({ alter: true })
  .then(() => console.log("✅ All models synchronized successfully."))
  .catch(err => console.error("❌ Model synchronization failed:", err));

// Start server
const PORT = process.env.PORT || 5000; // ✅ use 5000 instead of 5432
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
