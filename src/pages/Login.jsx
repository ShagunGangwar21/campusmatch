import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, GraduationCap } from "lucide-react";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 dark:bg-slate-950 sm:px-8">

      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">

        <div className="w-full">

          {/* Back */}
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          {/* Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

            {/* Logo */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <GraduationCap size={25} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-blue-600">
              Welcome Back
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Login to CampusMatch
            </h1>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Continue your college discovery journey.
            </p>

            {/* Error */}
            {error && (
              <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:bg-red-950/30 dark:text-red-400">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  Password
                </label>

                <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </Link>
              </div>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}

                {!loading && <ArrowRight size={17} />}
              </button>

            </form>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/admission"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Get Started
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;