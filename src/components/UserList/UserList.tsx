import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserList.scss";

interface Users {
  id: number;
  username: string;
  name: string;
  email: string;
}

export const UserList: React.FC = () => {
  const initialUsers = [
    {
      id: 1,
      username: "user1",
      name: "User One",
      email: "user1@example.com",
    },
  ];
  const [users, setUsers] = useState<Users[]>(initialUsers);
  const [newUser, setNewUser] = useState({
    id: 4,
    username: "",
    name: "",
    email: "",
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer: number;
    document.title = `Count: ${count}`;

    // Clear the timer when the component unmounts
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [users, count]);

  const handleAddUser = () => {
    if (
      newUser.username.trim() !== "" &&
      newUser.name.trim() !== "" &&
      newUser.email.trim() !== ""
    ) {
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setNewUser({
        id: newUser.id + 1, // Increment the id for the next new user
        username: "",
        name: "",
        email: "",
      });
      alert(`New user "${newUser.username}" has been added.`);
    } else {
      alert("Please fill in all user details.");
    }
    setCount(count + 1)
  };

  return (
    <div className="users-container">
      <h2>Users</h2>

      <ul className="user-list">
        {users.map((user) => (
          <li className="user-list-item" key={user.id}>
            {/* Add a Link component with the user ID as a route parameter */}
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};
