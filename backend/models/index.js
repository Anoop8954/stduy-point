const sequelize = require("../config/database");

// Import models
const User = require("./User");
const Course = require("./Course");
const Enrollment = require("./Enrollment");

// Setup relationships
User.hasMany(Enrollment, { foreignKey: "userId", onDelete: "CASCADE" });
Course.hasMany(Enrollment, { foreignKey: "courseId", onDelete: "CASCADE" });

Enrollment.belongsTo(User, { foreignKey: "userId" });
Enrollment.belongsTo(Course, { foreignKey: "courseId" });

// Export DB object
const db = {
  sequelize,
  User,
  Course,
  Enrollment,
};

module.exports = db;
