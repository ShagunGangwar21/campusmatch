import { ArrowRight, ClipboardList, Search, Scale, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Build your profile",
    text: "Tell us your rank, exam, branch preferences, budget and location.",
  },
  {
    number: "02",
    icon: Search,
    title: "Discover colleges",
    text: "Get colleges that match your academic profile and preferences.",
  },
  {
    number: "03",
    icon: Scale,
    title: "Compare options",
    text: "Compare fees, cutoffs, branches and other important factors.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Plan your admission",
    text: "Follow a personalized roadmap with deadlines and document checklists.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-slate-50 py-20 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            From confusion to a clear admission plan
          </h2>

          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
            CampusMatch brings the important parts of your admission
            journey together in one place.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                    <Icon size={21} />
                  </div>

                  <span className="text-sm font-black text-slate-200 dark:text-slate-700">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {step.text}
                </p>

                {index !== steps.length - 1 && (
                  <ArrowRight className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-slate-300 lg:block dark:text-slate-700" />
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;