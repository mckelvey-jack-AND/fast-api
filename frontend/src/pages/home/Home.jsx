import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import NextButtonIcon from "./NextButtonIcon";
import usePost from "../../hooks/usePost";
import { UserContext } from "../../hooks/UserContext";
import WarningIcon from "./WarningIcon";

const Home = () => {
  const { setCurrentUser } = React.useContext(UserContext);
  const [emailInput, setEmailInput] = useState("bkleen1@and.digital");
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
      navigate("/quiz");
    }
  }

  return (
    <div className={styles.main}>
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
          pattern="^[a-zA-Z0-9._%+-^&amp;]+@and\.digital$"
          required
          onChange={(e) => setEmailInput(e.target.value)}
          title="Please enter an email address that ends with @and.digital"
        />
        {error && (
          <div className={styles.email_error}>
            <WarningIcon />
            <span>{error}</span>
          </div>
        )}
      </form>
      <div className={styles.links}>
        <p>See Privacy Policy</p>
        <button onClick={handleSubmit} className={styles.quiz}>
          <NextButtonIcon />
        </button>
      </div>
    </div>
  );
};

export default Home;
