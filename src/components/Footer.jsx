import {
  GraduationCap,
  ArrowUpRight,
  Mail,
  MapPin,
  Code2,
} from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">

        {/* Top */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <GraduationCap size={24} />
              </div>

              <div className="text-xl font-bold tracking-tight text-slate-900">
                Campus<span className="text-blue-600">Match</span>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
              Helping students make smarter, more confident college
              decisions with personalized admission guidance.
            </p>

            <div className="mt-6 space-y-3 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                support@campusmatch.com
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                India
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Product
            </h3>

            <div className="mt-5 space-y-3">
              <a
                href="#colleges"
                className="block text-sm text-slate-500 transition hover:text-blue-600"
              >
                Colleges
              </a>

              <a
                href="#features"
                className="block text-sm text-slate-500 transition hover:text-blue-600"
              >
                Features
              </a>

              <a
                href="#counselling"
                className="block text-sm text-slate-500 transition hover:text-blue-600"
              >
                AI Counsellor
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Resources
            </h3>

            <div className="mt-5 space-y-3">
              <a
                href="#how-it-works"
                className="block text-sm text-slate-500 transition hover:text-blue-600"
              >
                Counselling Guide
              </a>

              <a
                href="#"
                className="block text-sm text-slate-500 transition hover:text-blue-600"
              >
                Important Dates
              </a>

              <a
                href="#"
                className="block text-sm text-slate-500 transition hover:text-blue-600"
              >
                Documents
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-5 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-slate-500">
            © 2026 CampusMatch. All rights reserved.
          </p>

          <div className="flex items-center gap-5">

            <a
              href="#"
              className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
            >
              <Code2 size={17} />
              Developer
              <ArrowUpRight size={14} />
            </a>

            <a
              href="#"
              className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
            >
              Contact
            </a>

          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Data should always be verified with official authorities.
        </p>

      </div>
    </footer>
  );
}

export default Footer;