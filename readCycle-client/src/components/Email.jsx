import React, { useState } from "react";
import axios from "axios";

function EmailSender() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [requesterEmail, setRequesterEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    const emailData = {
      to: recipientEmail,
      cc: requesterEmail,
      subject: subject,
      text: message,
    };

    // Send the email using your server's API
    axios.post("/api/send-email", emailData)
      .then((response) => {
        console.log("Email sent successfully!", response.data);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div>
      <h2>Send Email</h2>
      <div>
        <label htmlFor="recipientEmail">Recipient Email:</label>
        <input
          type="email"
          id="recipientEmail"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
}

export default EmailSender;
