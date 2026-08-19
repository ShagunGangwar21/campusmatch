import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Loader2, GraduationCap } from "lucide-react";
import CollegeCard from "../components/CollegeCard";

function Favorites() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view your saved colleges.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to load saved colleges");
      }

      setColleges(data.favorites || data.colleges || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleFavoriteToggle = async (collegeId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_BASE_URL}/favorites/${collegeId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setColleges((prev) => prev.filter((c) => String(c.id || c._id) !== String(collegeId)));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center gap-3 text-blue-600">
          <Loader2 className="animate-spin" size={25} />
          <span className="font-semibold">Loading your saved colleges...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Bookmarked Institutions
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Saved Colleges ({colleges.length})
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Colleges you have bookmarked for quick comparison and counselling choice filling.
            </p>
          </div>
          <Link
            to="/colleges"
            className="hidden rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 sm:inline-block"
          >
            Explore More Colleges
          </Link>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30">
            {error}
          </div>
        ) : colleges.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {colleges.map((college) => (
              <CollegeCard
                key={college.id || college._id}
                college={college}
                isSaved={true}
                onFavoriteToggle={() => handleFavoriteToggle(college.id || college._id)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <Heart size={48} className="mx-auto text-slate-300 dark:text-slate-600" />
            <h3 className="mt-4 text-xl font-bold">No saved colleges yet</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Click the heart icon on any college card to save it here.
            </p>
            <Link
              to="/colleges"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <GraduationCap size={20} />
              Explore Colleges
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
