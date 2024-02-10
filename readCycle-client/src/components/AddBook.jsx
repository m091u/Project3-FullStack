import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// when working on local version
// const API_URL = "http://localhost:4005";
// deployment
const API_URL="https://mern-book-sharing-app.onrender.com"

function AddBook(props) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for mandatory fields
    if (!title || !author || !genre || !coverImage) {
      if (!title) setTitleError("Title is mandatory.");
      if (!author) setAuthorError("Author is mandatory.");
      if (!genre) setGenreError("Genre is mandatory.");
      if (!coverImage) setCoverImageError("Cover image url is mandatory.");
      return; // Don't proceed if mandatory fields are empty
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
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${API_URL}/api/library`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setTitle("");
        setAuthor("");
        setGenre("");
        setDescription("");
        setLanguage("");
        setCoverImage("");
        setReview("");
        navigate(-1);
      })
      .catch((error) => console.log(error));
  };

  const refreshBooks = () => {
    navigate(-1);
  };

  return (
    <div className="AddBookPage">
      <p className="addBookTitle">Add Your Dog-Eared Book</p>

      <form onSubmit={handleSubmit}>
        <label></label>
        <input
          type="text"
          name="title"
          placeholder="Book Title * "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="error-message">{titleError}</p>

        <label></label>
        <input
          type="text"
          name="author"
          placeholder="Author *"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <p className="error-message">{authorError}</p>

        <label></label>
        <input
          type="text"
          name="coverImage"
          placeholder="Cover Image url *"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />
        <p className="error-message">{coverImageError}</p>

        <label htmlFor="genre"></label>
        <select
          id="genre"
          type="text"
          name="genre"
          placeholder="Genre *"
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

        <label></label>
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <label></label>
        <textarea
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label></label>
        <textarea
          type="text"
          name="review"
          placeholder="Write your review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <br></br>

        <button className="form-button" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddBook;
