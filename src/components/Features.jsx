import {
  BrainCircuit,
  GitCompareArrows,
  CalendarClock,
  FileCheck2,
  Heart,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "Smart Recommendations",
    text: "Get personalized college suggestions based on your academic profile and preferences.",
  },
  {
    icon: GitCompareArrows,
    title: "College Comparison",
    text: "Compare colleges side by side using the factors that actually matter to you.",
  },
  {
    icon: BarChart3,
    title: "Cutoff Insights",
    text: "Understand previous cutoff trends and how your profile compares.",
  },
  {
    icon: CalendarClock,
    title: "Important Deadlines",
    text: "Keep track of counselling, registration and admission deadlines.",
  },
  {
    icon: FileCheck2,
    title: "Document Checklist",
    text: "Know which documents you need and track your preparation.",
  },
  {
    icon: Heart,
    title: "Personal Shortlist",
    text: "Save your favourite colleges and build your own admission shortlist.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-white py-20 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Everything in one place
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            More than just a college search
          </h2>

          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
            A complete toolkit designed to help students make better
            admission decisions.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-900 dark:hover:bg-slate-900"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                  <Icon size={21} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Features;