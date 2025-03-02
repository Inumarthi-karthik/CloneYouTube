const express = require("express");
const { addPoints, getUserPoints } = require("controllers\UserController.js"); // Ensure correct path

const router = express.Router();

// Route to add points when a user watches a video
router.post("/add-points", addPoints);

// Route to get user points
router.get("/points/:userId", getUserPoints);

module.exports = router;
