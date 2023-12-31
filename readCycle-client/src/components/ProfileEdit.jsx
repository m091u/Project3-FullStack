import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:4005";

function ProfileEdit(props) {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  // const [avatarFile, setAvatarFile] = useState(null); // New state for the avatar file

  const navigate = useNavigate();
  console.log(user._id);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    // get user details from the server and populate form fields
    axios
      .get(`${API_URL}/api/profile/user/edit/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setLocation(userData.location);
        setAvatar(userData.avatar);
      })
      .catch((error) => console.log(error));
  }, [user]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const avatar = e.target.avatar.files[0];
    console.log(avatar);
    // const reqBody = { name, email, location, avatar };
    // for (let key in reqBody) {
    //   if (!reqBody[key]) {
    //     delete reqBody[key];
    //   }
    // }
    // console.log(reqBody);
    // Create a FormData object to send the form data to the server
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("location", location);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    const storedToken = localStorage.getItem("authToken");
    // Send a PUT request to update the user
    axios
      .put(`${API_URL}/api/profile/user/edit/${user._id}`, formData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/profile");
      })
      .catch((error) => console.log(error));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      enctype="multipart/form-data"
      className="profileEdit"
    >
      <p className="editTitle">Update your profile</p>
      <div class="form-group">
        <label>Avatar:</label>
        <input
          type="file"
          name="avatar"
          // onChange={handleFileUpload}
          className="user-avatar"
        />
      </div>
      <br></br>
      <div class="form-group">
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <br></br>
      <div class="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br></br>
      <div class="form-group">
        <label>Location:</label>
        <select
          id="location"
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          <option value="Charlottenburg-Wilmersdorf">
            Charlottenburg-Wilmersdorf
          </option>
          <option value="Friedrichshain-Kreuzberg">
            Friedrichshain-Kreuzberg
          </option>
          <option value="Lichtenberg">Lichtenberg</option>
          <option value="Mitte">Mitte</option>
          <option value="Neukölln">Neukölln</option>
          <option value="Pankow">Pankow</option>
          <option value="Spandau">Spandau</option>
          <option value="Reinickendorf">Reinickendorf</option>
          <option value="Steglitz-Zehlendorf">Steglitz-Zehlendorf</option>
          <option value="Tempelhof-Schöneberg">Tempelhof-Schöneberg</option>
          <option value="Treptow-Köpenick">Treptow-Köpenick</option>
        </select>
      </div>
      <br></br>
      <button type="submit" className="form-button">
        Save Changes
      </button>
    </form>
  );
}

export default ProfileEdit;
