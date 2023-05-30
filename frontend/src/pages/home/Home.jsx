import React from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import NextButtonIcon from "./NextButtonIcon";

const Home = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.welcomeText}>Welcome to the Jemison Quiz</h1>
      <p className={styles.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud?
      </p>

      <input
        className={styles.email_input}
        type="email"
        placeholder="Please enter your email"
      />

      <div className={styles.links}>
        <div className={styles.dashboard}>
          <Link to="/dashboard"> See dashboard</Link>
        </div>
        <div className={styles.quiz}>
          <Link to="/quiz">
            <NextButtonIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
