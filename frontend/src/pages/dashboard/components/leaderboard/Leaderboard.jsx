import React from "react";
import styles from "./leaderboard.module.css";
import { getOrdinal } from "../../../../helpers/getOrdinal";

const Leaderboard = ({ userData, type }) => {
  return (
    <div className={styles.leaderboard}>
      <h3 className={styles.leaderboard_header}>
        {type} Leaderboard this week
      </h3>
      <ol className={styles.orderList}>
        <li className={styles.list_header}>
          <div>Place</div>
          <div>{type === "individual" ? "Name" : "Squad"}</div>
          <div>Score / {type === "individual" ? "10" : "100"}</div>
        </li>
        {userData.map((user) => {
          const name =
            type === "squad"
              ? user.squad
              : `${user.first_name} ${user.last_name}`;

          return (
            <li key={name} className={styles.list_item}>
              <div className={styles.place}>
                {user.position}
                {getOrdinal(user.position)}
              </div>
              <div className={styles.name}>{name}</div>
              <div className={styles.score}>{user["total score"]}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Leaderboard;
