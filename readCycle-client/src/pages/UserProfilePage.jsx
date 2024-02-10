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
  const [booksOfferedScore, setBooksOfferedScore] = useState(0);

  // const API_URL = "http://localhost:4005";
  // deployment
  const API_URL = "https://mern-book-sharing-app.onrender.com";
  const navigate = useNavigate();

  //gamify
  const getUserBadge = (booksOfferedScore) => {
    if (booksOfferedScore >= 0 && booksOfferedScore <= 5) {
      return "readCycle Novice";
    } else if (booksOfferedScore >= 6 && booksOfferedScore <= 10) {
      return "readCycle Rockstar";
    } else if (booksOfferedScore > 10) {
      return "readCycle Master";
    }
  };

  useEffect(() => {
    if (needsReloads) {
      // Make a request to get user details from the backend
      const storedToken = localStorage.getItem("authToken");

      axios
        .get(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
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
              <p className="challenge">Books Offered</p>
              <p className="books-count">
                <strong>{user.user.booksOfferedScore} Books</strong>
              </p>
              <p className="books-count">
                <strong>{getUserBadge(booksOfferedScore)}</strong>
              </p>
            </li>
            <li>
              <p className="challenge">Reading challenge</p>
              <button disabled>
                Choose how many books you will read this year
              </button>
            </li>
            <li className="challenge">
              <Link to="/add-book" className="add-button">
                Add Your Dog-Eared Book
              </Link>
            </li>
            <li className="challenge">
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
        {/* <div> */}
        <div>
          <h2>
            <strong>Books Offered</strong>
          </h2>
          <h3>
            <strong> Avaialble for sharing</strong>
          </h3>
          <div>
            {user ? (
              <div className="booksShared">
                {user.userOfferedBooks
                  .filter((book) => book.booked !== true)
                  .map((book, index) => (
                    <div className="bookShared">
                      <div key={index} className="profileBook">
                        <img
                          src={book.coverImage}
                          alt="book cover"
                          className="bookCover"
                        />{" "}
                        <br></br>
                        <strong>Title:</strong> {book.title} <br></br>
                        <strong>Author:</strong> {book.author} <br></br>
                        <div className="book-buttons">
                          <Link
                            to={`/edit/${book._id}`}
                            className="bookEditButton"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteBook(book._id)}
                            className="bookEditButton"
                          >
                            Delete
                          </button>
                        </div>
                      </div>{" "}
                      <br></br>
                    </div>
                  ))}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        {/* <hr></hr> */}
        <div>
          <h3>
            <strong>Pending Share Requests</strong>
          </h3>

          {user &&
          user.userOfferedBooks &&
          user.userOfferedBooks.filter((book) => book.booked === true).length >
            0 ? (
            <div className="booksShared">
              {user.userOfferedBooks
                .filter((book) => book.booked === true)
                .map((book, index) => (
                  <div className="bookShared" key={index}>
                    <div className="profileBook">
                      <img
                        src={book.coverImage}
                        alt="book cover"
                        width="180"
                        className="bookCover"
                      />
                      <br />
                      <strong>Title:</strong> {book.title}
                      <br />
                      <strong>Author:</strong> {book.author}
                      <br />
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="bookEditButton"
                      >
                        Delete
                      </button>
                    </div>
                    <br />
                  </div>
                ))}
            </div>
          ) : (
            <p style={{ margin: "5px" }}>No request yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
