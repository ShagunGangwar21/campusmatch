import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Scale, X, Check, Globe, MapPin, GraduationCap } from "lucide-react";

function Compare() {
  const [availableColleges, setAvailableColleges] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/colleges`);
        const data = await response.json();
        if (data.success) {
          const list = data.colleges || [];
          setAvailableColleges(list);
          // Default pick up to first 3 colleges for quick side-by-side comparison
          if (list.length >= 2) {
            setSelectedIds(list.slice(0, 3).map((c) => String(c._id || c.id)));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  const toggleSelect = (id) => {
    const strId = String(id);
    if (selectedIds.includes(strId)) {
      if (selectedIds.length <= 2) {
        alert("Please select at least 2 colleges to compare.");
        return;
      }
      setSelectedIds(selectedIds.filter((item) => item !== strId));
    } else {
      if (selectedIds.length >= 4) {
        alert("You can compare a maximum of 4 colleges at once.");
        return;
      }
      setSelectedIds([...selectedIds, strId]);
    }
  };

  const selectedColleges = availableColleges.filter((c) => selectedIds.includes(String(c._id || c.id)));

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/colleges"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300"
        >
          <ArrowLeft size={18} />
          Back to Colleges
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Scale size={24} />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Decision Assistant
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Compare Colleges Side-by-Side
              </h1>
            </div>
          </div>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Compare annual tuition fees, historical cutoffs, branches, placement statistics, and official credentials.
          </p>
        </div>

        {/* Selection Pills */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
            Select Colleges to Compare (2 - 4):
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableColleges.map((college) => {
              const cid = String(college._id || college.id);
              const isSelected = selectedIds.includes(cid);
              return (
                <button
                  key={cid}
                  type="button"
                  onClick={() => toggleSelect(cid)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  {isSelected ? <Check size={14} /> : null}
                  {college.shortName || college.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedColleges.length >= 2 ? (
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                  <th className="w-48 p-5 text-sm font-bold text-slate-500 uppercase tracking-wider">
                    Feature
                  </th>
                  {selectedColleges.map((college) => (
                    <th key={college.id || college._id} className="p-5 min-w-[220px]">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-block rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                            {college.type || "Institution"}
                          </span>
                          <h3 className="mt-2 font-bold text-slate-900 dark:text-white text-lg">
                            {college.name}
                          </h3>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                <tr>
                  <td className="p-5 font-bold text-slate-500">Location</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id || c._id} className="p-5 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-slate-400" />
                        {c.location || `${c.city}, ${c.state}`}
                      </span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-bold text-slate-500">Annual Tuition Fees</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id || c._id} className="p-5 font-bold text-emerald-600 dark:text-emerald-400">
                      {c.feesDisplay || `₹${(c.fees / 100000).toFixed(2)} Lakh/year`}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-bold text-slate-500">Closing Rank (Cutoff)</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id || c._id} className="p-5 font-bold text-slate-900 dark:text-white">
                      {c.closingRank ? Number(c.closingRank).toLocaleString() : "N/A"}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-bold text-slate-500">Branches Offered</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id || c._id} className="p-5">
                      <div className="flex flex-wrap gap-1">
                        {(c.branches || [c.branch || "CSE"]).map((b) => (
                          <span key={b} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {b}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-bold text-slate-500">Exams Accepted</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id || c._id} className="p-5 font-medium">
                      {(c.exams || ["JEE Main"]).join(", ")}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-bold text-slate-500">Placements (Avg Package)</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id || c._id} className="p-5 font-semibold text-blue-600 dark:text-blue-400">
                      {c.placements?.averagePackage || "N/A"}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-bold text-slate-500">Accreditation</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id || c._id} className="p-5 font-medium">
                      {c.accreditation || "UGC / AICTE Approved"}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-5 font-bold text-slate-500">Official Portal</td>
                  {selectedColleges.map((c) => (
                    <td key={c.id || c._id} className="p-5">
                      {c.officialWebsite ? (
                        <a
                          href={c.officialWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
                        >
                          <Globe size={14} />
                          Visit Website
                        </a>
                      ) : (
                        <span className="text-slate-400">N/A</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-500">Select at least 2 colleges above to see side-by-side comparison.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Compare;
