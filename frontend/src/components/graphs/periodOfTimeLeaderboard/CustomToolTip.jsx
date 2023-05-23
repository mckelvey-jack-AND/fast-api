import React from "react";
import styles from "./individualScoreOvertime.module.css";
const CustomToolTip = ({ active, payload }) =>
  active &&
  payload &&
  payload.length && (
    <div className={styles.custom_tooltip_container}>
      <p
        className={styles.custom_tooltip_leadership}
      >{`Leaderboard Position: ${payload[0].payload.position}`}</p>
      <p className="label">{`Score : ${Math.ceil(
        (payload[0].payload.total_score / 10) * 100
      )}%`}</p>
      <p className="label">{`Round : ${payload[0].payload.rounds}`}</p>
    </div>
  );

export default CustomToolTip;
