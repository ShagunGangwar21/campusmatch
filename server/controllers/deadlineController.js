const Deadline = require("../models/Deadline");

const fallbackDeadlines = [
  {
    _id: "d1",
    title: "JEE Main 2026 Session 2 Registration",
    category: "Exam",
    exam: "JEE Main",
    startDate: "February 02, 2026",
    endDate: "March 04, 2026",
    status: "Closed",
    description: "Official registration for NTA JEE Main Session 2 exam.",
    officialUrl: "https://jeemain.nta.ac.in",
    sourceName: "National Testing Agency (NTA)",
  },
  {
    _id: "d2",
    title: "JoSAA 2026 Choice Filling & Locking",
    category: "Counselling",
    exam: "JEE Main",
    startDate: "June 10, 2026",
    endDate: "June 19, 2026",
    status: "Upcoming",
    description: "Centralized choice filling for 23 IITs, 32 NITs, 26 IIITs and GFTIs.",
    officialUrl: "https://josaa.nic.in",
    sourceName: "Joint Seat Allocation Authority (JoSAA)",
  },
  {
    _id: "d3",
    title: "JAC Delhi Counselling Registration",
    category: "Counselling",
    exam: "JEE Main",
    startDate: "May 20, 2026",
    endDate: "June 25, 2026",
    status: "Upcoming",
    description: "Admission to DTU, NSUT, IIIT-D, and IGDTUW.",
    officialUrl: "https://jacdelhi.admissions.nic.in",
    sourceName: "JAC Delhi Authority",
  },
  {
    _id: "d4",
    title: "UPTAC AKTU B.Tech Counselling Registration",
    category: "Counselling",
    exam: "JEE Main",
    startDate: "June 25, 2026",
    endDate: "July 15, 2026",
    status: "Upcoming",
    description: "State counselling for top engineering institutions across Uttar Pradesh.",
    officialUrl: "https://uptac.admissions.nic.in",
    sourceName: "Dr. A.P.J. Abdul Kalam Technical University",
  },
];

const getDeadlines = async (req, res) => {
  try {
    let deadlines = await Deadline.find({}).sort({ startDate: 1 }).lean();

    if (!deadlines || deadlines.length === 0) {
      deadlines = fallbackDeadlines;
    }

    res.json({
      success: true,
      count: deadlines.length,
      deadlines,
    });
  } catch (error) {
    console.error("Get deadlines error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch admission deadlines" });
  }
};

module.exports = { getDeadlines };
