import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CollegeCard({ college }) {
  // Safety check
  if (!college) {
    return null;
  }

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">

      {/* Top */}
      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          {/* College Logo */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-lg font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            {college.shortName || college.name?.substring(0, 3).toUpperCase() || "COL"}
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              {college.name || "Unknown College"}
            </h3>

            <div className="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <MapPin size={14} />
              {college.location || "Location unavailable"}
            </div>
          </div>

        </div>

        {/* Match */}
        <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
          {college.match ?? 0}% Match
        </span>

      </div>

      {/* Details */}
      <div className="mt-5 grid grid-cols-2 gap-3">

        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Branch
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
            {college.branch || "Not specified"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Annual Fees
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
            {college.feesDisplay || "Not available"}
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">

        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Closing Rank
          </p>

          <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
            {college.closingRank
              ? Number(college.closingRank).toLocaleString()
              : "N/A"}
          </p>
        </div>

        <Link
          to={`/college/${college.id}`}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          View Details
          <ArrowRight size={16} />
        </Link>

      </div>

    </div>
  );
}

export default CollegeCard;