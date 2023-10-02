const express = require("express");
const router = express();
const User = require("../models/User.model");
const Book = require("../models/Book.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

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

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("avatar"), (req, res, next) => {
  // console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});

// Edit user profile
router.post("/profile/edit", isAuthenticated, (req, res) => {
  // Get the user's ID from the authenticated token
  const userId = req.payload._id;

  // Extract updated user profile data from the request body
  const { name, email, avatar, location } = req.body;

  // Find the user by their ID and update their profile data
  User.findByIdAndUpdate(
    userId,
    { name, email, avatar, location },
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
});

module.exports = router;
