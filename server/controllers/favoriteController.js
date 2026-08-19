const Favorite = require("../models/Favorite");
const College = require("../models/College");
const fallbackColleges = require("../data/colleges");

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.userId }).populate("collegeId").lean();

    const colleges = favorites
      .map((f) => f.collegeId)
      .filter(Boolean)
      .map((c) => ({
        ...c,
        id: String(c._id),
      }));

    res.json({
      success: true,
      count: colleges.length,
      favorites: colleges,
      colleges,
    });
  } catch (error) {
    console.error("Get favorites error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch saved colleges" });
  }
};

const addFavorite = async (req, res) => {
  try {
    const { collegeId } = req.body;

    if (!collegeId) {
      return res.status(400).json({ success: false, message: "College ID is required" });
    }

    let college = null;
    if (collegeId.match(/^[0-9a-fA-F]{24}$/)) {
      college = await College.findById(collegeId);
    }

    if (!college) {
      // Create college document from fallback if missing
      const numericId = Number(collegeId);
      const fallback = fallbackColleges.find((c) => c.id === numericId);
      if (fallback) {
        college = await College.create({
          name: fallback.name,
          shortName: fallback.shortName,
          type: fallback.type || "Government",
          location: fallback.location,
          city: fallback.city || "Ghaziabad",
          state: fallback.state || "Uttar Pradesh",
          courses: ["B.Tech"],
          branches: [fallback.branch || "CSE"],
          exams: fallback.exams || ["JEE Main"],
          categories: fallback.categories || ["General"],
          fees: fallback.fees || 150000,
          feesDisplay: fallback.feesDisplay || "₹1.50 Lakh/year",
          closingRank: fallback.closingRank || 100000,
        });
      }
    }

    if (!college) {
      return res.status(404).json({ success: false, message: "College not found" });
    }

    const favorite = await Favorite.findOneAndUpdate(
      { userId: req.userId, collegeId: college._id },
      { userId: req.userId, collegeId: college._id },
      { upsert: true, new: true }
    );

    res.status(201).json({
      success: true,
      message: "College saved to favorites",
      favorite,
    });
  } catch (error) {
    console.error("Add favorite error:", error);
    res.status(500).json({ success: false, message: "Failed to save college" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { collegeId } = req.params;

    let targetCollegeId = collegeId;
    if (!collegeId.match(/^[0-9a-fA-F]{24}$/)) {
      const numericId = Number(collegeId);
      const found = await College.findOne({
        $or: [{ name: new RegExp(collegeId, "i") }],
      });
      if (found) targetCollegeId = found._id;
    }

    await Favorite.findOneAndDelete({
      userId: req.userId,
      collegeId: targetCollegeId,
    });

    res.json({
      success: true,
      message: "College removed from favorites",
    });
  } catch (error) {
    console.error("Remove favorite error:", error);
    res.status(500).json({ success: false, message: "Failed to remove favorite" });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
