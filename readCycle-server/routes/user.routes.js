const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

//render profile page  
router.get("/profile", (req, res) => {
  // Access user information
  const userId = req.payload._id;

  User.findById(userId)
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    })
    .catch((error) => {
      console.error("Error fetching works:", error);
      res.status(500).json({ message: "Server error" });
    });
});

//edit user profile

module.exports = router;
