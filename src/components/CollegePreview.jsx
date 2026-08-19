import { useEffect, useState } from "react";
import {
  MapPin,
  Heart,
  ArrowUpRight,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

function CollegePreview() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/colleges`);
        const data = await response.json();
        if (data.success && Array.isArray(data.colleges)) {
          // Take top 6 colleges for homepage preview
          setColleges(data.colleges.slice(0, 6));
        }
      } catch (err) {
        console.error("Failed to fetch preview colleges:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[250px] items-center justify-center">
        <div className="flex items-center gap-3 text-blue-600">
          <Loader2 className="animate-spin" size={24} />
          <span className="font-semibold text-sm">Loading featured institutions...</span>
        </div>
      </div>
    );
  }

  if (!colleges || colleges.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {colleges.map((college) => {
        const collegeId = college._id || college.id;
        const name = college.name || "Engineering Institution";
        const shortName = college.shortName || name.substring(0, 3).toUpperCase();
        const location = college.location || (college.city ? `${college.city}, ${college.state}` : "Location unavailable");
        const branch = college.branches?.[0] || college.branch || "Computer Science";
        const closingRank = college.closingRank ? Number(college.closingRank).toLocaleString() : "N/A";
        const feesDisplay = college.feesDisplay || (college.fees ? `₹${(college.fees / 100000).toFixed(1)}L` : "Data unavailable");

        return (
          <div
            key={collegeId}
            className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
          >
            <div>
              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-base font-extrabold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  {shortName}
                </div>

                <Link
                  to="/favorites"
                  aria-label={`Save ${name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-slate-700 dark:text-slate-500"
                >
                  <Heart size={17} />
                </Link>
              </div>

              {/* College Name */}
              <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
                {name}
              </h3>

              {/* Location */}
              <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <MapPin size={14} />
                <span className="line-clamp-1">{location}</span>
              </div>

              {/* Branch */}
              <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                {branch}
              </p>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-950/50">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Match Potential
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-xl font-bold text-blue-600 dark:text-blue-400">
                    <TrendingUp size={17} />
                    High
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Closing Rank
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    {closingRank}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tuition fees
                </p>

                <p className="mt-0.5 font-bold text-slate-900 dark:text-white">
                  {feesDisplay}
                </p>
              </div>

              <Link
                to={`/college/${collegeId}`}
                className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                Explore
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CollegePreview;