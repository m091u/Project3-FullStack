const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/Book.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//  GET  -  filter books by genre
router.get("/filter", (req, res, next) => {
  const { bookGenre } = req.query;
  Book.find({ genre: { $regex: new RegExp(bookGenre, "i") } })
    .then((foundBooks) => res.json(foundBooks))
    .catch((error) => next(error));
});

//  GET  -  Retrieves a specific book by id
router.get("/profile/edit/:bookId", (req, res, next) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Book.findById(bookId)
    .then((book) => {
      if (!book) {
        res.status(404).json({ message: "Book not found" });
        return;
      }

      // Send the book data as a response
      res.status(200).json(book);
    })
    .catch((error) => res.json(error));
});

// PUT - Update a specific book by ID
router.put("/profile/edit/:bookId", isAuthenticated, (req, res) => {
  const { bookId } = req.params;
  const { title, author, genre, description, language, coverImage, review } =
    req.body;

  // Validate bookId
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  // Update the book in the database
  Book.findByIdAndUpdate(
    bookId,
    {
      title,
      author,
      genre,
      description,
      language,
      coverImage,
      review,
    },
    { new: true } // Return the updated book
  )
    .then((updatedBook) => {
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      // Handle successful update and redirect to the user's profile page
      res.status(200).json(updatedBook);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    });
});

//Request a book
router.post('/requests', (req, res) => {
  const { bookId } = req.body;
  const requesterId = req.payload._id; 

  // Create a new request
  const request = new Request({
    book: bookId,
    requester: requesterId,
  });

  request
    .save()
    .then(() => {
      res.status(201).json({ message: 'Request sent successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    });
});

// DELETE  a book
router.delete("/profile/:bookId", isAuthenticated, (req, res) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Book.findByIdAndDelete(bookId)
    .then(() =>
      res.json({
        message: `Book with ${bookId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
