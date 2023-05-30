import React, { useState } from 'react';
import styles from './reviewAnswers.module.css';
import { DownArrowIcon, UpArrowIcon } from "../../components/resultCards/resultCard/ArrowIcons";

const ReviewAnswers = ({ questions, answers }) => {
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
          {questions.map((question, index) => (
            <div key={index} className={styles.questionAnswer}>
              <div className={styles.question}>{question}</div>
              <div className={styles.answer}>{answers[index]}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewAnswers;
