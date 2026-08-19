import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 dark:bg-slate-950">

      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">

        <div className="w-full">

          <Link
            to="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Mail size={24} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-blue-600">
              Password Recovery
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Forgot Password?
            </h1>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Enter your email and we'll send you a password reset link.
            </p>

            {error && (
              <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {message && (
              <div className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-600">
                {message}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >

              <div>
                <label className="mb-2 block text-sm font-semibold dark:text-white">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {loading
                  ? "Sending..."
                  : "Send Reset Link"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;