const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { saveProfile, getProfile, deleteProfile } = require("../controllers/profileController");

const router = express.Router();

router.post("/", authMiddleware, saveProfile);
router.get("/", authMiddleware, getProfile);
router.delete("/", authMiddleware, deleteProfile);

module.exports = router;
