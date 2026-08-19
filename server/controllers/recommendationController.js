const Profile = require("../models/Profile");
const colleges = require("../data/colleges");

const getRecommendations = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId }).lean();

    if (!profile)
      return res.status(404).json({ success: false, message: "Please complete your profile first" });

    const ranked = colleges.map(college => {
      let score = 0;

      if (college.branch.toLowerCase() === profile.branch.toLowerCase()) score += 30;
      if (college.state.toLowerCase() === profile.state.toLowerCase()) score += 20;
      if (college.exams.some(e => e.toLowerCase() === profile.exam.toLowerCase())) score += 20;
      if (college.categories.some(c => c.toLowerCase() === profile.category.toLowerCase())) score += 10;
      if (college.fees <= Number(profile.budget)) score += 10;
      if (Number(profile.rank) <= college.closingRank) score += 10;

      return { ...college, match: Math.min(score, 100) };
    }).sort((a, b) => b.match - a.match || a.closingRank - b.closingRank);

    res.json({ success: true, profile, count: ranked.length, recommendations: ranked });
  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({ success: false, message: "Failed to generate recommendations" });
  }
};

module.exports = { getRecommendations };
