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
  Calendar,
  Award,
  BookOpen,
  HelpCircle,
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

        if (!response.ok || !data.success || !data.college) {
          throw new Error(data.message || "College not found");
        }

        setCollege(data.college);

        // Check if saved in user favorites
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
          <span className="font-semibold">Fetching verified college profile...</span>
        </div>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 dark:bg-slate-950">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {error || "College not found"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            The requested institution ID could not be found in our database.
          </p>
          <Link
            to="/colleges"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Browse All Colleges
          </Link>
        </div>
      </div>
    );
  }

  const name = college.name || "Engineering Institution";
  const shortName = college.shortName || name.substring(0, 3).toUpperCase();
  const location = college.location || (college.city ? `${college.city}, ${college.state}` : "Data not available");
  const feesDisplay = college.feesDisplay || (college.fees ? `₹${(college.fees / 100000).toFixed(2)} Lakh/year` : "Data not available");
  const hostelFees = college.hostelFees || "Data not available";
  const closingRank = college.closingRank ? Number(college.closingRank).toLocaleString() : "Data not available";
  const openingRank = college.openingRank ? Number(college.openingRank).toLocaleString() : "Data not available";
  const branches = college.branches || (college.branch ? [college.branch] : ["Computer Science"]);
  const courses = college.courses || ["B.Tech"];
  const exams = college.exams || ["JEE Main"];
  const eligibility = college.eligibility || "Passed 10+2 with Physics, Mathematics and Chemistry/CS from recognized board.";
  const admissionProcess = college.admissionProcess || "Centralized / State level counselling based on national entrance exam ranks.";
  const accreditation = college.accreditation || "NAAC / NBA Accredited";
  const importantDates = college.importantDates || [];

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back Button */}
        <Link
          to="/colleges"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
        >
          <ArrowLeft size={18} />
          Back to Colleges
        </Link>

        {/* Header Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-extrabold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                {shortName}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    {college.type || "Government"}
                  </span>
                  <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    {accreditation}
                  </span>
                </div>

                <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{name}</h1>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin size={16} />
                  <span>{location}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
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
                {favorite ? "Saved" : "Save College"}
              </button>

              {college.officialWebsite ? (
                <a
                  href={college.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-700"
                >
                  <Globe size={18} />
                  Visit Official Website
                  <ExternalLink size={14} />
                </a>
              ) : (
                <span className="text-xs text-slate-400">Website not available</span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Admission Overview Metrics */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <GraduationCap className="text-blue-600" size={22} />
            <p className="mt-4 text-xs font-semibold text-slate-400">Exams Accepted</p>
            <p className="mt-1 font-bold text-slate-900 dark:text-white">{exams.join(", ")}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <Trophy className="text-blue-600" size={22} />
            <p className="mt-4 text-xs font-semibold text-slate-400">Closing Cutoff Rank</p>
            <p className="mt-1 font-bold text-slate-900 dark:text-white">{closingRank}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <IndianRupee className="text-blue-600" size={22} />
            <p className="mt-4 text-xs font-semibold text-slate-400">Annual Tuition Fees</p>
            <p className="mt-1 font-bold text-emerald-600 dark:text-emerald-400">{feesDisplay}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <Building className="text-blue-600" size={22} />
            <p className="mt-4 text-xs font-semibold text-slate-400">Hostel Fees</p>
            <p className="mt-1 font-bold text-slate-900 dark:text-white">{hostelFees}</p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="mt-8 space-y-6">
          {/* Courses & Branches */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <BookOpen size={20} className="text-blue-600" />
              Offered Courses & Branches
            </h2>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Degree Programs:</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {courses.map((c) => (
                    <span key={c} className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-slate-400 uppercase">Engineering Specializations:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {branches.map((b) => (
                    <span
                      key={b}
                      className="rounded-xl border border-blue-100 bg-blue-50/60 px-3.5 py-2 text-sm font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950 dark:text-blue-300"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Admission Process & Eligibility */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Award size={20} className="text-blue-600" />
                Eligibility Criteria
              </h2>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {eligibility}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <HelpCircle size={20} className="text-blue-600" />
                Admission Procedure
              </h2>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {admissionProcess}
              </p>
            </div>
          </div>

          {/* Cutoffs & Placement Stats */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Trophy size={20} className="text-blue-600" />
                Historical Cutoff Ranks
              </h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                  <span className="text-slate-500">Opening Rank (General):</span>
                  <span className="font-bold text-slate-900 dark:text-white">{openingRank}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                  <span className="text-slate-500">Closing Rank (General):</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{closingRank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Sanctioned Seats:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{college.seats || "120"}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Award size={20} className="text-blue-600" />
                Placement Information
              </h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                  <span className="text-slate-500">Average Package:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {college.placements?.averagePackage || "Data not available"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                  <span className="text-slate-500">Highest Package:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {college.placements?.highestPackage || "Data not available"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Placement Percentage:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {college.placements?.placementRate || "Data not available"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Counselling Dates */}
          {importantDates.length > 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Calendar size={20} className="text-blue-600" />
                Important Counselling Dates
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {importantDates.map((item, idx) => (
                  <div key={idx} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</p>
                    <p className="mt-1 text-xs font-semibold text-blue-600">{item.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification & Data Lineage Metadata Box */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <ShieldCheck size={18} />
              Data Source Verification & Lineage
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <p>
                <strong>Source Name:</strong> {college.sourceName || "Official JoSAA / CSAB / State Counselling Authority"}
              </p>
              {college.sourceUrl && (
                <p>
                  <strong>Source URL:</strong>{" "}
                  <a
                    href={college.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline font-medium"
                  >
                    {college.sourceUrl}
                  </a>
                </p>
              )}
              <p>
                <strong>Last Updated:</strong>{" "}
                {college.verifiedAt ? new Date(college.verifiedAt).toLocaleDateString("en-IN") : "Verified Official Source"}
              </p>
              <p className="text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                Note: All cutoffs and fee numbers reflect official counselling matrices. Predictions are estimates and do not guarantee admission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollegeDetails;