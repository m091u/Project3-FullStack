import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

// when working on local version
// const API_URL = "http://localhost:4005";
// deployment
const API_URL="https://mern-book-sharing-app.onrender.com"

function BookDetailsPage(props) {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const { user, getToken } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const { bookId } = useParams();

  const handleEmailSent = () => {
    // let { bookTitle, ownerName, contactEmail, requester } = req.body;
    axios
      .post(
        `${API_URL}/api/email`,

        {
          data: {
            bookTitle: book.title,
            ownerName: book.offeredBy.name,
            contactEmail: book.offeredBy.email,
            requester: { email: user.email, name: user.name },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        setSuccess(
          <div className="confirmation-text">
            <span>
              <p>Email has been sent to owner.</p>
              <p>
                They will reach out to you soon to discuss the book exchange
                details.
              </p>
            </span>
          </div>
        );

        // Make an API request to update the book's 'booked' status to true
        axios
          .put(
            `${API_URL}/api/profile/edit/${bookId}`,
            {
              booked: true, // Update the 'booked' status to true
            },
            {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            }
          )
          .then((updateResponse) => {
            console.log("Update Response:", updateResponse); 
            // Update the 'book' state with the updated book data
            setBook({ ...book, booked: true });
          })
          .catch((updateError) => {
            console.error(updateError);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBook = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

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
                <strong>Book Owner: {book.offeredBy.name} </strong>
              </p>
              <p>
                <strong className="hidden">
                  Contact e-mail: {book.offeredBy.email}{" "}
                </strong>
              </p>
            </div>
          </>
        )}
      </div>
      <div className="bookButtons">
        <Link to="">
          <button onClick={() => handleEmailSent()}>Contact Book Owner</button>
        </Link>

        <Link to="/library">
          <button>Back to Library</button>
        </Link>
      </div>
      {success}
    </>
  );
}

export default BookDetailsPage;
