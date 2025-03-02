const User = require("../models/User.js"); // Ensure correct path

// Function to add points when a user watches a video
const addPoints = async (req, res) => {
    try {
        const { userId, videoCount } = req.body;
        const pointsToAdd = videoCount * 5; // 5 points per video

        // Find user by ID and update points
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.points += pointsToAdd;
        await user.save();

        res.json({ message: "Points added successfully", totalPoints: user.points });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Function to get user points
const getUserPoints = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ points: user.points });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { addPoints, getUserPoints };
