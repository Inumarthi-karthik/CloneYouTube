const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isPremium: { type: Boolean, default: false },
    lastDownload: { type: Date, default: null },
    downloadedVideos: [{ type: String }]
});

module.exports = mongoose.model("User", userSchema);
