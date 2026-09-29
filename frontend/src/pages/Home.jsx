import { Link } from "react-router-dom";
function Home() {
    return (
        <div className="min-h-screen bg-white">

            {/* Navigation Bar */}
            <nav className="flex items-center justify-between px-8 py-4 border-b">
                <h1 className="text-2xl font-bold text-blue-600">
                    Alumni Connect
                </h1>

                <div className="flex gap-4">
                    <Link
                        to="/login"
                        className="px-4 py-2 text-gray-700"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Register
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center px-6 py-24">

                <h2 className="text-5xl font-bold text-gray-900 max-w-3xl">
                    Connect. Learn. Grow. Together.
                </h2>

                <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                    A centralized platform connecting students and alumni
                    through mentorship, opportunities, events and community.
                </p>

                <div className="mt-8 flex gap-4">
                    <Link
                        to="/register"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
                    >
                        Get Started
                    </Link>

                    <Link
  to="/dashboard"
  className="px-6 py-3 border border-gray-300 rounded-lg"
>
  Explore Alumni
</Link>
                </div>

            </section>

            {/* Features */}
            <section className="px-8 py-16 bg-gray-50">

                <h3 className="text-3xl font-bold text-center">
                    What Alumni Connect Offers
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10">

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h4 className="text-xl font-semibold">
                            Alumni Directory
                        </h4>
                        <p className="mt-3 text-gray-600">
                            Discover verified alumni by batch, branch, company and location.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h4 className="text-xl font-semibold">
                            Mentorship
                        </h4>
                        <p className="mt-3 text-gray-600">
                            Connect with alumni and request career guidance and mentorship.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h4 className="text-xl font-semibold">
                            Jobs & Internships
                        </h4>
                        <p className="mt-3 text-gray-600">
                            Discover job and internship opportunities shared by alumni.
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;