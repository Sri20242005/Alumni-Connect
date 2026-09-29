import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReceivedRequests() {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:5000/api/mentorship/received",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setRequests(response.data.requests);
            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load mentorship requests."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [navigate]);

    const updateRequest = async (requestId, status) => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setUpdatingId(requestId);
            setError("");

            const response = await axios.put(
                `http://localhost:5000/api/mentorship/${requestId}`,
                {
                    status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update the request status on the page
            setRequests((previousRequests) =>
                previousRequests.map((request) =>
                    request._id === requestId
                        ? {
                            ...request,
                            status: response.data.request.status,
                        }
                        : request
                )
            );
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to update mentorship request."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusStyle = (status) => {
        if (status === "Accepted") {
            return "bg-green-100 text-green-700";
        }

        if (status === "Rejected") {
            return "bg-red-100 text-red-700";
        }

        return "bg-yellow-100 text-yellow-700";
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
                    onClick={() => navigate("/dashboard")}
                    className="text-blue-600 hover:underline"
                >
                    Back to Dashboard
                </button>
            </nav>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Mentorship Requests
                    </h2>

                    <p className="text-gray-600 mt-2">
                        View and manage mentorship requests sent by students.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <p className="text-gray-600">
                            Loading mentorship requests...
                        </p>
                    </div>
                )}

                {/* No Requests */}
                {!loading && requests.length === 0 && !error && (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <h3 className="text-xl font-semibold text-gray-800">
                            No mentorship requests
                        </h3>

                        <p className="text-gray-600 mt-2">
                            You don't have any mentorship requests yet.
                        </p>
                    </div>
                )}

                {/* Requests */}
                {!loading && requests.length > 0 && (
                    <div className="space-y-5">
                        {requests.map((request) => (
                            <div
                                key={request._id}
                                className="bg-white rounded-xl shadow-md p-6"
                            >
                                {/* Student + Status */}
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {request.studentId?.name || "Student"}
                                        </h3>

                                        <p className="text-blue-600 mt-1">
                                            {request.studentId?.email || ""}
                                        </p>
                                    </div>

                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                                            request.status
                                        )}`}
                                    >
                                        {request.status}
                                    </span>
                                </div>

                                {/* Message */}
                                <div className="mt-5">
                                    <p className="text-sm text-gray-500">
                                        Student's message
                                    </p>

                                    <p className="text-gray-700 mt-1">
                                        {request.message || "No message provided."}
                                    </p>
                                </div>

                                {/* Date */}
                                <p className="text-sm text-gray-500 mt-5">
                                    Received on{" "}
                                    {new Date(request.createdAt).toLocaleDateString()}
                                </p>

                                {/* Buttons */}
                                {request.status === "Pending" && (
                                    <div className="flex gap-3 mt-6">
                                        <button
                                            onClick={() =>
                                                updateRequest(request._id, "Accepted")
                                            }
                                            disabled={updatingId === request._id}
                                            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                                        >
                                            {updatingId === request._id
                                                ? "Updating..."
                                                : "Accept"}
                                        </button>

                                        <button
                                            onClick={() =>
                                                updateRequest(request._id, "Rejected")
                                            }
                                            disabled={updatingId === request._id}
                                            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400"
                                        >
                                            {updatingId === request._id
                                                ? "Updating..."
                                                : "Reject"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default ReceivedRequests;