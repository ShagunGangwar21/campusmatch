require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const collegeRoutes = require("./routes/collegeRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const deadlineRoutes = require("./routes/deadlineRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ success: true, message: "CampusMatch API is running" });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/deadlines", deadlineRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is missing in .env");
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
