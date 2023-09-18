// src/components/UserList.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import "./UserList.scss";
import axios from "axios";
interface User {
  id: number;
  username: string;
  name: string;
  email: string;
}

// const fetchUsers = async (page: number) => {
//   const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`);
//   if (!response.ok) {
//     throw new Error("Unable to fetch users.");
//   }
//   return response.json();
// };

const fetchUsers = async (page: number) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=5`
    );
    
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch users.");
  }
};

export const UserList: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const {
    data: fetchedUsers,
    isLoading,
    isError,
  } = useQuery<User[]>(
    ["users", page], // Use page number as part of the query key
    () => fetchUsers(page), // query function
    {
      keepPreviousData: true, // Keep previous data while fetching new data
    }
  );

  const [newUser, setNewUser] = React.useState<User>({
    id: 0,
    username: "",
    name: "",
    email: "",
  });

  const addUserMutation = useMutation(async (newUser: User) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to add user.");
      }

      await queryClient.invalidateQueries(["users", page]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  });

  const handleAddUser = () => {
    if (
      newUser.username.trim() !== "" &&
      newUser.name.trim() !== "" &&
      newUser.email.trim() !== ""
    ) {
      addUserMutation.mutate(newUser);
      setNewUser({
        id: newUser.id + 1, // Increment the id for the next new user
        username: "",
        name: "",
        email: "",
      });
      setCount(count + 1);
      alert(`New user "${newUser.username}" has been added.`);
    } else {
      alert("Please fill in all user details.");
    }
  };

  const handleUserClick = (user: User) => {
    // Navigate to the user profile page with the user's data as a route parameter
    navigate(`/users/${user.id}`, { state: { user } });
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    let timer: number;
    document.title = `Count: ${count}`;

    // Clear the timer when the component unmounts
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [count]);
  useEffect(() => {
    document.title = `User List - Page ${page}`;
  }, [page]);

  return (
    <div className="users-container">
      <h2>Users</h2>
      {/* Display loading indicator while fetching data */}
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error fetching data</div>
      ) : (
        <>
          <ul className="user-list">
            {fetchedUsers?.map((user: User) => (
              <li
                className="user-list-item"
                key={user.id}
                onClick={() => handleUserClick(user)}
              >
                {/* Add a Link component with the user ID as a route parameter */}
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page}</span>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </>
      )}

      <div className="new-user">
        <form>
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
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
        </form>
      </div>
    </div>
  );
};
