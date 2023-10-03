const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "❕ Name is required."],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "❕ Email can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
  password: {
    type: String,
    required: [true, "❕ Password is required."],
    match: [
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
      "❕ Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    ],
  },
  avatar: {
    type: String,
    default: "/images/avatar1.png",
    // "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
  },
  booksOffered: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  booksReceived: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  location: {
    type: String,
    trim: true,
    enum: [
      "Charlottenburg-Wilmersdorf",
      "Friedrichshain-Kreuzberg",
      "Lichtenberg",
      "Marzahn-Hellersdorf",
      "Mitte",
      "Neukölln",
      "Pankow",
      "Reinickendorf",
      "Spandau",
      "Steglitz-Zehlendorf",
      "Tempelhof-Schöneberg",
      "Treptow-Köpenick",
    ],
  },
  booksOfferedScore: Number,
  booksReceivedScore: Number,
});

module.exports = model("User", userSchema);
