const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "❕ Title is required."],
  },
  author: {
    type: String,
    trim: true,
    required: [true, "❕ Author is required."],
  },
  genre: {
    type: String,
    required: [true, "❕ Genre is required."],
    enum: [
      "Art",
      "Biography",
      "Business",
      "Children's Books",
      "Cookbook",
      "Fantasy",
      "Fiction",
      "Mystery",
      "Non-Fiction",
      "Philosophy",
      "Psychology",
      "Romance",
      "Science",
      "Science Fiction",
      "Self-Help",
      "Thriller",
      "Travel",
    ],
  },
  description: String,
  language: String,
  coverImage: String,
  review: String,
  offeredBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  takenBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bookStatus: {
    type: String,
    enum: ["available", "pending", "shared"],
  },
  isDelivered: Boolean,
  booked: Boolean,
});

module.exports = model("Book", bookSchema);
