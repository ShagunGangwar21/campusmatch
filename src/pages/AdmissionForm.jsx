import { useState } from "react";
import { ArrowLeft, ArrowRight, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdmissionForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    exam: "JEE Main",
    rank: "",
    category: "General",
    state: "",
    branch: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const token = localStorage.getItem("token");

    // User must be logged in
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
         `${import.meta.env.VITE_API_URL}/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            exam: formData.exam,
            rank: Number(formData.rank),
            category: formData.category,
            state: formData.state,
            branch: formData.branch,
            budget: formData.budget,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save profile");
      }

      alert("Profile saved successfully!");

      // Go to college recommendations
      navigate("/colleges");

    } catch (error) {
      console.error("Profile error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-8">

      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Header */}
        <div className="mb-8">

          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <GraduationCap size={25} />
          </div>

          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
            Student Profile
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tell us about yourself
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            Enter your admission details and we will use them to find colleges
            that match your profile.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
        >

          <div className="grid gap-6 sm:grid-cols-2">

            {/* Exam */}
            <div>
              <label
                htmlFor="exam"
                className="mb-2 block text-sm font-semibold"
              >
                Entrance Exam
              </label>

              <select
                id="exam"
                name="exam"
                value={formData.exam}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
              >
                <option>JEE Main</option>
                <option>JEE Advanced</option>
                <option>CUET</option>
                <option>Other</option>
              </select>
            </div>

            {/* Rank */}
            <div>
              <label
                htmlFor="rank"
                className="mb-2 block text-sm font-semibold"
              >
                Exam Rank
              </label>

              <input
                id="rank"
                name="rank"
                type="number"
                min="1"
                placeholder="Example: 28420"
                value={formData.rank}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
              >
                <option>General</option>
                <option>OBC-NCL</option>
                <option>SC</option>
                <option>ST</option>
                <option>EWS</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label
                htmlFor="state"
                className="mb-2 block text-sm font-semibold"
              >
                Home State
              </label>

              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
              >
                <option value="">Select state</option>
                <option>Uttar Pradesh</option>
                <option>Delhi</option>
                <option>Haryana</option>
                <option>Rajasthan</option>
                <option>Madhya Pradesh</option>
                <option>Maharashtra</option>
                <option>Bihar</option>
                <option>Uttarakhand</option>
                <option>Other</option>
              </select>
            </div>

            {/* Branch */}
            <div>
              <label
                htmlFor="branch"
                className="mb-2 block text-sm font-semibold"
              >
                Preferred Branch
              </label>

              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
              >
                <option value="">Select branch</option>
                <option>Computer Science</option>
                <option>Information Technology</option>
                <option>Electronics & Communication</option>
                <option>Electrical Engineering</option>
                <option>Mechanical Engineering</option>
                <option>Civil Engineering</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label
                htmlFor="budget"
                className="mb-2 block text-sm font-semibold"
              >
                Annual Fee Budget
              </label>

              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
              >
                <option value="">Select budget</option>
                <option value="100000">Below ₹1 Lakh</option>
                <option value="200000">₹1 - ₹2 Lakhs</option>
                <option value="400000">₹2 - ₹4 Lakhs</option>
                <option value="600000">₹4 - ₹6 Lakhs</option>
                <option value="1000000">Above ₹6 Lakhs</option>
              </select>
            </div>

          </div>

          {/* Submit */}
          <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving Profile..." : "Find My Colleges"}

              {!loading && <ArrowRight size={17} />}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AdmissionForm;