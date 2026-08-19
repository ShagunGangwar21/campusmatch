const mongoose = require("mongoose");

const deadlineSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: ["Exam", "Application", "Counselling", "Seat Allotment", "Reporting"], required: true },
    exam: { type: String, default: "JEE Main" },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    status: { type: String, enum: ["Upcoming", "Ongoing", "Extended", "Closed"], default: "Upcoming" },
    description: { type: String, default: "" },
    officialUrl: { type: String, required: true },
    sourceName: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deadline", deadlineSchema);
