import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950">

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-100 w-100 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-28">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
            <Sparkles size={15} />
            Smart college guidance for students
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Find the college that
            <span className="block text-blue-600">
              fits your future.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
            CampusMatch helps students discover, compare and shortlist
            colleges based on their rank, branch, budget, location and
            preferences.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700">
              Find My Colleges
              <ArrowRight size={18} />
            </button>

            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400">
              <Search size={18} />
              Explore Colleges
            </button>
          </div>

          <div className="mt-9 flex flex-wrap gap-6 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-emerald-500" />
              Student focused
            </span>

            <span className="flex items-center gap-2">
              <TrendingUp size={17} className="text-blue-500" />
              Data driven
            </span>

            <span className="flex items-center gap-2">
              <GraduationCap size={17} className="text-indigo-500" />
              Admission guidance
            </span>
          </div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-300/30 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">

            {/* Dashboard header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Your College Match
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                  Personalized for you
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <GraduationCap size={22} />
              </div>
            </div>

            {/* Score */}
            <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Best Match
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                    NIT Trichy
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-3xl font-black text-blue-600">
                    94%
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    match score
                  </p>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full w-[94%] rounded-full bg-blue-600" />
              </div>
            </div>

            {/* Recommendation cards */}
            <div className="mt-4 space-y-3">
              {[
                ["NIT Trichy", "Strong Match", "94%"],
                ["IIIT Allahabad", "Strong Match", "89%"],
                ["NIT Warangal", "Target", "86%"],
              ].map(([name, status, score]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {name}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {status}
                    </p>
                  </div>

                  <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-sm font-bold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                    {score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;