import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ height: "500px", backgroundColor: "#efefef" }}>
      <h1>Home</h1>

      <Link to="/dashboard">Dashboard</Link>
      <br />
      <Link to="/quiz">Quiz</Link>
    </div>
  );
};

export default Home;
