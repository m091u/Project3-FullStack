// src/components/Navbar.jsx

import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context";
// import logo from "../assets/logo.png";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="nav">
      <div className="nav-left ">
        <Link to="/">
          <button className="nav-button">readCycle</button>
        </Link>
        <Link to="/about">
          <button className="nav-button">About</button>
        </Link>
        {isLoggedIn && (
          <Link to="/library">
            <button className="nav-button">Explore Library</button>
          </Link>
        )}
      </div>
      
      <div className="nav-right">
        {isLoggedIn && (
          <>
            <Link to="/profile" className="userButton">
              <button className="nav-button">
                {/* <span>{user && user.name}</span> */} Profile
              </button>
            </Link>

            <button className="nav-button" onClick={logOutUser}>
              Logout
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <button className="nav-button">Sign Up</button>
            </Link>

            <Link to="/login">
              <button className="nav-button">Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
