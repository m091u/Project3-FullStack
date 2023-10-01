import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState();
  const [userOfferedBooks, setUserOfferedBooks] = useState([]);

  const API_URL = "http://localhost:4005";

  useEffect(() => {
    // Make a request to get user details from the backend
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("Response:", response.data);
        const userData = response.data;
        setUser(userData);

        // Filter the userOfferedBooks to only include books with the same user ID
        const userBooks = response.data.userOfferedBooks.filter(
          (book) => book.offeredBy._id === userData._id
        );
        setUserOfferedBooks(userBooks);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  return (
    <div>
      {user ? (
        <>
          <div>
            <img src={user.user.avatarUrl} width="200px" alt="avatar" />
            <p>
              <strong>{user.user.name}</strong>
            </p>
            <p>Reading challenge</p>
            <p>Choose how many books you will read this year</p>
            <p>Settings</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <div className="booksOffered">
        <p>Books Offered:</p>
        {user ? (
          <ul>
            {user.userOfferedBooks.map((book, index) => (
              <li key={index}>
                <img
                  src={book.coverImageUrl}
                  alt="book cover"
                  width="150"
                  height="150"
                />
                <div>
                  <strong>Title:</strong> {book.title}
                  <br />
                  <strong>Author:</strong> {book.author}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="booksReceived">
        <p>Books Received:</p>

      </div>
    </div>
  );
}

export default ProfilePage;
