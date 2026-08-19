import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Loader2,
  GraduationCap,
} from "lucide-react";
import CollegeCard from "../components/CollegeCard";

function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [branch, setBranch] = useState("All");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (search.trim()) queryParams.append("search", search.trim());
      if (type !== "All") queryParams.append("type", type);
      if (branch !== "All") queryParams.append("branch", branch);
      if (sort !== "default") queryParams.append("sort", sort);

      const response = await fetch(`${API_BASE_URL}/colleges?${queryParams.toString()}`);
      const data = await response.json();

      if (data.success) {
        setColleges(data.colleges || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchColleges();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, type, branch, sort]);

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Explore Colleges
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Discover Engineering Institutions
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            Search top IITs, NITs, IIITs and state universities by branch, location, tuition fees, and admission cutoffs.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by college name, city or state..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            {/* Type */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-slate-400 shrink-0" />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="All">All Types</option>
                <option value="IIT">IIT</option>
                <option value="NIT">NIT</option>
                <option value="IIIT">IIIT</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="Deemed">Deemed</option>
              </select>
            </div>

            {/* Branch */}
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="All">All Branches</option>
              <option value="Computer Science">Computer Science & Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & Communication">Electronics & Communication</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="default">Sort By: Name</option>
              <option value="bestRank">Best Cutoff Rank</option>
              <option value="lowestFees">Lowest Tuition Fees</option>
              <option value="highestFees">Highest Tuition Fees</option>
            </select>
          </div>
        </div>

        {/* Result Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Found{" "}
            <span className="font-bold text-slate-900 dark:text-white">
              {colleges.length}
            </span>{" "}
            colleges matching your criteria
          </p>

          <Link
            to="/compare"
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Launch Comparison Matrix →
          </Link>
        </div>

        {/* College Grid */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2 className="animate-spin text-blue-600" size={30} />
          </div>
        ) : colleges.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {colleges.map((college) => (
              <CollegeCard key={college.id || college._id} college={college} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <GraduationCap size={40} className="mx-auto text-slate-400" />
            <h2 className="mt-4 text-xl font-bold">No colleges found</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try broadening your search term or clearing active filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setType("All");
                setBranch("All");
                setSort("default");
              }}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Colleges;