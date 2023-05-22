import React from "react";
import styles from "./card.module.css";
const Card = ({ title, question, type }) => {
  return (
    <article
      className={`${
        type === "easy" ? styles.easy_container : styles.hard_container
      } ${styles.card}`}
    >
      <h2 className={styles.card_title}>{title}</h2>
      <div className={styles.correct_count}>2/10</div>
      <div>
        <p className={styles.question_text}>{question?.question_text}</p>
      </div>

      <div>
        <p className={styles.answer_label}>Correct Answer</p>
        <p className={styles.answer_text}>{question?.answer_text}</p>
      </div>
    </article>
  );
};

export default Card;
