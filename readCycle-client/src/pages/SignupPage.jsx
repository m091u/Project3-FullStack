// src/pages/SignupPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:4005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/library");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupOuter">
    <div className="Signup">
      <div className="SignupInner">
        <h2>readCycle</h2>
        <h3>Create a new account</h3>

        <form onSubmit={handleSignupSubmit}>
          <label></label>
          <input type="text" name="name" placeholder="Name" value={name} onChange={handleName} />
          <br />
          <label></label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />
          <br />
          <label></label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          <br />
          <button type="submit">Sign Up</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
    
        <h4>Already have account?</h4>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
    </div>
  );
}

export default SignupPage;
