const College = require("../models/College");
const fallbackColleges = require("../data/colleges");

const getColleges = async (req, res) => {
  try {
    const { search, state, branch, type, exam, maxFees, sort } = req.query;

    let query = {};

    if (search) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { name: searchRegex },
        { shortName: searchRegex },
        { city: searchRegex },
        { state: searchRegex },
      ];
    }

    if (state && state !== "All") {
      query.state = new RegExp(state.trim(), "i");
    }

    if (type && type !== "All") {
      query.type = type;
    }

    if (branch && branch !== "All") {
      query.branches = new RegExp(branch.trim(), "i");
    }

    if (exam && exam !== "All") {
      query.exams = new RegExp(exam.trim(), "i");
    }

    if (maxFees) {
      query.fees = { $lte: Number(maxFees) };
    }

    let sortOption = { name: 1 };
    if (sort === "lowestFees") sortOption = { fees: 1 };
    if (sort === "highestFees") sortOption = { fees: -1 };
    if (sort === "bestRank") sortOption = { closingRank: 1 };

    let colleges = await College.find(query).sort(sortOption).lean();

    // If DB is empty, use fallback memory dataset
    if ((!colleges || colleges.length === 0) && Object.keys(query).length === 0) {
      colleges = fallbackColleges.map((c) => ({
        _id: String(c.id),
        ...c,
        branches: [c.branch || "CSE"],
        exams: c.exams || ["JEE Main"],
      }));
    }

    res.status(200).json({
      success: true,
      count: colleges.length,
      colleges,
    });
  } catch (error) {
    console.error("Get colleges error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch colleges",
    });
  }
};

const getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;

    let college = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      college = await College.findById(id).lean();
    }

    if (!college) {
      // Try finding by numeric id or shortName or fallback data
      college = await College.findOne({
        $or: [{ shortName: new RegExp(`^${id}$`, "i") }],
      }).lean();
    }

    if (!college) {
      const numericId = Number(id);
      const fallback = fallbackColleges.find((c) => c.id === numericId || c.shortName.toLowerCase() === id.toLowerCase());
      if (fallback) {
        college = {
          _id: String(fallback.id),
          ...fallback,
          branches: [fallback.branch || "CSE"],
          exams: fallback.exams || ["JEE Main"],
        };
      }
    }

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    res.status(200).json({
      success: true,
      college,
    });
  } catch (error) {
    console.error("Get college details error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch college details",
    });
  }
};

module.exports = {
  getColleges,
  getCollegeById,
};