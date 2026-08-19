import { useEffect, useState } from "react";
import { ArrowLeft, GraduationCap, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import CollegeCard from "../components/CollegeCard";

function Recommendations() {
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
          setError("Please login to view your personalized college recommendations.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/recommendations`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to load recommendations");
        }

        setColleges(data.recommendations || data.colleges || []);
        setProfile(data.profile || null);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center gap-3 text-blue-600">
          <Loader2 className="animate-spin" size={25} />
          <span className="font-semibold">Analyzing cutoff trends and generating predictions...</span>
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

          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400">{error}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Please complete your admission profile with your rank, exam, and category details.
            </p>
            <Link
              to="/admission"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Set Up Preferences
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back */}
        <Link
          to="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-600">
            <Sparkles size={18} />
            Smart Prediction Engine
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Personalized College Recommendations
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            Colleges categorized by admission chance (SAFE, LIKELY, TARGET, AMBITIOUS) based on historical JoSAA/CSAB opening & closing ranks.
          </p>
        </div>

        {/* Profile Summary */}
        {profile && (
          <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white">Active Student Profile</h3>
              <Link to="/admission" className="text-xs font-bold text-blue-600 hover:underline">
                Edit Preferences
              </Link>
            </div>
            <div className="mt-4 grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              <div>
                <p className="text-xs text-slate-400">Entrance Exam</p>
                <p className="mt-1 font-bold">{profile.exam}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Exam Rank</p>
                <p className="mt-1 font-bold">AIR {Number(profile.rank).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Category</p>
                <p className="mt-1 font-bold">{profile.category}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Home State</p>
                <p className="mt-1 font-bold">{profile.state}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Preferred Branch</p>
                <p className="mt-1 font-bold">{profile.branch}</p>
              </div>
            </div>
          </div>
        )}

        {/* Prediction Explanation Box */}
        <div className="mb-8 rounded-2xl bg-blue-50/70 p-5 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            Admission Chance Tiers:
          </p>
          <div className="mt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> <strong>SAFE:</strong> Rank comfortably inside closing cutoff</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span> <strong>LIKELY:</strong> Rank matches cutoff bounds</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span> <strong>TARGET:</strong> Competitive (High chance in round 2-5)</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-purple-500"></span> <strong>AMBITIOUS:</strong> Possible in CSAB special rounds</span>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {colleges.map((college) => (
            <CollegeCard key={college.id || college._id} college={college} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recommendations;