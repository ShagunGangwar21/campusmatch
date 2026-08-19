import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Heart,
  MapPin,
  Search,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";

import colleges from "../data/colleges";

function Colleges() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [branch, setBranch] = useState("All");

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const matchesSearch =
        college.name.toLowerCase().includes(search.toLowerCase()) ||
        college.city.toLowerCase().includes(search.toLowerCase()) ||
        college.state.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        type === "All" || college.type === type;

      const matchesBranch =
        branch === "All" || college.branch === branch;

      return matchesSearch && matchesType && matchesBranch;
    });
  }, [search, type, branch]);

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
            Find the right college for you
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            Explore colleges based on your branch, location, admission
            chances and budget.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search college, city or state..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>

            {/* Type */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal
                size={18}
                className="text-slate-400"
              />

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950"
              >
                <option value="All">All Types</option>
                <option value="NIT">NIT</option>
                <option value="IIIT">IIIT</option>
              </select>
            </div>

            {/* Branch */}
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950"
            >
              <option value="All">All Branches</option>
              <option value="Computer Science & Engineering">
                CSE
              </option>
              <option value="Information Technology">
                IT
              </option>
              <option value="Electronics & Communication">
                ECE
              </option>
              <option value="Electrical Engineering">
                Electrical
              </option>
              <option value="Mechanical Engineering">
                Mechanical
              </option>
              <option value="Civil Engineering">
                Civil
              </option>
            </select>

          </div>
        </div>

        {/* Result Count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {filteredColleges.length}
            </span>{" "}
            colleges
          </p>
        </div>

        {/* College Cards */}
        {filteredColleges.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredColleges.map((college) => (
              <div
                key={college.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800 dark:hover:shadow-black/20"
              >

                {/* Top */}
                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600 dark:bg-blue-950">
                    {college.shortName}
                  </div>

                  <button
                    type="button"
                    aria-label={`Save ${college.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-slate-700"
                  >
                    <Heart size={17} />
                  </button>

                </div>

                {/* College Name */}
                <h2 className="mt-5 text-xl font-bold">
                  {college.name}
                </h2>

                {/* Location */}
                <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin size={14} />
                  <span>{college.location}</span>
                </div>

                {/* Branch */}
                <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                  {college.branch}
                </p>

                {/* Match + Rank */}
                <div className="mt-6 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-950/50">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Your Match
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-xl font-bold text-blue-600">
                      <TrendingUp size={17} />
                      {college.match}%
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Closing Rank
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {college.closingRank.toLocaleString()}
                    </p>
                  </div>

                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">

                  <div>
                    <p className="text-xs text-slate-500">
                      Total fees
                    </p>

                    <p className="mt-0.5 font-bold">
                      {college.feesDisplay}
                    </p>
                  </div>

                  <Link
                    to={`/college/${college.id}`}
                    className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Explore
                    <ArrowUpRight size={15} />
                  </Link>

                </div>

              </div>
            ))}

          </div>
        ) : (
          /* No Results */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">

            <h2 className="text-xl font-bold">
              No colleges found
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setType("All");
                setBranch("All");
              }}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Clear Filters
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Colleges;