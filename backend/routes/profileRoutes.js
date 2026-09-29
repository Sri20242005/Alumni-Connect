const express = require("express");

const {
    createOrUpdateProfile,
    getMyProfile,
    getAllAlumni,
} = require("../controllers/profileController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Create or update logged-in user's profile
router.post("/", protect, createOrUpdateProfile);


// Get logged-in user's profile
router.get("/", protect, getMyProfile);


// Get all alumni profiles
router.get("/alumni", protect, getAllAlumni);


module.exports = router;