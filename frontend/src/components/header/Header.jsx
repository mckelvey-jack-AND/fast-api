import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
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
  );
};

export default Header;
