const express = require("express");

const {
    registerUser,
    loginUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Protected route
router.get("/me", protect, (req, res) => {
    res.status(200).json({
        message: "You are authorized",
        user: req.user,
    });
});

module.exports = router;