import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  GraduationCap,
  IndianRupee,
  Trophy,
  CheckCircle,
  Globe,
  ExternalLink,
  ShieldCheck,
  Building,
  Loader2,
  Heart,
} from "lucide-react";

function CollegeDetails() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorite, setFavorite] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/colleges/${id}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "College not found");
        }

        setCollege(data.college);

        // Check if saved in favorites
        const token = localStorage.getItem("token");
        if (token) {
          const favRes = await fetch(`${API_BASE_URL}/favorites`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const favData = await favRes.json();
          if (favData.success) {
            const isFav = (favData.favorites || []).some(
              (f) => String(f.id || f._id) === String(data.college._id || data.college.id)
            );
            setFavorite(isFav);
          }
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Unable to load college details");
      } finally {
        setLoading(false);
      }
    };

    fetchCollegeDetails();
  }, [id]);

  const toggleFavorite = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to save this college to your favorites.");
      return;
    }

    try {
      const collegeId = college._id || college.id;
      if (favorite) {
        await fetch(`${API_BASE_URL}/favorites/${collegeId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorite(false);
      } else {
        await fetch(`${API_BASE_URL}/favorites`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ collegeId }),
        });
        setFavorite(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center gap-3 text-blue-600">
          <Loader2 className="animate-spin" size={25} />
          <span className="font-semibold">Loading college profile...</span>
        </div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {error || "College not found"}
          </h1>
          <Link
            to="/colleges"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Colleges
          </Link>
        </div>
      </div>
    );
  }

  const shortName = college.shortName || college.name?.substring(0, 3).toUpperCase() || "COL";
  const feesDisplay = college.feesDisplay || `₹${(college.fees / 100000).toFixed(2)}L/year`;
  const closingRank = college.closingRank ? Number(college.closingRank).toLocaleString() : "N/A";
  const branches = college.branches || [college.branch || "Computer Science"];
  const exams = college.exams || ["JEE Main"];

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back */}
        <Link
          to="/colleges"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300"
        >
          <ArrowLeft size={18} />
          Back to Colleges
        </Link>

        {/* Header Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                {shortName}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    {college.type || "Government"}
                  </span>
                  {college.accreditation && (
                    <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                      {college.accreditation}
                    </span>
                  )}
                </div>

                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                  {college.name}
                </h1>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin size={16} />
                  {college.location || `${college.city}, ${college.state}`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleFavorite}
                className={`flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition ${
                  favorite
                    ? "border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                }`}
              >
                <Heart size={18} className={favorite ? "fill-current text-red-500" : ""} />
                {favorite ? "Saved" : "Bookmark"}
              </button>

              {college.officialWebsite && (
                <a
                  href={college.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-700"
                >
                  <Globe size={18} />
                  Official Portal
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <GraduationCap className="text-blue-600" size={22} />
            <p className="mt-4 text-xs font-semibold text-slate-400">Exams Accepted</p>
            <p className="mt-1 font-bold">{exams.join(", ")}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <Trophy className="text-blue-600" size={22} />
            <p className="mt-4 text-xs font-semibold text-slate-400">Closing Cutoff Rank</p>
            <p className="mt-1 font-bold">{closingRank}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <IndianRupee className="text-blue-600" size={22} />
            <p className="mt-4 text-xs font-semibold text-slate-400">Total Tuition Fees</p>
            <p className="mt-1 font-bold">{feesDisplay}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <Building className="text-blue-600" size={22} />
            <p className="mt-4 text-xs font-semibold text-slate-400">Hostel Fees</p>
            <p className="mt-1 font-bold">{college.hostelFees || "Available"}</p>
          </div>
        </div>

        {/* Branches & Placement Info */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Branches */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold">Available Engineering Branches</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {branches.map((b) => (
                <span
                  key={b}
                  className="rounded-xl border border-blue-100 bg-blue-50/50 px-3.5 py-2 text-sm font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950 dark:text-blue-300"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Placements */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold">Placement Statistics</h2>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800 text-sm">
                <span className="text-slate-500">Average Package:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {college.placements?.averagePackage || "N/A"}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800 text-sm">
                <span className="text-slate-500">Highest Package:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {college.placements?.highestPackage || "N/A"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Placement Rate:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {college.placements?.placementRate || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Lineage Box */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <ShieldCheck size={18} />
            Data Source Verification & Lineage
          </div>
          <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p>
              <strong>Data Source:</strong> {college.sourceName || "JoSAA / Official Portal"}
            </p>
            {college.sourceUrl && (
              <p>
                <strong>Source URL:</strong>{" "}
                <a
                  href={college.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {college.sourceUrl}
                </a>
              </p>
            )}
            <p>
              <strong>Last Verified:</strong>{" "}
              {college.verifiedAt ? new Date(college.verifiedAt).toLocaleDateString("en-IN") : "Recently"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollegeDetails;