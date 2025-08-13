// backend/controllers/courseController.js
const { Course } = require("../models");

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const { title, description, duration } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !description || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = await Course.create({
      title,
      description,
      duration,
      image: imagePath
    });

    res.status(201).json(course);
  } catch (err) {
    console.error("Error adding course:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration } = req.body;
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined; // undefined = don't change
    await course.update({
      ...(title && { title }),
      ...(description && { description }),
      ...(duration && { duration }),
      ...(imagePath !== undefined && { image: imagePath })
    });
    res.json({ message: "Course updated", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    await course.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
