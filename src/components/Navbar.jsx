import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  GraduationCap,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "Colleges", href: "#colleges" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Counselling", href: "#counselling" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl transition-colors dark:border-slate-800 dark:bg-slate-950/90">

      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <GraduationCap size={23} strokeWidth={2.2} />
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Campus<span className="text-blue-600">Match</span>
          </span>
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* Theme Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* LOGIN */}
          <Link
            to="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            Login
          </Link>

          {/* REGISTER */}
          <Link
            to="/register"
            className="rounded-xl border border-blue-600 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white"
          >
            Register
          </Link>

          {/* GET STARTED */}
          <Link
            to="/admission"
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-blue-600"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* ================= MOBILE ACTIONS ================= */}
        <div className="flex items-center gap-2 lg:hidden">

          {/* Theme */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Menu */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-5 py-5 sm:px-8">

              {/* Navigation Links */}
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-3">

                {/* LOGIN */}
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
                >
                  Login
                </Link>

                {/* REGISTER */}
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Register
                </Link>

              </div>

              {/* GET STARTED */}
              <Link
                to="/admission"
                onClick={closeMobileMenu}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Get Started
                <ArrowRight size={15} />
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}

export default Navbar;