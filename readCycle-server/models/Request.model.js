const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const requestSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book', // Reference to the Book model
    required: true,
  },
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});


module.exports = model("Request", requestSchema);
