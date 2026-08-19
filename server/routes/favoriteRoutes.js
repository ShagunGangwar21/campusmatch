const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/favoriteController");

const router = express.Router();

router.get("/", authMiddleware, getFavorites);
router.post("/", authMiddleware, addFavorite);
router.delete("/:collegeId", authMiddleware, removeFavorite);

module.exports = router;
