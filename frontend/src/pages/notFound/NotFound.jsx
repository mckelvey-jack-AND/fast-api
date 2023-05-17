import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <p style={{ fontSize: "96px" }}>404_</p>
      <h2>You are beyond the borders!</h2>
      <button>
        <Link to="/">Go back to the main page</Link>
      </button>
    </div>
  );
};

export default NotFound;