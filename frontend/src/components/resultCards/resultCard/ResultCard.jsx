import React from "react";
import { DownArrowIcon, UpArrowIcon } from "./ArrowIcons";
import styles from "./resultCard.module.css";
import { getOrdinal } from "../../../helpers/getOrdinal";

const ResultCard = ({ type, isBestResult, position = 1, occurrences = 2 }) => {
  return (
    <article className={styles.result_card_container}>
      <h2 className={styles.result_card_header}>
        {type}s {isBestResult ? "Best" : "Worse"} result
      </h2>
      <p className={styles.result_card_place}>
        {" "}
        {`${position}${getOrdinal(position)}`}{" "}
      </p>
      <div className={styles.result_card_description}>
        {isBestResult ? <UpArrowIcon /> : <DownArrowIcon />}
        <p className={styles.card_description_text}>
          Only achieved this result {occurrences}
          {occurrences > 1 ? <span> occasions</span> : <span> occasion</span>}.
        </p>
      </div>
    </article>
  );
};

export default ResultCard;
