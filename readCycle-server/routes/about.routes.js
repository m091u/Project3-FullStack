const express = require("express");
const router = express.Router();
//render page
router.get("/about", (req, res) => {
  res.json("about");
});

module.exports = router;
