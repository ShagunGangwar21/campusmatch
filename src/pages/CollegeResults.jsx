import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, Loader2 } from "lucide-react";
import CollegeCard from "../components/CollegeCard";

function CollegeResults() {
  const [colleges, setColleges] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first to view personalized college results.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/recommendations`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load colleges");
          return;
        }

        setColleges(data.recommendations || data.colleges || []);
        setProfile(data.profile || null);
      } catch (err) {
        console.error("College fetch error:", err);
        setError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-3 text-blue-600">
            <Loader2 className="animate-spin" size={25} />
            <span className="font-semibold">Calculating best colleges for your profile...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 px-5 py-10 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/dashboard"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/30">
            <p className="font-semibold text-red-600 dark:text-red-400">{error}</p>

            {error.toLowerCase().includes("profile") && (
              <Link
                to="/admission"
                className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Complete Admission Profile
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 dark:bg-slate-950 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
              <GraduationCap size={25} />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                CampusMatch Predictions
              </p>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Recommended Colleges
              </h1>
            </div>
          </div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Personalized admission predictions calculated against historical cutoff ranks, category, branch, state, and fee budget.
          </p>
        </div>

        {profile && (
          <div className="mb-8 grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-5">
            <div>
              <p className="text-xs text-slate-500">Exam</p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">{profile.exam}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Rank</p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                AIR {Number(profile.rank).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Category</p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">{profile.category}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Branch</p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">{profile.branch}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Budget</p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                ₹{Number(profile.budget).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {colleges.length} Colleges Match Your Profile
          </h2>
        </div>

        {colleges.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {colleges.map((college) => (
              <CollegeCard key={college.id || college._id} college={college} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <GraduationCap size={40} className="mx-auto text-slate-400" />
            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              No matching colleges found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try adjusting your rank, branch preference or fee budget.
            </p>
            <Link
              to="/admission"
              className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Update Preferences
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CollegeResults;