const Profile = require("../models/profile");

// Create or update profile
const createOrUpdateProfile = async (req, res) => {
    try {
        const {
            batch,
            branch,
            company,
            designation,
            location,
        } = req.body;

        const userId = req.user.userId;

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


// Get logged-in user's profile
const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const profile = await Profile.findOne({ userId });

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


// Get all alumni profiles
const getAllAlumni = async (req, res) => {
    try {
        const alumniProfiles = await Profile.find()
            .populate({
                path: "userId",
                match: { role: "Alumni" },
                select: "name email role isVerified",
            });

        // Remove profiles whose user is not an Alumni
        const filteredProfiles = alumniProfiles.filter(
            (profile) => profile.userId !== null
        );

        res.status(200).json({
            count: filteredProfiles.length,
            alumni: filteredProfiles,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get alumni profiles",
        });
    }
};


module.exports = {
    createOrUpdateProfile,
    getMyProfile,
    getAllAlumni,
};