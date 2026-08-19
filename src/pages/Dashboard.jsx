import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Sparkles,
  Heart,
  Calendar,
  ArrowRight,
  ArrowLeft,
  User,
  Scale,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import CollegeCard from "../components/CollegeCard";

function Dashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;

        // 1. Fetch Recommendations
        const recRes = await fetch(`${API_BASE_URL}/recommendations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const recData = await recRes.json();
        if (recRes.ok) {
          setRecommendations((recData.recommendations || recData.colleges || []).slice(0, 2));
        }

        // 2. Fetch Favorites
        const favRes = await fetch(`${API_BASE_URL}/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favData = await favRes.json();
        if (favRes.ok) {
          setFavorites(favData.favorites || favData.colleges || []);
        }

        // 3. Fetch Deadlines
        const deadRes = await fetch(`${API_BASE_URL}/deadlines`);
        const deadData = await deadRes.json();
        if (deadRes.ok) {
          setDeadlines(deadData.deadlines || []);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const isProfileComplete = profile && profile.rank && profile.state && profile.branch;

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back to Home Link */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Header Banner */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl shadow-blue-600/10">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold text-white backdrop-blur-md">
                <Sparkles size={14} />
                Student Admission Dashboard
              </div>
              <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                Welcome back, {user?.name || "Student"}!
              </h1>
              <p className="mt-2 text-sm text-blue-100 max-w-xl">
                Track your admission chances, explore recommended engineering colleges, monitor counselling deadlines, and finalize your choice list.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/admission"
                className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-md transition hover:bg-blue-50"
              >
                <User size={16} />
                {isProfileComplete ? "Edit Preferences" : "Complete Profile"}
              </Link>
              <Link
                to="/recommendations"
                className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <Sparkles size={16} />
                View Predictions
              </Link>
            </div>
          </div>
        </div>

        {/* Top Cards: Profile Summary & Stats */}
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {/* Profile Status */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Admission Profile
              </span>
              {isProfileComplete ? (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={16} /> Complete
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <AlertCircle size={16} /> Incomplete
                </span>
              )}
            </div>

            <div className="mt-4">
              {isProfileComplete ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Exam & Rank:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {profile.exam} (AIR {Number(profile.rank).toLocaleString()})
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Category:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{profile.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Preferred Branch:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{profile.branch}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Home State:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{profile.state}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Fill in your JEE/Entrance exam rank, category, and preferred state to get accurate predictions.
                  </p>
                  <Link
                    to="/admission"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline"
                  >
                    Set up preferences <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Shortlisted
              </span>
              <Heart size={20} className="text-red-500" />
            </div>

            <p className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">
              {favorites.length}
            </p>
            <p className="mt-1 text-sm text-slate-500">Colleges saved in your favorites list</p>

            <Link
              to="/favorites"
              className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline"
            >
              View saved list <ArrowRight size={14} />
            </Link>
          </div>

          {/* Comparison Tool Shortcut */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Comparison Engine
              </span>
              <Scale size={20} className="text-indigo-600" />
            </div>

            <p className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Side-by-Side Analysis
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Compare cutoffs, fees, placement stats, and credentials for up to 4 colleges.
            </p>

            <Link
              to="/compare"
              className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:underline"
            >
              Launch comparison tool <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Main Grid: Recommended Colleges + Deadlines */}
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left 2 Cols: Recommendations */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Top Recommended Colleges
                </h2>
                <p className="text-sm text-slate-500">
                  Calculated based on your rank, branch preference, and fee budget.
                </p>
              </div>
              <Link
                to="/recommendations"
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                View all predictions →
              </Link>
            </div>

            {recommendations.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {recommendations.map((college) => (
                  <CollegeCard key={college.id || college._id} college={college} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
                <GraduationCap size={40} className="mx-auto text-slate-400" />
                <h3 className="mt-3 font-bold text-slate-900 dark:text-white">
                  No recommendations generated yet
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Please complete your rank and branch preferences in profile.
                </p>
                <Link
                  to="/admission"
                  className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white"
                >
                  Fill Profile
                </Link>
              </div>
            )}
          </div>

          {/* Right Col: Verified Deadlines */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar size={22} className="text-blue-600" />
                Important Dates
              </h2>
              <p className="text-sm text-slate-500">Verified official counselling timelines.</p>
            </div>

            <div className="space-y-4">
              {deadlines.map((item) => (
                <div
                  key={item._id || item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                      {item.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{item.status}</span>
                  </div>

                  <h4 className="mt-3 font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="mt-1 text-xs text-slate-500">{item.description}</p>

                  <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {item.startDate} - {item.endDate}
                    </span>

                    {item.officialUrl ? (
                      <a
                        href={item.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-bold text-blue-600 hover:underline"
                      >
                        Official Site <ExternalLink size={12} />
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
