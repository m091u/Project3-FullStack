const express = require("express");
const router = require("express").Router();
const mongoose = require("mongoose");

const Book = require("../models/Book.model");

const {isAuthenticated} = require("../middleware/jwt.middleware");

//POST/api/books - create new book
router.post("/library", isAuthenticated, (req, res) => {
  const { title, author, genre, description, language, coverImage, review } =
    req.body;

    const offeredBy = req.payload.id; 

  Book.create({
    title,
    author,
    genre,
    description,
    language,
    coverImage,
    review,
    offeredBy,
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/books -  Retrieves all of the books
router.get("/library", (req, res, next) => {
  Book.find()
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
    .then((book) => res.status(200).json(book))
    .catch((error) => res.json(error));
});


module.exports = router;
