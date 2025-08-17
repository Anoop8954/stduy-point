const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // your sequelize instance

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("student", "admin"),
    defaultValue: "student",
  },
}, {
  timestamps: true, // adds createdAt & updatedAt automatically
});

module.exports = User;
