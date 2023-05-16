import React from "react";
import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <nav
          style={{
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          <Link to="/">LOGO</Link>
        </nav>
        <hr />
      </header>
      <Outlet />

      <footer>
        <hr />
        <p>© 2023</p>
        <p>
          Created by <a href="">@and digital</a>
        </p>
      </footer>
    </>
  );
}

export default App;
