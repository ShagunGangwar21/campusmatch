import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import colleges from "../data/colleges";

function Recommendations() {
  const location = useLocation();

  const student = location.state?.student;

  // If user opens /recommendations directly
  // without submitting the form
  if (!student) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Student profile not found
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Please complete your admission profile first.
          </p>

          <Link
            to="/admission"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Complete Profile
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <Link
          to="/admission"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
        >
          <ArrowLeft size={18} />
          Edit Profile
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Your Recommendations
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Colleges that match your profile
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            Based on your rank, category, preferred branch and budget,
            here are some colleges you can explore.
          </p>
        </div>

        {/* Student Summary */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div>
              <p className="text-xs font-medium text-slate-500">
                Exam Rank
              </p>
              <p className="mt-1 font-bold">
                {student.rank}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Category
              </p>
              <p className="mt-1 font-bold">
                {student.category}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Home State
              </p>
              <p className="mt-1 font-bold">
                {student.state}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Preferred Branch
              </p>
              <p className="mt-1 font-bold">
                {student.branch}
              </p>
            </div>

          </div>
        </div>

        {/* College Cards */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {colleges.map((college) => (
            <div
              key={college.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
            >

              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600 dark:bg-blue-950">
                  {college.name.charAt(0)}
                </div>

                <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:bg-emerald-950">
                  {college.match}% Match
                </div>
              </div>

              {/* Name */}
              <h2 className="mt-5 text-xl font-bold">
                {college.name}
              </h2>

              {/* Location */}
              <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <MapPin size={14} />
                {college.location}
              </div>

              {/* Branch */}
              <p className="mt-4 text-sm font-medium">
                {college.branch}
              </p>

              {/* Match */}
              <div className="mt-6 rounded-xl bg-blue-50 p-4 dark:bg-blue-950/50">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Match Score
                </p>

                <div className="mt-1 flex items-center gap-2 text-xl font-bold text-blue-600">
                  <TrendingUp size={18} />
                  {college.match}%
                </div>
              </div>

              {/* Details */}
              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-500">
                    Closing Rank
                  </p>

                  <p className="mt-1 font-bold">
                    {college.cutoff.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="text-xs text-slate-500">
                    Total Fees
                  </p>

                  <p className="mt-1 font-bold">
                    ₹{(college.fees / 100000).toFixed(1)}L
                  </p>
                </div>

              </div>

              {/* Explore */}
              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Explore College
                <ArrowRight size={16} />
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Recommendations;