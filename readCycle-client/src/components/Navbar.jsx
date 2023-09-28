// src/components/Navbar.jsx

import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  //  Update the rendering logic to display different content
  //  depending on whether the user is logged in or not

  return (
    <nav>
      <Link to="/">
        <button>readCycle📚</button>
      </Link>

      <Link to="/about">
        <button>About</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/library">
            <button>Library</button>
          </Link>

          <Link to="/profile">
            <button>User Profile</button>
          </Link>

          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
