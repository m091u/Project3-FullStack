import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileEdit from "../components/ProfileEdit";
import BookEdit from "../components/BookEdit";

function ProfilePage() {
  const [user, setUser] = useState();
  const [userOfferedBooks, setUserOfferedBooks] = useState([]);
  const { bookId } = useParams();
  const [needsReloads, setNeedsReloads] = useState(true);

  const API_URL = "http://localhost:4005";
  const navigate = useNavigate();

  useEffect(() => {
    if (needsReloads) {
      // Make a request to get user details from the backend
      const storedToken = localStorage.getItem("authToken");

      axios
        .get(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // console.log("Response:", response.data);
          const userData = response.data;
          setUser(userData);

          // Filter the userOfferedBooks to only include books with the same user ID
          const userBooks = response.data.userOfferedBooks.filter(
            (book) => book.offeredBy._id === userData._id
          );
          setUserOfferedBooks(userBooks);
          setNeedsReloads(false);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [needsReloads]);

  const handleDeleteBook = (bookId) => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .delete(`${API_URL}/api/profile/${bookId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setNeedsReloads(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile-container">
      {user ? (
        <div className="user-details">
          <div className="user-avatar">
            <img
              className="userAvatar"
              src={user.user.avatar}
              width="200px"
              alt="avatar"
            />
            <p className="userName">
              <strong>{user.user.name}</strong>
            </p>
          </div>

          <ul className="profile-list">
            <li>
              <p className="challenge">Reading challenge</p>
              <p>Choose how many books you will read this year</p>
            </li>
            <li>
              <Link to="/add-book" className="add-button">
                Add Your Dog-Eared Book
              </Link>
            </li>
            <li>
              <Link to="/profile/edit" className="edit-button">
                Settings
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div className="book-details">
        <div className="booksOffered">
          <p>
            <strong>Books Offered</strong>
          </p>
          <p>Avaialble for sharing</p>
          {user ? (
            <ul className="booksShared">
              {user.userOfferedBooks.map((book, index) => (
                <li key={index} className="profileBooks">
                  <img src={book.coverImage} alt="book cover" width="190" />
                  <div>
                    <strong>Title:</strong> {book.title}
                    <br />
                    <strong>Author:</strong> {book.author}
                    <br />
                    <Link to={`/edit/${book._id}`} className="bookEditButton">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      className="bookEditButton"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
          <p>Requests Pending</p>
        </div>

        <div className="booksReceived">
          <p>
            <strong>Books Received</strong>
          </p>
          <p>Already received</p>
          <p>Pending requests</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
