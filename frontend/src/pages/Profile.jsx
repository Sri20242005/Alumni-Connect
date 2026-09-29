import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        batch: "",
        branch: "",
        company: "",
        designation: "",
        location: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Get existing profile
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:5000/api/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const profile = response.data.profile;

                setFormData({
                    batch: profile.batch || "",
                    branch: profile.branch || "",
                    company: profile.company || "",
                    designation: profile.designation || "",
                    location: profile.location || "",
                });
            } catch (error) {
                // 404 simply means the user has not created a profile yet
                if (error.response?.status !== 404) {
                    setError("Failed to load profile.");
                }
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage(response.data.message);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to save profile."
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <h1
                    className="text-2xl font-bold text-blue-600 cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                >
                    Alumni Connect
                </h1>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="text-blue-600 hover:underline"
                >
                    Back to Dashboard
                </button>
            </nav>

            {/* Profile form */}
            <main className="max-w-2xl mx-auto px-6 py-10">

                <div className="bg-white rounded-xl shadow-md p-8">

                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        My Profile
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Add your academic and professional information.
                    </p>

                    {message && (
                        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Batch */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Batch
                            </label>

                            <input
                                type="text"
                                name="batch"
                                value={formData.batch}
                                onChange={handleChange}
                                placeholder="Example: 2028"
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {/* Branch */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Branch
                            </label>

                            <input
                                type="text"
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                placeholder="Example: AI & DS"
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {/* Company */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Company
                            </label>

                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Example: Amazon"
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {/* Designation */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Designation
                            </label>

                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                placeholder="Example: Software Engineer"
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Example: Chennai"
                                className="w-full border rounded-lg px-4 py-3"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                        >
                            Save Profile
                        </button>

                    </form>
                </div>
            </main>
        </div>
    );
}

export default Profile;