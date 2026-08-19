import {
  MapPin,
  Heart,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

const colleges = [
  {
    name: "NIT Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    branch: "Computer Science & Engineering",
    match: 94,
    cutoff: "18,420",
    fees: "₹5.7L",
  },
  {
    name: "IIIT Allahabad",
    location: "Prayagraj, Uttar Pradesh",
    branch: "Information Technology",
    match: 89,
    cutoff: "22,810",
    fees: "₹6.1L",
  },
  {
    name: "NIT Warangal",
    location: "Warangal, Telangana",
    branch: "Computer Science & Engineering",
    match: 86,
    cutoff: "26,140",
    fees: "₹5.6L",
  },
];

function CollegePreview() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {colleges.map((college) => (
        <div
          key={college.name}
          className="
            group rounded-2xl border p-6 shadow-sm
            bg-white border-slate-200
            transition duration-300
            hover:-translate-y-1
            hover:border-blue-200
            hover:shadow-xl hover:shadow-slate-200/60

            dark:bg-slate-900
            dark:border-slate-800
            dark:hover:border-blue-800
            dark:hover:shadow-black/30
          "
        >
          {/* Top */}
          <div className="flex items-start justify-between">
            <div
              className="
                flex h-12 w-12 items-center justify-center
                rounded-xl bg-blue-50 text-lg font-bold text-blue-600
                dark:bg-blue-950 dark:text-blue-400
              "
            >
              {college.name.charAt(0)}
            </div>

            <button
              type="button"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full border
                border-slate-200 text-slate-400
                transition
                hover:border-red-200
                hover:bg-red-50
                hover:text-red-500

                dark:border-slate-700
                dark:text-slate-500
                dark:hover:border-red-900
                dark:hover:bg-red-950
                dark:hover:text-red-400
              "
              aria-label={`Save ${college.name}`}
            >
              <Heart size={17} />
            </button>
          </div>

          {/* College Name */}
          <h3
            className="
              mt-5 text-xl font-bold
              text-slate-900
              dark:text-white
            "
          >
            {college.name}
          </h3>

          {/* Location */}
          <div
            className="
              mt-2 flex items-center gap-1.5 text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            <MapPin size={14} />
            <span>{college.location}</span>
          </div>

          {/* Branch */}
          <p
            className="
              mt-4 text-sm font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            {college.branch}
          </p>

          {/* Match */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div
              className="
                rounded-xl bg-blue-50 p-4
                dark:bg-blue-950/50
              "
            >
              <p
                className="
                  text-xs font-medium
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Your Match
              </p>

              <div
                className="
                  mt-1 flex items-center gap-1.5
                  text-xl font-bold
                  text-blue-600
                  dark:text-blue-400
                "
              >
                <TrendingUp size={17} />
                {college.match}%
              </div>
            </div>

            <div
              className="
                rounded-xl bg-slate-50 p-4
                dark:bg-slate-800
              "
            >
              <p
                className="
                  text-xs font-medium
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Closing Rank
              </p>

              <p
                className="
                  mt-1 text-lg font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                {college.cutoff}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div
            className="
              mt-5 flex items-center justify-between
              border-t pt-5
              border-slate-100
              dark:border-slate-800
            "
          >
            <div>
              <p
                className="
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Total fees
              </p>

              <p
                className="
                  mt-0.5 font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                {college.fees}
              </p>
            </div>

            <button
              type="button"
              className="
                flex items-center gap-1.5
                rounded-xl
                bg-slate-900
                px-4 py-2.5
                text-sm font-semibold text-white
                transition
                hover:bg-blue-600

                dark:bg-blue-600
                dark:hover:bg-blue-500
              "
            >
              Explore
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CollegePreview;