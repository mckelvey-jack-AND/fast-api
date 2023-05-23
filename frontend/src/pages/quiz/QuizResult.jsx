import { Link } from "react-router-dom";
import React from "react";
import styles from "./quizResult.module.css";

const QuizResult = (props) => {
  return (
    <>
      <div className={styles.results}> Results</div>
      <div className={styles.links}>
        <div className={styles.question}>
          <div className={styles.score}>Score</div>
          <div className={styles.yourScore}>Your Score</div>
          <div className={styles.precentage}>{(props.totalCorrectAnswer - 1)*10}%</div>
        </div>

          <button className={styles.dashboard}><Link to="/dashboard" className={styles.resultLink}> See dashboard</Link></button>

      </div>
    </>
  );
};

export default QuizResult;
