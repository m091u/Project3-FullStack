import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homeContainer">
      <h1>readCycle📚</h1>
      <h2>
        Pass the Joy of Reading On <br></br>Your Hub for Book Swaps and Shared
        Adventures.
      </h2>

      <Link to="/signup">
        <button>Join the community</button>
      </Link>
    </div>
  );
}

export default HomePage;
