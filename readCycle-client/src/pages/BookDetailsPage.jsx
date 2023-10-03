import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:4005";

function BookDetailsPage(props) {
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const { bookId } = useParams();

  const getBook = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/library/${bookId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneBook = response.data;
        console.log("Book Data from Server:", oneBook);
        setBook(oneBook);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getBook();
  }, []);

  const handleRequestBook = () => {
    const storedToken = localStorage.getItem("authToken");
    // Send a request to the server to request the book
    axios
      .post(
        `${API_URL}/api/requests`,
        { bookId }, // This is the request body
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then(() => {
        // Handle success, e.g., show a confirmation message
        alert("Request sent successfully");
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error("Error requesting the book:", error);
        alert("Failed to send request");
      });
  };

  return (
    <>
      <div className="bookDetails">
        {book && (
          <>
            <div className="bookDetailCover">
              <img
                src={book.coverImage}
                width="220px"
                className="rounded-image"
              />
            </div>
            <div className="bookInfo">
              <h2>{book.title}</h2>
              <p>
                by <strong>{book.author}</strong>
              </p>
              <p>
                <strong>Genre: </strong>
                {book.genre}
              </p>
              <p>
                <strong>Description: </strong> {book.description}
              </p>
              <p>
                <strong>Language: </strong> {book.language}
              </p>
              <p>
                <strong>Owner review: </strong> {book.review}
              </p>
              <p className="bookOwner">
                <strong>Book Owner: </strong>
                <a href={`/profile/`}>{book.offeredBy.name}</a>
              </p>
            </div>
          </>
        )}
      </div>
      <div className="bookButtons">
        <Link to="/library">
          <button>Back to Library</button>
        </Link>

        <Link to="">
          <button onClick={handleRequestBook}>Request Book</button>
        </Link>
      </div>
    </>
  );
}

export default BookDetailsPage;
