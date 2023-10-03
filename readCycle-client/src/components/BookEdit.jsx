import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:4005";

function BookEdit(props) {
  const { bookId } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [review, setReview] = useState("");

  // State variables for error messages
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [coverImageError, setCoverImageError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    // get book details by bookId from the server and populate form fields
    axios
      .get(`${API_URL}/api/profile/edit/${bookId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const bookData = response.data;
        setTitle(bookData.title);
        setAuthor(bookData.author);
        setGenre(bookData.genre);
        setDescription(bookData.description);
        setLanguage(bookData.language);
        setCoverImage(bookData.coverImage);
        setReview(bookData.review);
      })
      .catch((error) => console.error(error));
  }, [bookId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation for mandatory fields
    if (!title || !author || !genre || !coverImage) {
      if (!title) setTitleError("Title is mandatory.");
      if (!author) setAuthorError("Author is mandatory.");
      if (!genre) setGenreError("Genre is mandatory.");
      if (!coverImage) setCoverImageError("Cover image url is mandatory.");
      return;
    }

    const requestBody = {
      title,
      author,
      genre,
      description,
      language,
      coverImage,
      review,
    };

    const storedToken = localStorage.getItem("authToken");

    // Send a PUT request to update the book
    axios
      .put(`${API_URL}/api/profile/edit/${bookId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/profile");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bookEditPage">
      <p className="editBookTitle">Edit Book</p>

      <form onSubmit={handleFormSubmit}>
        <div class="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="error-message">{titleError}</p>
        </div>
        <div class="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <p className="error-message">{authorError}</p>
        </div>

        <div class="form-group">
          <label>Cover image url: </label>
          <input
            type="text"
            name="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />
          <p className="error-message">{coverImageError}</p>
        </div>
        <div class="form-group">
          <label htmlFor="genre">Genre: </label>
          <select
            id="genreEdit"
            type="text"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Select Genre *</option>
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
          <p className="error-message">{genreError}</p>
        </div>

        <div class="form-group">
          <label>Language: </label>
          <input
            type="text"
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label>Description:</label>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label>Owner review: </label>
          <textarea
            type="text"
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default BookEdit;
