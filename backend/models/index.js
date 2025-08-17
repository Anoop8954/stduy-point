const sequelize = require("../config/db");
const User = require("./User");       // ✅ Ensure filename matches
const Course = require("./Course");
const Enrollment = require("./Enrollment");

// Relationships
User.hasMany(Enrollment, { foreignKey: "userId", onDelete: "CASCADE" });
Course.hasMany(Enrollment, { foreignKey: "courseId", onDelete: "CASCADE" });

Enrollment.belongsTo(User, { foreignKey: "userId" });
Enrollment.belongsTo(Course, { foreignKey: "courseId" });

module.exports = { sequelize, User, Course, Enrollment };
