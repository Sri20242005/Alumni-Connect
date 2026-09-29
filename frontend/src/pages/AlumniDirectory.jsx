import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AlumniDirectory() {
    const navigate = useNavigate();

    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Search and filter states
    const [search, setSearch] = useState("");
    const [batchFilter, setBatchFilter] = useState("");
    const [branchFilter, setBranchFilter] = useState("");
    const [companyFilter, setCompanyFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");

    // Fetch alumni
    useEffect(() => {
        const fetchAlumni = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:5000/api/profile/alumni",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setAlumni(response.data.alumni);
            } catch (error) {
                console.error(error);

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

    // Get unique batches
    const batches = [
        ...new Set(
            alumni
                .map((profile) => profile.batch)
                .filter(Boolean)
        ),
    ];

    // Get unique branches
    const branches = [
        ...new Set(
            alumni
                .map((profile) => profile.branch)
                .filter(Boolean)
        ),
    ];

    // Get unique companies
    const companies = [
        ...new Set(
            alumni
                .map((profile) => profile.company)
                .filter(Boolean)
        ),
    ];

    // Get unique locations
    const locations = [
        ...new Set(
            alumni
                .map((profile) => profile.location)
                .filter(Boolean)
        ),
    ];

    // Apply search and filters
    const filteredAlumni = alumni.filter((profile) => {
        const name = profile.userId?.name || "";
        const company = profile.company || "";
        const designation = profile.designation || "";
        const branch = profile.branch || "";
        const location = profile.location || "";
        const batch = profile.batch || "";

        const searchText = search.toLowerCase();

        const matchesSearch =
            name.toLowerCase().includes(searchText) ||
            company.toLowerCase().includes(searchText) ||
            designation.toLowerCase().includes(searchText);

        const matchesBatch =
            !batchFilter || batch === batchFilter;

        const matchesBranch =
            !branchFilter || branch === branchFilter;

        const matchesCompany =
            !companyFilter || company === companyFilter;

        const matchesLocation =
            !locationFilter || location === locationFilter;

        return (
            matchesSearch &&
            matchesBatch &&
            matchesBranch &&
            matchesCompany &&
            matchesLocation
        );
    });

    // Clear filters
    const clearFilters = () => {
        setSearch("");
        setBatchFilter("");
        setBranchFilter("");
        setCompanyFilter("");
        setLocationFilter("");
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
            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Heading */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Alumni Directory
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Discover and connect with alumni from your college
                        community.
                    </p>
                </div>


                {/* Search and Filters */}
                {!loading && !error && alumni.length > 0 && (
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">

                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Search & Filter Alumni
                        </h3>

                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search by name, company or designation..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 mb-5"
                        />


                        {/* Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                            {/* Batch */}
                            <select
                                value={batchFilter}
                                onChange={(e) => setBatchFilter(e.target.value)}
                                className="border rounded-lg px-4 py-3"
                            >
                                <option value="">All Batches</option>

                                {batches.map((batch) => (
                                    <option key={batch} value={batch}>
                                        {batch}
                                    </option>
                                ))}
                            </select>


                            {/* Branch */}
                            <select
                                value={branchFilter}
                                onChange={(e) => setBranchFilter(e.target.value)}
                                className="border rounded-lg px-4 py-3"
                            >
                                <option value="">All Branches</option>

                                {branches.map((branch) => (
                                    <option key={branch} value={branch}>
                                        {branch}
                                    </option>
                                ))}
                            </select>


                            {/* Company */}
                            <select
                                value={companyFilter}
                                onChange={(e) => setCompanyFilter(e.target.value)}
                                className="border rounded-lg px-4 py-3"
                            >
                                <option value="">All Companies</option>

                                {companies.map((company) => (
                                    <option key={company} value={company}>
                                        {company}
                                    </option>
                                ))}
                            </select>


                            {/* Location */}
                            <select
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="border rounded-lg px-4 py-3"
                            >
                                <option value="">All Locations</option>

                                {locations.map((location) => (
                                    <option key={location} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </select>

                        </div>


                        {/* Clear Filters */}
                        <button
                            onClick={clearFilters}
                            className="mt-5 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                        >
                            Clear Filters
                        </button>

                    </div>
                )}


                {/* Loading */}
                {loading && (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <p className="text-gray-600">
                            Loading alumni...
                        </p>
                    </div>
                )}


                {/* Error */}
                {error && !loading && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                        {error}
                    </div>
                )}


                {/* No Alumni */}
                {!loading && !error && alumni.length === 0 && (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <h3 className="text-xl font-semibold text-gray-800">
                            No alumni found
                        </h3>

                        <p className="text-gray-600 mt-2">
                            Alumni profiles will appear here once they are
                            registered and their profiles are completed.
                        </p>
                    </div>
                )}


                {/* No Search Results */}
                {!loading &&
                    !error &&
                    alumni.length > 0 &&
                    filteredAlumni.length === 0 && (
                        <div className="bg-white rounded-xl shadow-md p-8 text-center">
                            <h3 className="text-xl font-semibold text-gray-800">
                                No matching alumni found
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Try changing your search or filters.
                            </p>
                        </div>
                    )}


                {/* Alumni Cards */}
                {!loading &&
                    !error &&
                    filteredAlumni.length > 0 && (
                        <>
                            <p className="text-gray-600 mb-4">
                                Showing {filteredAlumni.length} alumni
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                {filteredAlumni.map((profile) => (
                                    <div
                                        key={profile._id}
                                        className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                                    >

                                        {/* Name */}
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {profile.userId?.name || "Alumni"}
                                        </h3>

                                        {/* Designation */}
                                        <p className="text-blue-600 font-medium mt-1">
                                            {profile.designation || "Professional"}
                                        </p>


                                        {/* Details */}
                                        <div className="mt-5 space-y-2 text-gray-600">

                                            <p>
                                                <span className="font-semibold">
                                                    Batch:
                                                </span>{" "}
                                                {profile.batch || "Not provided"}
                                            </p>

                                            <p>
                                                <span className="font-semibold">
                                                    Branch:
                                                </span>{" "}
                                                {profile.branch || "Not provided"}
                                            </p>

                                            <p>
                                                <span className="font-semibold">
                                                    Company:
                                                </span>{" "}
                                                {profile.company || "Not provided"}
                                            </p>

                                            <p>
                                                <span className="font-semibold">
                                                    Location:
                                                </span>{" "}
                                                {profile.location || "Not provided"}
                                            </p>

                                        </div>


                                        {/* View Profile */}
                                        <button
                                            onClick={() =>
                                                navigate("/mentor-profile", {
                                                    state: {
                                                        alumni: profile,
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
                        </>
                    )}

            </main>
        </div>
    );
}

export default AlumniDirectory;