import React from "react";
import { Link } from "react-router-dom";
import "./UserList.scss";

const users = [
  { id: 1, username: "user1", name: "User One", email: "user1@example.com" },
  { id: 2, username: "user2", name: "User Two", email: "user2@example.com" },
  { id: 3, username: "user3", name: "User Three", email: "user3@example.com" },
];

export const UserList: React.FC = () => {
  

  return (
    <div className="users-container">
      <h2>Users</h2>
     
      <ul className="user-list">
        {users.map((user) => (
          <li className="user-list-item" key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
