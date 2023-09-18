import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserProfile.scss";

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
}

export const UserProfile: React.FC = () => {
  const navigate = useNavigate();

  // Retrieve the user data from the route parameters
  const user = useLocation().state?.user as User;

  if (!user) {
    // Handle the case when user data is loading or not found
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate("/users"); // Navigate back to the Users page
  };

  return (
    <div className="user-profile-container">
      <h2 className="user-name">{user.username}</h2>
      <div className="user-profile">
        <div className="user-profile-image-container">
          <img
            className="user-profile-image"
            src="https://picsum.photos/200/200"
            alt="User profile"
          />
        </div>
        <div className="user-info">
          <p>
            <strong>User:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
      <button className="back-button" onClick={handleGoBack}>
        Back
      </button>
    </div>
  );
};
