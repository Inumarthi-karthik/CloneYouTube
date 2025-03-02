const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config(); 
const app = express();
app.use(express.json());
app.use(cors());
const path = require("path");
const filePath = path.join(__dirname, "routes", "userRoutes.js");
console.log(filePath); // Debug output

app.use("/api/users", router);
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/youtube";
mongoose.set("strictQuery", false);
mongoose.connect(mongoURI)
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
