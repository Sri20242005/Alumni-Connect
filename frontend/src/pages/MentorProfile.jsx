import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function MentorProfile() {
    const navigate = useNavigate();
    const location = useLocation();

    const alumni = location.state?.alumni;

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);

    // If no alumni data was passed
    if (!alumni) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Alumni profile not found
                    </h2>

                    <button
                        onClick={() => navigate("/alumni")}
                        className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Back to Alumni Directory
                    </button>
                </div>
            </div>
        );
    }

    const sendRequest = async (e) => {
        e.preventDefault();

        setSuccess("");
        setError("");

        if (!message.trim()) {
            setError("Please enter a message.");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setSending(true);

            const response = await axios.post(
                "http://localhost:5000/api/mentorship",
                {
                    alumniId: alumni.userId._id,
                    message: message.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess(response.data.message);
            setMessage("");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to send mentorship request."
            );
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
                <h1
                    onClick={() => navigate("/dashboard")}
                    className="text-2xl font-bold text-blue-600 cursor-pointer"
                >
                    Alumni Connect
                </h1>

                <button
                    onClick={() => navigate("/alumni")}
                    className="text-blue-600 hover:underline"
                >
                    Back to Alumni Directory
                </button>
            </nav>


            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-10">

                {/* Alumni Information */}
                <div className="bg-white rounded-xl shadow-md p-8 mb-6">

                    <h2 className="text-3xl font-bold text-gray-800">
                        {alumni.userId?.name || "Alumni"}
                    </h2>

                    <p className="text-blue-600 text-lg font-medium mt-1">
                        {alumni.designation || "Professional"}
                    </p>


                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">
                                Batch
                            </p>

                            <p className="font-semibold text-gray-800">
                                {alumni.batch || "Not provided"}
                            </p>
                        </div>


                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">
                                Branch
                            </p>

                            <p className="font-semibold text-gray-800">
                                {alumni.branch || "Not provided"}
                            </p>
                        </div>


                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">
                                Company
                            </p>

                            <p className="font-semibold text-gray-800">
                                {alumni.company || "Not provided"}
                            </p>
                        </div>


                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">
                                Location
                            </p>

                            <p className="font-semibold text-gray-800">
                                {alumni.location || "Not provided"}
                            </p>
                        </div>

                    </div>

                </div>


                {/* Mentorship Request */}
                <div className="bg-white rounded-xl shadow-md p-8">

                    <h3 className="text-2xl font-bold text-gray-800">
                        Request Mentorship
                    </h3>

                    <p className="text-gray-600 mt-2 mb-6">
                        Send a message to this alumni explaining what kind of
                        guidance you are looking for.
                    </p>


                    {success && (
                        <div className="mb-5 p-4 rounded-lg bg-green-100 text-green-700">
                            {success}
                        </div>
                    )}


                    {error && (
                        <div className="mb-5 p-4 rounded-lg bg-red-100 text-red-700">
                            {error}
                        </div>
                    )}


                    <form onSubmit={sendRequest}>

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Example: I would like guidance about software engineering, placements, and career preparation."
                            rows="5"
                            maxLength="500"
                            className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <p className="text-sm text-gray-500 mt-1">
                            {message.length}/500 characters
                        </p>


                        <button
                            type="submit"
                            disabled={sending}
                            className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {sending
                                ? "Sending Request..."
                                : "Send Mentorship Request"}
                        </button>

                    </form>

                </div>

            </main>
        </div>
    );
}

export default MentorProfile;