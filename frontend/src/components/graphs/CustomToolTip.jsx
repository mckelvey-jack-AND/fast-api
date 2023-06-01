import React from "react";
import styles from "./groupedBarChart.module.css";
const CustomToolTip = ({ active, payload }) =>
  active &&
  payload &&
  payload.length && (
    <div className={styles.custom_tooltip_container}>
      <p className="label">{`Round : ${payload[0].payload.name}`}</p>
      <p
        className={styles.tooltip_easy}
      >{`Easy: ${payload[0].payload.easy}%`}</p>
      <p
        className={styles.tooltip_medium}
      >{`Medium: ${payload[0].payload.medium}%`}</p>
      <p
        className={styles.tooltip_hard}
      >{`Hard: ${payload[0].payload.hard}%`}</p>
    </div>
  );

export default CustomToolTip;
