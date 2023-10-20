const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");
require("dotenv").config();

const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

const sendVerificationEmail = (
  { bookTitle, ownerName, contactEmail, email, name },
  res
) => {
  // When working on local version
  const baseUrl = "http://localhost:4005";
  // When working on deployment version
  // ??

  // mail options !! no need token !
  const mailOptions = {
    from: {
      name: "readCycle", // Customize the sender's name here
      address: "readCycle@gmail.com", // Customize the sender's email address here
    },
    to: contactEmail,
    subject: "readCycle Book request",
    html: `<html>
    <head>
      <!-- Add inline CSS for styling -->
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
        }
        strong {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Hello <strong>${ownerName}</strong>,</h1>
        <p>You are receiving this email regarding a book you posted on readCycle!</p>
        <h4>Book Details:</h4>
        <p><strong>${bookTitle}</strong></p>
        <p>One of our community members is interested in the book.<br/> Could you please reach out to them and decide on how the book exchange will take place?</p>
        <h4>Requester Information:</h4>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p>Once the book is handed over, we advise you to remove it from your library to avoid further requests.</p>
        <p>Thank you!</p>
        <p>The readCycle Team</p>
      </div>
    </body>
  </html>
    `,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      res.json({
        status: "PENDING",
        message: "Contact email sent",
      });
    })
    .catch(() => {
      res.json({
        status: "FAILED",
        message: "Contact email failed!",
      });
    })
    .catch(() => {
      res.json({
        status: "FAILED 2",
        message: "Couldn't save contact detail data!",
      });
    });
};

router.get("/email", (req, res) => {
  res.send("Email route get request is working!Email is Work In Progress...");
});

router.post("/email", isAuthenticated, (req, res) => {
  let { bookTitle, ownerName, contactEmail, requester } = req.body.data;

  console.log(bookTitle, ownerName, contactEmail, requester);
  const { email, name } = requester;
  const userId = req.payload._id;

  sendVerificationEmail(
    { bookTitle, ownerName, contactEmail, email, name },
    res
  );
});

module.exports = router;
