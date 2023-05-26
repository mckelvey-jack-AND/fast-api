/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import NextButtonIcon from "./NextButtonIcon";
import usePost from "../../hooks/usePost";
import { UserContext } from "../../hooks/UserContext";

const Home = () => {
  const { currentUser, setCurrentUser } = React.useContext(UserContext);

  console.log({ currentUser });
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, errorBody } = await usePost("/user", {
      user_email: emailInput,
    });
    if (errorBody) {
      setError(errorBody.data);
      return;
    } else {
      setCurrentUser(data);
    }
    console.log({ data, errorBody });
  }

  useEffect;

  return (
    <div className={styles.main}>
      {/* {loading && <div>LOADING!</div>} */}
      <h1 className={styles.welcomeText}>Welcome to the Jemison Quiz</h1>
      <p className={styles.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud?
      </p>

      <form onSubmit={handleSubmit}>
        <input
          className={styles.email_input}
          type="email"
          placeholder="Please enter your email"
          value={emailInput}
          pattern="^[a-zA-Z0-9._%+-]+@and\.digital$"
          required
          onChange={(e) => setEmailInput(e.target.value)}
          title="Please enter an email address that ends with @and.digital"
        />
        {error && <div className={styles.error}>{error}</div>}
      </form>
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
