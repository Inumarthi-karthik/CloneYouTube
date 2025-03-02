const express = require("express");
const razorpay = require("../config/razorpay");
const User = require("../models/User");
const router = express.Router();

router.post("/checkout", async (req, res) => {
    const userId = req.body.userId;
    
    try {
        const options = {
            amount: 100 * 100, // Rs. 100
            currency: "INR",
            receipt: `receipt_${userId}`
        };

        const order = await razorpay.orders.create(options);
        res.json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/verify", async (req, res) => {
    const { userId, paymentId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isPremium = true;
        await user.save();

        res.json({ success: true, message: "Payment successful. You are now a premium user!" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
