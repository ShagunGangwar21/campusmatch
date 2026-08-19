const Profile = require("../models/Profile");

const saveProfile = async (req, res) => {
  try {
    const { exam, rank, category, state, branch, budget } = req.body;

    if (!exam || rank === undefined || !category || !state || !branch || budget === undefined)
      return res.status(400).json({ success: false, message: "All fields are required" });

    if (!Number.isFinite(Number(rank)) || Number(rank) < 1)
      return res.status(400).json({ success: false, message: "Rank must be a positive number" });

    if (!Number.isFinite(Number(budget)) || Number(budget) < 0)
      return res.status(400).json({ success: false, message: "Budget must be a valid number" });

    const profile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      {
        userId: req.userId,
        exam: String(exam).trim(),
        rank: Number(rank),
        category: String(category).trim(),
        state: String(state).trim(),
        branch: String(branch).trim(),
        budget: Number(budget)
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, message: "Profile saved successfully", profile });
  } catch (error) {
    console.error("Save profile error:", error);
    res.status(500).json({ success: false, message: "Failed to save profile" });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });
    res.json({ success: true, profile });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ success: false, message: "Failed to get profile" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const deleted = await Profile.findOneAndDelete({ userId: req.userId });
    if (!deleted) return res.status(404).json({ success: false, message: "Profile not found" });
    res.json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Delete profile error:", error);
    res.status(500).json({ success: false, message: "Failed to delete profile" });
  }
};

module.exports = { saveProfile, getProfile, deleteProfile };
