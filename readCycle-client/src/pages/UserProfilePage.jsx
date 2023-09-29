import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Make a request to get user details from the backend
    axios
      .get("/api/profile") // Update with the correct endpoint
      .then((response) => {
        const userData = response.data;
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Placeholder for profile details</h2>
      {/* <img src={user.avatarUrl} width="200px" /> */}
      <h2>{user.name}</h2>
      <h2>{user.booksOffered}</h2>
      <h2>{user.booksReceived}</h2>
    </div>
  );
}

export default ProfilePage;
