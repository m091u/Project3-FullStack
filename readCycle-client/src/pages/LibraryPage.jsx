import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import BookCard from "../components/BookCard";

const API_URL = "http://localhost:4005";

function LibraryPage() {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);
  const [filteredBooks, setFilteredBooks] = useState([]); // Store the initial list of books
  const [selectedGenre, setSelectedGenre] = useState([]);

  const getAllBooks = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers

    axios
      .get(`${API_URL}/api/library`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Filter out the books owned by the logged-in user
        const filteredBooks = response.data.filter((book) => {
          console.log("Book:", book, user);
          return book.offeredBy._id !== user._id;
        });

        setBooks(filteredBooks);
      })
      .catch((error) => console.log(error));
  };

  //filter by category
  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    setSelectedGenre([selectedGenre]);

    if (selectedGenre === "") {
      setBooks(filteredBooks); // Restore the initial list of books
    } else {
      const filteredGenre = filteredBooks.filter(
        (book) => book.genre === selectedGenre
      );
      setBooks(filteredGenre);
    }
  };

  // We set this effect will run only once, after the initial render
  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <>
      <div className="libraryHeader">
        <div className="headerText">
          <h3>Explore the library</h3>
          <p>Our books are ready for a thrilling new chapter with you!</p>
        </div>
      </div>

      <div className="libraryPage">
        <Link to="/add-book" className="link-button">
          Add Your Dog-Eared Book
        </Link>

        <select
          className="genre-select"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">All Genre</option>
          <option value="Art">Art</option>
          <option value="Biography">Biography</option>
          <option value="Business">Business</option>
          <option value="Children's Books">Children's Literature</option>
          <option value="Cookbook">Cookbook</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Fiction">Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Philosophy">Philosophy</option>
          <option value="Psychology">Psychology</option>
          <option value="Romance">Romance</option>
          <option value="Science">Science</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Self Help">Self-Help</option>
          <option value="Thriller">Thriller</option>
          <option value="Travel">Travel</option>
        </select>

        <div className="booksContainer">
          {books.map((book) => (
            <div className="bookContainer" key={book._id}>
              <BookCard {...book} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LibraryPage;
