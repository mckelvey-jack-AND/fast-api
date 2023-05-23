import { Link } from "react-router-dom";
import React
 from "react";
import styles from './quizDashboard.module.css';

const QuizDashboard = (props) =>{

    return (
        <div className={styles.links}>
        <div className={styles.question}>You anwered {props.totalCorrectAnswer - 1} correct answers</div>
        <div className={styles.dashboard}><Link to="/dashboard"> See dashboard</Link></div>
      </div>
    )
}

export default QuizDashboard;