import React from 'react';
import styles from './leaderboard.module.css';

const Leaderboard = ({ userData }) => {
 
  return (
    <div className={styles.leaderboard}>
      <ol>
        {userData.map((user) => (
          <>
          <li key={user.user_id} className={styles.list}>
            <div className={styles.name}>{user.first_name} {user.last_name}</div>
            <div className={styles.score}>{user['total score']}</div>
          </li>
     
          </>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
