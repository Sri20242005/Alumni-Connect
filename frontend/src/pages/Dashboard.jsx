import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
                <Link
                    to="/dashboard"
                    className="text-2xl font-bold text-blue-600"
                >
                    Alumni Connect
                </Link>

                <div className="flex items-center gap-4">
                    <span className="text-gray-700">
                        Hi, {user?.name || "User"}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-10">

                {/* Welcome */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome, {user?.name || "User"}!
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Connect with alumni, find mentors, and build meaningful
                        connections with your college community.
                    </p>
                </div>

                {/* Main Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Alumni Directory */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Alumni Directory
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Search and connect with alumni based on their batch,
                            branch, company, designation, and location.
                        </p>

                        <button
                            onClick={() => navigate("/alumni")}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Explore Alumni
                        </button>
                    </div>

                    {/* Mentorship */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Mentorship
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Connect with alumni and send or manage mentorship
                            requests.
                        </p>

                        <div className="flex flex-wrap gap-3">

                            {user?.role === "Student" && (
                                <>
                                    <button
                                        onClick={() => navigate("/alumni")}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        Find a Mentor
                                    </button>

                                    <button
                                        onClick={() =>
                                            navigate("/mentorship-requests")
                                        }
                                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                                    >
                                        My Requests
                                    </button>
                                </>
                            )}

                            {user?.role === "Alumni" && (
                                <button
                                    onClick={() =>
                                        navigate("/received-requests")
                                    }
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                >
                                    Incoming Requests
                                </button>
                            )}

                        </div>
                    </div>

                    {/* My Profile */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            My Profile
                        </h2>

                        <p className="text-gray-600 mb-6">
                            View and update your academic and professional
                            information.
                        </p>

                        <button
                            onClick={() => navigate("/profile")}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            View Profile
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default Dashboard;