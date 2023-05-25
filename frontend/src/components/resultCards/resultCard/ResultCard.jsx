import React from "react";
import { DownArrowIcon, UpArrowIcon } from "./ArrowIcons";
import styles from "./resultCard.module.css";
const ResultCard = ({
  type,
  isBestResult,
  date = "June 9th 2023",
  degree = "1st",
  occasion = "2",
}) => {
  return (
    <article className={styles.result_card_container}>
      <h2 className={styles.result_card_header}>
        {type}s {isBestResult ? "Best" : "Worse"} result
      </h2>
      <p className={styles.result_card_date}>{date}</p>
      <p className={styles.result_card_place}> {degree} </p>
      <div className={styles.result_card_description}>
        {isBestResult ? <UpArrowIcon /> : <DownArrowIcon />}
        <p className={styles.card_description_text}>
          Only achieved this result on {occasion} occasions.
        </p>
      </div>
    </article>
  );
};

export default ResultCard;
