const express = require("express");
const { getCourses, addCourse, updateCourse, deleteCourse } = require("../controllers/courseController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getCourses);
router.post("/", auth, admin, upload.single("image"), addCourse);
router.put("/:id", auth, admin, upload.single("image"), updateCourse);
router.delete("/:id", auth, admin, deleteCourse);

module.exports = router;
