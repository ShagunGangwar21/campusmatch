const express = require("express");
const colleges = require("../data/colleges");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: colleges.length,
    colleges,
  });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const college = colleges.find(
    (college) => college.id === id
  );

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
});

module.exports = router;