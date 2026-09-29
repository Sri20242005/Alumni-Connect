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
            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome, {user?.name || "User"}!
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Connect with alumni, find mentors, discover opportunities,
                        and stay engaged with your college community.
                    </p>
                </div>


                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


                    {/* Alumni Directory */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Alumni Directory
                        </h2>

                        <p className="text-gray-600 mb-4">
                            Find and connect with alumni based on batch, branch,
                            company, designation, and location.
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

                        <p className="text-gray-600 mb-4">
                            Connect with experienced alumni and send mentorship
                            requests.
                        </p>

                        <button
                            onClick={() => alert("Mentorship coming soon")}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Find a Mentor
                        </button>
                    </div>


                    {/* Jobs & Internships */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Jobs & Internships
                        </h2>

                        <p className="text-gray-600 mb-4">
                            Discover job and internship opportunities shared by
                            alumni.
                        </p>

                        <button
                            onClick={() => alert("Jobs & Internships coming soon")}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            View Opportunities
                        </button>
                    </div>


                    {/* Events */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Events
                        </h2>

                        <p className="text-gray-600 mb-4">
                            Stay updated with alumni meets, webinars, reunions,
                            and other college events.
                        </p>

                        <button
                            onClick={() => alert("Events coming soon")}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            View Events
                        </button>
                    </div>


                    {/* Discussion Forum */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Discussion Forum
                        </h2>

                        <p className="text-gray-600 mb-4">
                            Ask questions, share knowledge, and interact with the
                            alumni and student community.
                        </p>

                        <button
                            onClick={() => alert("Discussion Forum coming soon")}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Open Forum
                        </button>
                    </div>


                    {/* My Profile */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            My Profile
                        </h2>

                        <p className="text-gray-600 mb-4">
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