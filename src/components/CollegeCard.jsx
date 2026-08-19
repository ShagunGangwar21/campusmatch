import { MapPin, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function CollegeCard({ college, isSaved = false, onFavoriteToggle }) {
  const [favorite, setFavorite] = useState(isSaved);
  const [favLoading, setFavLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  if (!college) return null;

  const collegeId = college.id || college._id;
  const shortName = college.shortName || college.name?.substring(0, 3).toUpperCase() || "COL";
  const name = college.name || "Engineering Institution";
  const location = college.location || (college.city ? `${college.city}, ${college.state}` : "Location unavailable");
  const branch = college.branches?.[0] || college.branch || "Computer Science";
  const feesDisplay = college.feesDisplay || (college.fees ? `₹${(college.fees / 100000).toFixed(2)}L` : "Fees N/A");
  const closingRank = college.closingRank ? Number(college.closingRank).toLocaleString() : "N/A";
  const match = college.match ?? 0;
  const predictionStatus = college.predictionStatus;

  const handleHeartClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to save colleges to your favorites.");
      return;
    }

    try {
      setFavLoading(true);
      if (favorite) {
        await fetch(`${API_BASE_URL}/favorites/${collegeId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorite(false);
      } else {
        await fetch(`${API_BASE_URL}/favorites`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ collegeId }),
        });
        setFavorite(true);
      }

      if (onFavoriteToggle) {
        onFavoriteToggle(collegeId, !favorite);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFavLoading(false);
    }
  };

  // Prediction Pill styling
  const badgeStyles = {
    SAFE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-300",
    LIKELY: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 border-blue-300",
    TARGET: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-300",
    AMBITIOUS: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400 border-purple-300",
    UNLIKELY: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 border-red-300",
  };

  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700">
      <div>
        {/* Top */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-base font-extrabold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              {shortName}
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                {name}
              </h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <MapPin size={13} />
                <span>{location}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleHeartClick}
            disabled={favLoading}
            aria-label={`Bookmark ${name}`}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition ${
              favorite
                ? "border-red-200 bg-red-50 text-red-500 dark:border-red-900 dark:bg-red-950"
                : "border-slate-200 text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-slate-700"
            }`}
          >
            <Heart size={16} className={favorite ? "fill-current text-red-500" : ""} />
          </button>
        </div>

        {/* Prediction & Match Badges */}
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            {match}% Match
          </span>

          {predictionStatus && (
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-extrabold tracking-wide ${badgeStyles[predictionStatus] || badgeStyles.UNLIKELY}`}>
              {predictionStatus}
            </span>
          )}
        </div>

        {/* Details Grid */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
            <p className="text-xs text-slate-500 dark:text-slate-400">Branch</p>
            <p className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
              {branch}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
            <p className="text-xs text-slate-500 dark:text-slate-400">Annual Fees</p>
            <p className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-200">
              {feesDisplay}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Closing Rank</p>
          <p className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
            {closingRank}
          </p>
        </div>

        <Link
          to={`/college/${collegeId}`}
          className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          View Details
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default CollegeCard;