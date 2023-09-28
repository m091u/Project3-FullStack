import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddBook from "../components/AddBook";
import BookCard from "../components/BookCard";

const API_URL = "http://localhost:4005";

function LibraryPage() {
  const [books, setBooks] = useState([]);

  const getAllBooks = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers

    axios
      .get(`${API_URL}/api/library`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setBooks(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="LibraryPage">
      <div className="libraryHeader">
        <h1>Library Page</h1>
        <p>Our books are waiting for you to provide them with a new home.</p>
      </div>

      <Link to="/add-book">Add Your Dog-Eared Book</Link>
      <h2>Available books</h2>
      <div className="">
        <div className="booksContainer">
          {books.map((book) => (
            <BookCard key={book._id} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LibraryPage;
