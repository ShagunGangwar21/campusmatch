const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
  exam: { type: String, required: true, trim: true },
  rank: { type: Number, required: true, min: 1 },
  category: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  branch: { type: String, required: true, trim: true },
  budget: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
