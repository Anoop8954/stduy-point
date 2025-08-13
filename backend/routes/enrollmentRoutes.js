const express = require("express");
const { enrollCourse, getMyEnrollments, cancelEnrollment, getAllEnrollments } = require("../controllers/enrollmentController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.post("/:courseId", auth, enrollCourse);
router.get("/my", auth, getMyEnrollments);
router.delete("/:courseId", auth, cancelEnrollment);

// Admin only
router.get("/admin/all", auth, admin, getAllEnrollments);

module.exports = router;
