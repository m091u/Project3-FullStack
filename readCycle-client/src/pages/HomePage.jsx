import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function HomePage() {
  return (
    <div className="homePage">
      <div className="homeContainer">
        <div className="logo-and-text">
          <h1>
            readCycle
            <img src={logo} alt="logo" style={{ width: "100px" }} />
          </h1>
        </div>

        <p>
          <strong>
            Pass the Joy of Reading On <br></br>Your Hub for Book Swaps and
            Shared Adventures.
          </strong>
        </p>

        <Link to="/signup">
          <button>Join the community</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
