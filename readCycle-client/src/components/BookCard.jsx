import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function BookCard ( { coverImage ,title, author, _id } ) {
  
  return (
    <div className="BookCard">
      <Link to={`/library/${_id}`}>
        <img src={coverImage} width="190px" className="bookCover"/>
        <p><strong>{title}</strong></p>
      </Link>
      <p><strong>Author:</strong> {author}</p>
    </div>
  );
}

export default BookCard;