const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USERNAME, 
    pass: process.env.SMTP_PASSWORD,
  },
});

const mailOptions = {
  from: "readCycle@gmail.com",
  to: "reciever@gmail.com", //add owner mail
  subject: "readCycle Book Request",
  text: "Email content",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
    // do something useful
  }
});
