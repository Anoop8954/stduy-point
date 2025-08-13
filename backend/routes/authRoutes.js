const express = require("express");
const { register, login, adminLogin } = require("../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],
  register
);

router.post("/login", login);
router.post("/admin/login", adminLogin);

module.exports = router;
