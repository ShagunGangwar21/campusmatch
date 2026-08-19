import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  GraduationCap,
  IndianRupee,
  Trophy,
  CheckCircle,
} from "lucide-react";

import colleges from "../data/colleges";

function CollegeDetails() {
  const { id } = useParams();

  const college = colleges.find(
    (item) => item.id === Number(id)
  );

  if (!college) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            College not found
          </h1>

          <Link
            to="/college-results"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            Back to Results
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <Link
          to="/college-results"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300"
        >
          <ArrowLeft size={18} />
          Back to Results
        </Link>

        {/* Header */}
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

            <div className="flex items-start gap-5">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-bold text-blue-600 dark:bg-blue-950">
                {college.shortName}
              </div>

              <div>

                <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                  {college.type}
                </p>

                <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                  {college.name}
                </h1>

                <div className="mt-3 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <MapPin size={17} />
                  {college.location}
                </div>

              </div>

            </div>

            <div className="rounded-2xl bg-emerald-50 px-5 py-3 text-center dark:bg-emerald-950">
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                Match Score
              </p>

              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {college.match}%
              </p>
            </div>

          </div>

        </div>

        {/* Information */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <GraduationCap className="text-blue-600" size={22} />

            <p className="mt-4 text-sm text-slate-500">
              Branch
            </p>

            <p className="mt-1 font-bold">
              {college.branch}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <Trophy className="text-blue-600" size={22} />

            <p className="mt-4 text-sm text-slate-500">
              Closing Rank
            </p>

            <p className="mt-1 font-bold">
              {college.closingRank.toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <IndianRupee className="text-blue-600" size={22} />

            <p className="mt-4 text-sm text-slate-500">
              Total Fees
            </p>

            <p className="mt-1 font-bold">
              {college.feesDisplay}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <MapPin className="text-blue-600" size={22} />

            <p className="mt-4 text-sm text-slate-500">
              State
            </p>

            <p className="mt-1 font-bold">
              {college.state}
            </p>
          </div>

        </div>

        {/* Why this college */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">

          <h2 className="text-2xl font-bold">
            Why this college?
          </h2>

          <div className="mt-6 space-y-4">

            <div className="flex items-start gap-3">
              <CheckCircle
                size={20}
                className="mt-0.5 shrink-0 text-emerald-500"
              />

              <p className="text-slate-600 dark:text-slate-300">
                {college.branch} is available at this college.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle
                size={20}
                className="mt-0.5 shrink-0 text-emerald-500"
              />

              <p className="text-slate-600 dark:text-slate-300">
                The closing rank is {college.closingRank.toLocaleString()}.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle
                size={20}
                className="mt-0.5 shrink-0 text-emerald-500"
              />

              <p className="text-slate-600 dark:text-slate-300">
                Estimated fees are {college.feesDisplay}.
              </p>
            </div>

          </div>

        </div>

        {/* CTA */}
        <div className="mt-6 rounded-3xl bg-blue-600 p-7 text-white sm:p-8">

          <h2 className="text-2xl font-bold">
            Interested in {college.name}?
          </h2>

          <p className="mt-2 text-blue-100">
            Compare this college with other options and make your decision.
          </p>

          <Link
            to="/college-results"
            className="mt-5 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
          >
            Explore More Colleges
          </Link>

        </div>

      </div>
    </div>
  );
}

export default CollegeDetails;