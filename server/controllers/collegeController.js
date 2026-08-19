const Profile = require("../models/Profile");
const colleges = require("../data/colleges");

const getRecommendedColleges = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.userId,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const studentRank = Number(profile.rank);
    const studentBudget = Number(profile.budget);

    const recommended = colleges
      .map((college) => {
        let score = 0;

        // Rank match
        if (studentRank <= college.closingRank) {
          score += 50;
        } else {
          const difference =
            studentRank - college.closingRank;

          if (difference <= 10000) {
            score += 35;
          } else if (difference <= 20000) {
            score += 20;
          }
        }

        // Branch match
        if (
          college.branch
            .toLowerCase()
            .includes(profile.branch.toLowerCase())
        ) {
          score += 25;
        }

        // Budget match
        if (college.fees <= studentBudget) {
          score += 20;
        }

        // State preference
        if (
          college.state.toLowerCase() ===
          profile.state.toLowerCase()
        ) {
          score += 5;
        }

        return {
          ...college,
          match: Math.min(score, 100),
        };
      })
      .filter((college) => college.match >= 40)
      .sort((a, b) => b.match - a.match);

    res.status(200).json({
      success: true,
      profile,
      count: recommended.length,
      colleges: recommended,
    });
  } catch (error) {
    console.error("Recommendation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate recommendations",
    });
  }
};

module.exports = {
  getRecommendedColleges,
};