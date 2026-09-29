const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        batch: {
            type: String,
            trim: true,
        },

        branch: {
            type: String,
            trim: true,
        },

        company: {
            type: String,
            trim: true,
        },

        designation: {
            type: String,
            trim: true,
        },

        location: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Profile", profileSchema);