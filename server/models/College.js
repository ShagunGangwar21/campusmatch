const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    shortName: { type: String, required: true, trim: true },
    type: { type: String, enum: ["IIT", "NIT", "IIIT", "Government", "Private", "Deemed"], default: "Government" },
    officialWebsite: { type: String, trim: true, default: "" },
    location: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true, index: true },
    state: { type: String, required: true, trim: true, index: true },
    
    courses: [{ type: String, trim: true }],
    branches: [{ type: String, trim: true }],
    exams: [{ type: String, trim: true, index: true }],
    categories: [{ type: String, trim: true }],

    fees: { type: Number, required: true, default: 0 },
    feesDisplay: { type: String, required: true },
    hostelFees: { type: String, default: "N/A" },

    closingRank: { type: Number, required: true, index: true },
    openingRank: { type: Number, default: 1 },
    seats: { type: Number, default: 100 },

    eligibility: { type: String, default: "10+2 with Physics, Mathematics and Chemistry/Biology/CS." },
    admissionProcess: { type: String, default: "Admissions via national/state counselling based on rank." },
    accreditation: { type: String, default: "NAAC / NBA Accredited" },
    placements: {
      averagePackage: { type: String, default: "N/A" },
      highestPackage: { type: String, default: "N/A" },
      placementRate: { type: String, default: "N/A" }
    },

    importantDates: [
      {
        title: String,
        date: String,
        status: { type: String, enum: ["Upcoming", "Ongoing", "Completed"], default: "Upcoming" }
      }
    ],

    // Data lineage & verification
    sourceUrl: { type: String, default: "https://josaa.nic.in" },
    sourceName: { type: String, default: "Official JoSAA / CSAB Counselling Data" },
    lastUpdated: { type: Date, default: Date.now },
    verifiedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);
