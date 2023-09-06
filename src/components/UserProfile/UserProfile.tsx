import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserProfile.scss";

export const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<any>(null); // Initialize user state

  useEffect(() => {
    // Fetch user data based on userId (you may replace this with your actual data fetching logic)
    const fetchUserData = async () => {
      try {
        // Simulated user data (replace with actual data fetching)
        const userData = {
          id: userId,
          username: `user${userId}`,
          name: `User ${userId}`,
          email: `user${userId}@example.com`,
        };

        setUser(userData); // Set user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]); // Fetch data whenever userId changes

  if (!user) {
    // Handle the case when user data is loading or not found
    return <div>Loading...</div>;
  }

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
