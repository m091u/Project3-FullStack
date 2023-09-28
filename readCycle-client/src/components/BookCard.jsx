import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function BookCard ( { coverImage ,title, author, _id } ) {
  
  return (
    <div className="BookCard">
      <Link to={`/library/${_id}`}>
        <img src={coverImage} width="150px"/>
        <h3>{title}</h3>
      </Link>
      <h3>Author: {author}</h3>
      {/* <p style={{ maxWidth: "400px" }}>{description} </p> */}
    </div>
  );
}

export default BookCard;