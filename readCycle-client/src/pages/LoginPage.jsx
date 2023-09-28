// src/pages/LoginPage.jsx

import { useState, useContext } from "react"; // <== IMPORT useContext
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; // <== IMPORT

const API_URL =
  // when working on local version
  "http://localhost:4005";
// when working on deployment version
// link of backend deployment server?

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  /*  UPDATE - get authenticateUser from the context */
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        // Save the token in the localStorage.
        storeToken(response.data.authToken);

        // Verify the token by sending a request
        // to the server's JWT validation endpoint.
        authenticateUser();
        navigate("/library");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginOuter">
      <div className="Login">
        <div className="LoginInner">
        <h2>readCycle</h2>
          <h3>Login</h3>

          <form onSubmit={handleLoginSubmit}>
            <label></label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
            />

            <label></label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />

            <button type="submit">Login</button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <h4>Don't have an account yet?</h4>
          <Link to={"/signup"}> Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
