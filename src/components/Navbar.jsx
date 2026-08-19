import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  GraduationCap,
  ArrowRight,
  Sun,
  Moon,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Heart,
  Scale,
  LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    setUserDropdownOpen(false);
    logout();
    navigate("/");
  };

  const navLinks = [
    { label: "Explore Colleges", to: "/colleges" },
    { label: "Recommendations", to: "/recommendations" },
    { label: "Compare", to: "/compare" },
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
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              {link.label}
            </Link>
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

          {isAuthenticated ? (
            /* USER LOGGED IN DROPDOWN */
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span>{user?.name || "Student"}</span>
                <ChevronDown size={16} className="text-slate-400" />
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="border-b border-slate-100 px-3 py-2.5 dark:border-slate-800">
                      <p className="text-xs font-medium text-slate-400">Signed in as</p>
                      <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                        {user?.email}
                      </p>
                    </div>

                    <div className="mt-1 space-y-0.5">
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <LayoutDashboard size={16} className="text-blue-600" />
                        Dashboard
                      </Link>

                      <Link
                        to="/admission"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <User size={16} className="text-blue-600" />
                        Edit Preferences
                      </Link>

                      <Link
                        to="/recommendations"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <Sparkles size={16} className="text-amber-500" />
                        My Recommendations
                      </Link>

                      <Link
                        to="/favorites"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <Heart size={16} className="text-red-500" />
                        Saved Colleges
                      </Link>

                      <Link
                        to="/compare"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <Scale size={16} className="text-indigo-500" />
                        Compare Colleges
                      </Link>
                    </div>

                    <div className="mt-1 border-t border-slate-100 pt-1 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* USER NOT LOGGED IN */
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl border border-blue-600 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white"
              >
                Register
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* ================= MOBILE ACTIONS ================= */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

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
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <div className="px-4 py-1">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="font-bold text-slate-900 dark:text-white">{user?.name}</p>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={closeMobileMenu}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/admission"
                    onClick={closeMobileMenu}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200"
                  >
                    Admission Preferences
                  </Link>

                  <Link
                    to="/favorites"
                    onClick={closeMobileMenu}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200"
                  >
                    Saved Colleges
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      handleLogout();
                    }}
                    className="w-full rounded-xl bg-red-50 px-4 py-3 text-left text-sm font-bold text-red-600 dark:bg-red-950/40"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;