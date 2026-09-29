import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AlumniDirectory() {
    const navigate = useNavigate();

    const [alumni, setAlumni] = useState([]);
    const [search, setSearch] = useState("");
    const [batch, setBatch] = useState("");
    const [branch, setBranch] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAlumni = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await axios.get(
                    "http://localhost:5000/api/profile/alumni",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Alumni API response:", response.data);

                setAlumni(response.data?.profiles || []);
            } catch (error) {
                console.error("Failed to fetch alumni:", error);

                setAlumni([]);

                setError(
                    error.response?.data?.message ||
                    "Failed to load alumni directory."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAlumni();
    }, [navigate]);

    // Get unique values for filters
    const batches = useMemo(() => {
        return [
            ...new Set(
                alumni
                    .map((item) => item.batch)
                    .filter((value) => value)
            ),
        ];
    }, [alumni]);

    const branches = useMemo(() => {
        return [
            ...new Set(
                alumni
                    .map((item) => item.branch)
                    .filter((value) => value)
            ),
        ];
    }, [alumni]);

    const companies = useMemo(() => {
        return [
            ...new Set(
                alumni
                    .map((item) => item.company)
                    .filter((value) => value)
            ),
        ];
    }, [alumni]);

    const locations = useMemo(() => {
        return [
            ...new Set(
                alumni
                    .map((item) => item.location)
                    .filter((value) => value)
            ),
        ];
    }, [alumni]);

    // Filter alumni
    const filteredAlumni = useMemo(() => {
        const searchText = search.toLowerCase().trim();

        return alumni.filter((item) => {
            const name = item.userId?.name?.toLowerCase() || "";
            const email = item.userId?.email?.toLowerCase() || "";
            const itemCompany = item.company?.toLowerCase() || "";
            const designation = item.designation?.toLowerCase() || "";
            const itemBranch = item.branch?.toLowerCase() || "";
            const itemLocation = item.location?.toLowerCase() || "";

            const matchesSearch =
                !searchText ||
                name.includes(searchText) ||
                email.includes(searchText) ||
                itemCompany.includes(searchText) ||
                designation.includes(searchText);

            const matchesBatch =
                !batch || item.batch === batch;

            const matchesBranch =
                !branch || item.branch === branch;

            const matchesCompany =
                !company || item.company === company;

            const matchesLocation =
                !location || item.location === location;

            return (
                matchesSearch &&
                matchesBatch &&
                matchesBranch &&
                matchesCompany &&
                matchesLocation
            );
        });
    }, [
        alumni,
        search,
        batch,
        branch,
        company,
        location,
    ]);

    const clearFilters = () => {
        setSearch("");
        setBatch("");
        setBranch("");
        setCompany("");
        setLocation("");
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

            {/* Main */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Heading */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Alumni Directory
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Search and connect with alumni based on their
                        academic and professional details.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search by name, email, company, or designation..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">

                        {/* Batch */}
                        <select
                            value={batch}
                            onChange={(e) => setBatch(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3"
                        >
                            <option value="">All Batches</option>

                            {batches.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>

                        {/* Branch */}
                        <select
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3"
                        >
                            <option value="">All Branches</option>

                            {branches.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>

                        {/* Company */}
                        <select
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3"
                        >
                            <option value="">All Companies</option>

                            {companies.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>

                        {/* Location */}
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3"
                        >
                            <option value="">All Locations</option>

                            {locations.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* Clear Filters */}
                    <button
                        onClick={clearFilters}
                        className="mt-4 text-blue-600 hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <p className="text-gray-600">
                            Loading alumni...
                        </p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="bg-red-100 text-red-700 rounded-lg p-4 mb-6">
                        {error}
                    </div>
                )}

                {/* No Alumni */}
                {!loading &&
                    !error &&
                    filteredAlumni.length === 0 && (
                        <div className="bg-white rounded-xl shadow-md p-8 text-center">
                            <h3 className="text-xl font-semibold text-gray-800">
                                No alumni found
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Try changing your search or filters.
                            </p>
                        </div>
                    )}

                {/* Alumni Cards */}
                {!loading &&
                    filteredAlumni.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {filteredAlumni.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white rounded-xl shadow-md p-6"
                                >
                                    {/* Name */}
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {item.userId?.name || "Alumni"}
                                    </h3>

                                    {/* Designation */}
                                    <p className="text-blue-600 font-medium mt-1">
                                        {item.designation || "Designation not provided"}
                                    </p>

                                    {/* Details */}
                                    <div className="mt-5 space-y-2 text-gray-600">

                                        <p>
                                            <span className="font-medium">
                                                Batch:
                                            </span>{" "}
                                            {item.batch || "Not provided"}
                                        </p>

                                        <p>
                                            <span className="font-medium">
                                                Branch:
                                            </span>{" "}
                                            {item.branch || "Not provided"}
                                        </p>

                                        <p>
                                            <span className="font-medium">
                                                Company:
                                            </span>{" "}
                                            {item.company || "Not provided"}
                                        </p>

                                        <p>
                                            <span className="font-medium">
                                                Location:
                                            </span>{" "}
                                            {item.location || "Not provided"}
                                        </p>

                                    </div>

                                    {/* View Profile */}
                                    <button
                                        onClick={() =>
                                            navigate("/mentor-profile", {
                                                state: {
                                                    alumni: item,
                                                },
                                            })
                                        }
                                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        View Profile
                                    </button>
                                </div>
                            ))}

                        </div>
                    )}

            </main>
        </div>
    );
}

export default AlumniDirectory;