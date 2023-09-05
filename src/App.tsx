import React from "react";
import "./App.scss";
import { MainRoutes } from "./Routes/MainRoutes";

const App = () => {
  return (
    <div className="app">
      <header className="navbar">
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/users">Users</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <MainRoutes />
      </main>
    </div>
  );
};

export default App;
