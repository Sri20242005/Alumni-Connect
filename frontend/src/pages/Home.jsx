import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-white">

            {/* Navbar */}
            <nav className="border-b border-gray-300 px-6 py-4 flex items-center justify-between">
                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-600"
                >
                    Alumni Connect
                </Link>

                <div className="flex items-center gap-6">
                    <Link
                        to="/login"
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Register
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="text-center px-6 py-24">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Connect. Learn. Grow. Together.
                </h1>

                <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
                    A centralized platform connecting students and alumni
                    through professional networking and mentorship.
                </p>

                <div className="flex justify-center gap-4 mt-8">

                    <Link
                        to="/register"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Get Started
                    </Link>

                    <Link
                        to="/login"
                        className="border border-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-100"
                    >
                        Explore Alumni
                    </Link>

                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 px-6 py-16">

                <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
                    What Alumni Connect Offers
                </h2>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Alumni Directory */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            Alumni Directory
                        </h3>

                        <p className="text-gray-600">
                            Search and discover alumni based on their batch,
                            branch, company, designation, and location.
                        </p>
                    </div>

                    {/* Mentorship */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            Mentorship
                        </h3>

                        <p className="text-gray-600">
                            Connect with experienced alumni and send mentorship
                            requests for career guidance and support.
                        </p>
                    </div>

                    {/* Profiles */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            Alumni Profiles
                        </h3>

                        <p className="text-gray-600">
                            View alumni academic and professional details and
                            learn about their career journey.
                        </p>
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 text-center py-6">
                <p className="text-gray-500">
                    © 2026 Alumni Connect
                </p>
            </footer>

        </div>
    );
}

export default Home;