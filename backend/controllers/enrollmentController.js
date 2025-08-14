const { Enrollment, Course } = require("../models");

exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params; // ✅ FIXED

    // Debugging
    console.log("Enrolling user:", req.user.id, "in course:", courseId);

    // Check if already enrolled
    const existing = await Enrollment.findOne({
      where: { userId: req.user.id, courseId }
    });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      userId: req.user.id,
      courseId
    });

    res.json({ message: "Enrolled successfully", enrollment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






// View my enrollments
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { userId: req.user.id },
      include: [Course]
    });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cancel enrollment
exports.cancelEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const enrollment = await Enrollment.findOne({
      where: { userId: req.user.id, courseId }
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    await enrollment.destroy();
    res.json({ message: "Enrollment cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: view all enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({ include: [Course] });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
