import React from "react";
import styles from "./overtimeChart.module.css";
const CustomToolTip = ({ active, payload, type }) =>
  active &&
  payload &&
  payload.length && (
    <div className={styles.custom_tooltip_container}>
      <p
        className={styles.custom_tooltip_leadership}
      >{`Leaderboard Position: ${payload[0].payload.position}`}</p>
      <p className="label">{`Score : ${Math.round(
        (payload[0].payload.total_score / (type === "squad" ? 100 : 10)) * 100
      )}%`}</p>
      <p className="label">{`Round : ${payload[0].payload.rounds}`}</p>
    </div>
  );

export default CustomToolTip;
