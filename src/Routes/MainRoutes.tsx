import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {UserProfile} from "../components/UserProfile/UserProfile";
import {UserList} from "../components/UserList/UserList";
import { Home } from "../components/Home/Home";

export const MainRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:userId" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};
