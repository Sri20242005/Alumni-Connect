const Profile = require("../models/profile");

// Create or update my profile
const createOrUpdateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const {
            batch,
            branch,
            company,
            designation,
            location,
        } = req.body;

        const profile = await Profile.findOneAndUpdate(
            { userId },
            {
                userId,
                batch,
                branch,
                company,
                designation,
                location,
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            message: "Profile saved successfully",
            profile,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to save profile",
        });
    }
};

// Get my profile
const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const profile = await Profile.findOne({ userId }).populate(
            "userId",
            "name email role isVerified"
        );

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found",
            });
        }

        res.status(200).json({
            profile,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get profile",
        });
    }
};

// Get all alumni
const getAllAlumni = async (req, res) => {
    try {
        const profiles = await Profile.find()
            .populate({
                path: "userId",
                select: "name email role isVerified",
                match: {
                    role: "Alumni",
                },
            })
            .sort({ createdAt: -1 });

        // Remove profiles whose users are not alumni
        const alumni = profiles.filter(
            (profile) => profile.userId !== null
        );

        res.status(200).json({
            count: alumni.length,
            profiles: alumni,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get alumni",
        });
    }
};

module.exports = {
    createOrUpdateProfile,
    getMyProfile,
    getAllAlumni,
};