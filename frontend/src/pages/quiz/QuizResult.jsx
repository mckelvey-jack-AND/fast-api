import { Link } from "react-router-dom";
import React, {useEffect} from "react";
import styles from "./quizResult.module.css";

const QuizResult = (props) => {

  const allAnswers= [...props.allAnswers].reverse();
  const roundId= props.roundId;
  const questionId = [...props.questionId].reverse();
  const answerId = [...props.answerId].reverse();
 
  const sendDataToServer =  () => {
    try {
        fetch('http://127.0.0.1:8000/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers: allAnswers, roundId:roundId, questionId:questionId, answerId:answerId  })
      });
  
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(()=>{
    sendDataToServer()
  },[allAnswers])

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
