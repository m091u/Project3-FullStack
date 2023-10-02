// EditProfileForm.js
import React, { useState } from "react";
import axios from "axios";

function ProfileEdit({ user, onUpdate }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    location: user?.location || "",
  });

  const API_URL = "http://localhost:4005";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("avatar", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to update the user's profile
    axios
      .post(`${API_URL}/api/profile/edit`, formData)
      .then((response) => {
        console.log("Response from server:", response.data);
        onUpdate(response.data); // Update the user data in the parent component
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="profileEdit">
      <h3>Update your profile</h3>
      <label>
        Avatar:
        <input
          type="file"
          name="avatar"
          value={formData.avatar}
          onChange={handleFileUpload}
        />
      </label>
      <br></br>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <br></br>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <br></br>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </label>
      <br></br>
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default ProfileEdit;
