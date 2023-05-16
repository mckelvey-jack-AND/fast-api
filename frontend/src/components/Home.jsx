import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ height: "500px", backgroundColor: "#efefef" }}>
      <h1>Home</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sint
        nihil quidem obcaecati excepturi alias at, tenetur quia magni cupiditate
        saepe, ipsa voluptatum labore. Quo assumenda vel iure rerum doloribus.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam porro
        nostrum mollitia architecto consequatur magni provident quidem dolor
        odio atque, nemo explicabo perferendis. Alias atque modi perspiciatis
        reprehenderit quia natus obcaecati quas. Quaerat quas quis facilis,
        corporis soluta officiis molestias nemo eius veritatis minima aperiam
        illum provident hic? Itaque expedita magni quas optio aperiam nam esse,
        dignissimos ad quo possimus quia sint nisi nostrum, ex impedit nesciunt
        neque rem. Explicabo rerum unde aut perspiciatis reprehenderit
        laboriosam sit! Earum sequi harum et, quam ad velit expedita, sunt, iste
        maxime dolorum accusamus quo in possimus soluta qui blanditiis ipsa
        temporibus iusto aperiam!
      </p>
      <Link to="/dashboard">Dashboard</Link>
      <br />
      <Link to="/quiz">Quiz</Link>
    </div>
  );
}
