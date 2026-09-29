const express = require("express");

const {
    sendMentorshipRequest,
    getReceivedRequests,
    getSentRequests,
    updateMentorshipRequest,
} = require("../controllers/mentorshipController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Student sends a mentorship request
router.post("/", protect, sendMentorshipRequest);


// Alumni gets requests they received
router.get("/received", protect, getReceivedRequests);


// Student gets requests they sent
router.get("/sent", protect, getSentRequests);


// Alumni accepts or rejects a request
router.put("/:requestId", protect, updateMentorshipRequest);


module.exports = router;