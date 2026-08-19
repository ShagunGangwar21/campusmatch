import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, GraduationCap } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password);
      // Redirect new users straight to admission profile setup
      navigate("/admission");
    } catch (err) {
      console.error("Register error:", err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 dark:bg-slate-950 sm:px-8">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div className="w-full">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <GraduationCap size={25} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-blue-600">
              Get Started
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Create Your Account
            </h1>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Start your college discovery journey.
            </p>

            {error && (
              <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:bg-red-950/30 dark:text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && <ArrowRight size={17} />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;