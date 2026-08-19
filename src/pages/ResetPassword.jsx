import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, KeyRound, CheckCircle } from "lucide-react";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill all password fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to reset password. Token may be expired.");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 dark:bg-slate-950 sm:px-8">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div className="w-full">
          <Link
            to="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
              <KeyRound size={24} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-blue-600">
              Account Security
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Set New Password
            </h1>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Enter your new secure password below.
            </p>

            {error && (
              <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:bg-red-950/30 dark:text-red-400">
                {error}
              </div>
            )}

            {success ? (
              <div className="mt-6 rounded-2xl bg-emerald-50 p-6 text-center dark:bg-emerald-950/40">
                <CheckCircle className="mx-auto text-emerald-600 dark:text-emerald-400" size={40} />
                <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                  Password Reset Successful!
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Redirecting to login page in a few seconds...
                </p>
                <Link
                  to="/login"
                  className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                >
                  Login Now
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading ? "Updating Password..." : "Reset Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
