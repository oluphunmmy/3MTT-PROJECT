const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
} = require("../controller/auth.controller.js");
const authMiddleware = require("../middleware/authMiddleware.js");

// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);

// Protected route for getting user profile
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
