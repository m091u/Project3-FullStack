const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Book = require("../models/Book.model");

//POST/api/books - create new book
router.post("/library", (req, res) => {
  const { title, author, genre, description, language, coverImage, review } =
    req.body;

  // Extract user ID from the decoded JWT token
  const userId = req.payload._id;

  Book.create({
    title,
    author,
    genre,
    description,
    language,
    coverImage,
    review,
    offeredBy: userId,
    takenBy: null,
    isDelivered: false,
    booked: false,
  })
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//  GET /api/books -  Retrieves all of the books
router.get("/library", (req, res, next) => {
  Book.find()
    .populate("offeredBy")
    .then((allBooks) => res.json(allBooks))
    .catch((err) => res.json(err));
});

//  GET /api/books/:bookId -  Retrieves a specific book by id
router.get("/library/:bookId", (req, res, next) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Book.findById(bookId)
    .populate("offeredBy")
    .then((book) => {
      if (!book) {
        res.status(404).json({ message: "Book not found" });
        return;
      }

      // Log the book data here
      console.log("Book Data:", book);

      // Send the book data as a response
      res.status(200).json(book);
    })
    .catch((error) => res.json(error));
});

module.exports = router;
