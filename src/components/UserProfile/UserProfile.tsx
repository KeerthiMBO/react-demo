// src/UserProfile.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserProfile.scss"; // Import the SCSS file

export const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    // Handle the case when userId is undefined
    return <div>User not found</div>;
  }

  // Mock user data (replace with actual data)
  const user = {
    id: userId,
    name: "User " + userId,
    email: "user" + userId + "@example.com",
    // Add more user details as needed
  };

  const handleGoBack = () => {
    navigate("/users"); // Navigate back to the Users page
  };
  return (
    <div className="user-profile-container">
      <h2 className="user-name">{user.name}</h2>
      <div className="user-profile">
        <div className="user-info">
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <div className="user-profile-image-container">
          <img
            className="user-profile-image"
            src="https://picsum.photos/200"
            alt="User profile"
          />
        </div>
      </div>
      <button className="back-button" onClick={handleGoBack}>
        Back
      </button>
    </div>
  );
};
