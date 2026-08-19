const express = require("express");
const { getDeadlines } = require("../controllers/deadlineController");

const router = express.Router();

router.get("/", getDeadlines);

module.exports = router;
