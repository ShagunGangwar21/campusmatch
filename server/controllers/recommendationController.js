const Profile = require("../models/Profile");
const College = require("../models/College");
const fallbackColleges = require("../data/colleges");

const getRecommendations = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId }).lean();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Please complete your admission profile first.",
      });
    }

    const studentRank = Number(profile.rank) || 50000;
    const studentBudget = Number(profile.budget) || 500000;
    const studentState = (profile.state || "").trim().toLowerCase();
    const studentBranch = (profile.branch || "").trim().toLowerCase();
    const studentExam = (profile.exam || "").trim().toLowerCase();
    const studentCategory = (profile.category || "General").trim();

    let allColleges = await College.find({}).lean();

    if (!allColleges || allColleges.length === 0) {
      allColleges = fallbackColleges.map((c) => ({
        _id: String(c.id),
        ...c,
        branches: [c.branch || "CSE"],
        exams: c.exams || ["JEE Main"],
        categories: c.categories || ["General", "OBC", "SC", "ST"],
      }));
    }

    const recommendations = allColleges.map((college) => {
      const closingRank = college.closingRank || 100000;
      const fees = college.fees || 150000;
      const state = (college.state || "").trim().toLowerCase();
      const branches = (college.branches || [college.branch || ""]).map((b) => b.toLowerCase());
      const exams = (college.exams || []).map((e) => e.toLowerCase());

      // 1. Calculate Prediction Status
      let predictionStatus = "UNLIKELY";
      let predictionBadgeColor = "red";

      if (studentRank <= closingRank * 0.85) {
        predictionStatus = "SAFE";
        predictionBadgeColor = "emerald";
      } else if (studentRank <= closingRank * 1.05) {
        predictionStatus = "LIKELY";
        predictionBadgeColor = "blue";
      } else if (studentRank <= closingRank * 1.25) {
        predictionStatus = "TARGET";
        predictionBadgeColor = "amber";
      } else if (studentRank <= closingRank * 1.50) {
        predictionStatus = "AMBITIOUS";
        predictionBadgeColor = "purple";
      }

      // 2. Score breakdown
      let score = 0;

      // Rank compatibility (Max 40)
      if (studentRank <= closingRank) {
        score += 40;
      } else {
        const ratio = studentRank / closingRank;
        score += Math.max(0, Math.round(40 * (2 - ratio)));
      }

      // Branch match (Max 25)
      const hasBranch = branches.some((b) => b.includes(studentBranch) || studentBranch.includes(b));
      if (hasBranch) score += 25;

      // Budget match (Max 15)
      if (fees <= studentBudget) {
        score += 15;
      } else {
        const feeRatio = studentBudget / fees;
        score += Math.max(0, Math.round(15 * feeRatio));
      }

      // Exam match (Max 10)
      const hasExam = exams.length === 0 || exams.some((e) => e.includes(studentExam) || studentExam.includes(e));
      if (hasExam) score += 10;

      // State match (Max 10)
      const isHomeState = state === studentState;
      if (isHomeState) score += 10;

      const matchScore = Math.min(100, Math.max(10, score));

      // 3. Reasons summary
      const reasons = [];
      if (studentRank <= closingRank) {
        reasons.push(`Your rank (${studentRank.toLocaleString()}) is comfortably better than the closing rank (${closingRank.toLocaleString()}).`);
      } else if (studentRank <= closingRank * 1.25) {
        reasons.push(`Your rank is close to the cutoff (${closingRank.toLocaleString()}) - strong chance in later counselling rounds.`);
      } else {
        reasons.push(`Cutoff rank (${closingRank.toLocaleString()}) is competitive for your rank.`);
      }

      if (hasBranch) {
        reasons.push(`Your preferred branch (${profile.branch}) is offered at this institution.`);
      }

      if (fees <= studentBudget) {
        reasons.push(`Annual tuition fees (${college.feesDisplay}) are within your budget.`);
      } else {
        reasons.push(`Annual fees (${college.feesDisplay}) exceed your target budget.`);
      }

      if (isHomeState) {
        reasons.push(`Home State quota benefit applicable in ${profile.state}.`);
      }

      return {
        ...college,
        id: college._id ? String(college._id) : college.id,
        match: matchScore,
        predictionStatus,
        predictionBadgeColor,
        reasons,
      };
    });

    // Sort by match score descending, then by closing rank ascending
    recommendations.sort((a, b) => b.match - a.match || a.closingRank - b.closingRank);

    res.status(200).json({
      success: true,
      profile,
      count: recommendations.length,
      recommendations,
      colleges: recommendations, // Dual key for backwards compatibility
    });
  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate college recommendations",
    });
  }
};

module.exports = { getRecommendations };
