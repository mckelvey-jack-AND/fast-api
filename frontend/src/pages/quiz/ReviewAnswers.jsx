import React, { useState } from 'react';
import styles from './reviewAnswers.module.css';
import { DownArrowIcon, UpArrowIcon } from "../../components/resultCards/resultCard/ArrowIcons";

const ReviewAnswers = ({ questions, answers, correctAnswers }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordion}>
      <button className={styles.accordionButton} onClick={toggleAccordion}>
        View Answers <span className={styles.accordionArrow}>{isOpen? <UpArrowIcon/> : <DownArrowIcon/>}</span>
      </button>
      {isOpen && (
        <div className={styles.content}>
          {questions.slice(0,10).map((question, index) => (
            <div key={index} className={(answers[index] === correctAnswers[index]) ? styles.questionAnswer : styles.questionAnswer1}>
                <div className={styles.progress}>{index+1}/10</div>
              <div className={styles.question}>{question}</div>
              <div className={styles.answer}>Correct answer:<br/>{correctAnswers[index]}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewAnswers;
