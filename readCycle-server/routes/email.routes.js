// routes/email.js

// const express = require("express");
// const router = express.Router();
// const transporter = require("../services/emailService"); // Import the email transporter

// POST route to send an email
// router.post("/send-email", (req, res) => {
//   const { bookOwnerId, requesterName, requesterEmail, bookTitle } = req.body;
//   console.log(req.body);

  // const mailOptions = {
  //   from: "your-email@gmail.com", // Replace with your email
  //   to: "book-owner-email@example.com", // Replace with the book owner's email
  //   subject: "Book Request",
  //   text: `${requesterName} (${requesterEmail}) has requested your book: ${bookTitle}`,
  // };

  // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ message: "Failed to send email" });
//     } else {
//       console.log("Email sent:", info.response);
//       res.status(200).json({ message: "Email sent successfully" });
//     }
//   });
// });

// module.exports = router;
