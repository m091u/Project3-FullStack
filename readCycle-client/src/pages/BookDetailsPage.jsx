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
  console.log(user);
  const getBook = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers

    axios
      .get(`${API_URL}/api/library/${bookId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneBook = response.data;
        setBook(oneBook);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div className="BookDetails">
      {book && (
        <>
          <img src={book.coverImage} width="200px" />
          <h2>{book.title}</h2>
          <h2>{book.author}</h2>
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
          <p>
            <strong>Owner: </strong> {user.name}
          </p>
        </>
      )}

      <Link to="/library">
        <button>Back to Library</button>
      </Link>

      <Link to="">
        <button>Request Book</button>
      </Link>
    </div>
  );
}

export default BookDetailsPage;
