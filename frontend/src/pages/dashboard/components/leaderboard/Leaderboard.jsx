import React from "react";
import styles from "./leaderboard.module.css";

const Leaderboard = ({ userData, type }) => {
  return (
    <div className={styles.leaderboard}>
      <ol>
        {userData.map((user) => {
          const name =
            type === "squad"
              ? user.squad
              : `${user.first_name} ${user.last_name}`;

          return (
            <li key={name} className={styles.list}>
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
