const express = require("express");
const Video = require("../models/Video");
const User = require("../models/User");
const router = express.Router();

router.get("/download/:id", async (req, res) => {
    const userId = req.query.userId;
    const videoId = req.params.id;

    try {
        const user = await User.findById(userId);
        const video = await Video.findById(videoId);

        if (!user || !video) return res.status(404).json({ message: "User or Video not found" });

        const today = new Date().setHours(0, 0, 0, 0);
        const lastDownload = user.lastDownload ? new Date(user.lastDownload).setHours(0, 0, 0, 0) : null;

        if (!user.isPremium && lastDownload === today) {
            return res.status(403).json({ message: "Daily limit reached. Upgrade to premium!" });
        }

        user.lastDownload = new Date();
        user.downloadedVideos.push(video.url);
        await user.save();

        res.json({ success: true, videoUrl: video.url });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
