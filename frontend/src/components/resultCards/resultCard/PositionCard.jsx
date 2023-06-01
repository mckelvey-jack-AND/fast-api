import React from "react";
import { DownArrowIcon, UpArrowIcon } from "./ArrowIcons";
import styles from "./resultCard.module.css";
import { getOrdinal } from "../../../helpers/getOrdinal";

const PositionCard = ({ type, position = 1, lastWeekPosition = 2 }) => {
  return (
    <article className={styles.result_card_container}>
      <h2 className={styles.result_card_header}>{type} Position</h2>
      <p className={styles.result_card_place}>
        {" "}
        {`${position}${getOrdinal(position)}`}{" "}
      </p>
      <div className={styles.result_card_description}>
        {position < lastWeekPosition ? <UpArrowIcon /> : <DownArrowIcon />}
        <p className={styles.card_description_text}>
          {position < lastWeekPosition ? "Up " : "Down "}
          {position < lastWeekPosition
            ? lastWeekPosition - position
            : position - lastWeekPosition}{" "}
          places on previous week
        </p>
      </div>
    </article>
  );
};

export default PositionCard;
