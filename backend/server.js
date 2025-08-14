const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL, // we'll set this in .env later
  credentials: true
}));
app.use(express.json()); // Required to parse JSON bodies
app.use(express.urlencoded({ extended: true }));


// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
app.use("/enroll", require("./routes/enrollmentRoutes"));


app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);

// Database
const { sequelize } = require("./models");

sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ DB Error:", err));

// Start server
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
