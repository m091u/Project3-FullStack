const express = require("express");
const router = express();
const User = require("../models/User.model");
const Book = require("../models/Book.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const cloudinary = require("cloudinary").v2;

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

//render profile page
router.get("/profile", isAuthenticated, (req, res) => {
  // Access user information
  const userId = req.payload._id;

  // Use Promise.all to fetch user and books data simultaneously
  Promise.all([User.findById(userId), Book.find({ offeredBy: userId })])
    .then(([user, userOfferedBooks]) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user, userOfferedBooks });
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
      res.status(500).json({ message: "Server error" });
    });
});

//  GET /api/books -  Retrieves all of the books
router.get("/profile", (req, res, next) => {
  Book.find()
    .populate("offeredBy")
    .then((allBooks) => res.json(allBooks))
    .catch((err) => res.json(err));
});

// Edit user profile
router.get("/profile/user/edit/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  console.log(id);
  User.findById(id).then((foundUser) => {
    if (foundUser) {
      const sentUser = foundUser._doc;
      delete sentUser.password;
      res.status(200).json(sentUser);
    } else {
      res.status(404).json({ error: "user not found" });
    }
  });
});

router.put(
  "/profile/user/edit/:id",
  isAuthenticated,
  fileUploader.single("avatar"),
  (req, res) => {
    // Get the user's ID from the authenticated token
    const { id } = req.params;
    console.log(id, req.body);

    // Extract updated user profile data from the request body
    const { name, email, avatar, location } = req.body;
    const body = { name, email, location };

    console.log(req.file);
    if (req.file) {
      body.avatar = req.file.path;
    }

    // Find the user by their ID and update their profile data
    User.findByIdAndUpdate(
      id,
      body,
      { new: true } // This option returns the updated user object
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Server error" });
      });
  }
);

module.exports = router;
