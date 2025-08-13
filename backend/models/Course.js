const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Course = sequelize.define("Course", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
  type: DataTypes.STRING, // store file path
  allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING, // e.g. "3 months"
    allowNull: false,
  },
});

module.exports = Course;
