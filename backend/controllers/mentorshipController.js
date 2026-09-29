const MentorshipRequest = require("../models/mentorshipRequest");
const User = require("../models/user");

// Send a mentorship request
const sendMentorshipRequest = async (req, res) => {
    try {
        const studentId = req.user.userId;
        const { alumniId, message } = req.body;

        if (!alumniId) {
            return res.status(400).json({
                message: "Alumni ID is required",
            });
        }

        // Check whether the selected user is an alumni
        const alumni = await User.findOne({
            _id: alumniId,
            role: "Alumni",
        });

        if (!alumni) {
            return res.status(404).json({
                message: "Alumni not found",
            });
        }

        // Prevent duplicate pending requests
        const existingRequest = await MentorshipRequest.findOne({
            studentId,
            alumniId,
            status: "Pending",
        });

        if (existingRequest) {
            return res.status(400).json({
                message: "Mentorship request already sent",
            });
        }

        const request = await MentorshipRequest.create({
            studentId,
            alumniId,
            message,
        });

        res.status(201).json({
            message: "Mentorship request sent successfully",
            request,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to send mentorship request",
        });
    }
};


// Get mentorship requests received by an alumni
const getReceivedRequests = async (req, res) => {
    try {
        const alumniId = req.user.userId;

        const requests = await MentorshipRequest.find({
            alumniId,
        })
            .populate("studentId", "name email role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: requests.length,
            requests,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get mentorship requests",
        });
    }
};


// Get mentorship requests sent by a student
const getSentRequests = async (req, res) => {
    try {
        const studentId = req.user.userId;

        const requests = await MentorshipRequest.find({
            studentId,
        })
            .populate("alumniId", "name email role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: requests.length,
            requests,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get sent mentorship requests",
        });
    }
};


// Accept or reject a mentorship request
const updateMentorshipRequest = async (req, res) => {
    try {
        const alumniId = req.user.userId;
        const { requestId } = req.params;
        const { status } = req.body;

        if (!["Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({
                message: "Status must be Accepted or Rejected",
            });
        }

        const request = await MentorshipRequest.findOne({
            _id: requestId,
            alumniId,
        });

        if (!request) {
            return res.status(404).json({
                message: "Mentorship request not found",
            });
        }

        request.status = status;

        await request.save();

        res.status(200).json({
            message: `Mentorship request ${status.toLowerCase()} successfully`,
            request,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update mentorship request",
        });
    }
};


module.exports = {
    sendMentorshipRequest,
    getReceivedRequests,
    getSentRequests,
    updateMentorshipRequest,
};