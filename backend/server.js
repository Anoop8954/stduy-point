require("dotenv").config();
const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");

// Create app first!
const app = express();

// Core middleware
app.use(express.json());
app.use(cors()); // production won’t need CORS if frontend served by backend

// Ensure uploads dir exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Serve uploads (images)
app.use("/uploads", express.static(uploadDir));

// Mount API routes with a clear prefix
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/enroll", require("./routes/enrollmentRoutes"));

// Serve React build in production
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../frontend/build");
  app.use(express.static(buildPath));
  app.get("*", (_req, res) =>
    res.sendFile(path.join(buildPath, "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

// DB connect (Sequelize)
const { sequelize } = require("./models");
sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch((e) => console.error("DB connection error:", e));

// Optionally sync (no destructive force!)
sequelize.sync({ alter: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
