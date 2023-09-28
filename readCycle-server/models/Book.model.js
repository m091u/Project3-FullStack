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
      "Fiction",
      "Non-Fiction",
      "Mystery",
      "Science Fiction",
      "Fantasy",
      "Romance",
      "Thriller",
      "Biography",
      "Self-Help",
      "Philosophy",
      "Travel",
      "Science",
      "Business",
      "Adventure",
      "Children's Literature",
      "Autobiography",
      "Cookbook",
    ],
  },
  description: String,
  language: String,
  coverImage: String,
  review: String,
  offeredBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  takenBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isDelivered: Boolean,
  booked: Boolean,
});

module.exports = model("Book", bookSchema);
