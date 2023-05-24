import { Link } from "react-router-dom";
import React, {useEffect} from "react";
import styles from "./quizResult.module.css";

const QuizResult = (props) => {

  const all= props.allAnswers
 
  const sendDataToServer =  () => {
    try {
        fetch('http://127.0.0.1:8000/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers: all })
      });
  
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(()=>{
    sendDataToServer()
  },[])

  return (
    <>
      <div className={styles.results}> Results</div>
      <div className={styles.links}>
        <div className={styles.question}>
          <div className={styles.score}>Score</div>
          <div className={styles.yourScore}>Your Score</div>
          <div className={styles.precentage}>
            {props.totalCorrectAnswer * 10}%
          </div>
        </div>
        <button className={styles.dashboard}>
          <Link to="/dashboard" className={styles.resultLink}>
            {" "}
            See dashboard
          </Link>
        </button>
      </div>
    </>
  );
};

export default QuizResult;
