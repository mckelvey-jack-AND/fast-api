import React from 'react';

const Leaderboard = ({ userData }) => {
 
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {userData.map((user) => (
          <li key={user.user_id}>
            {user.first_name} {user.last_name} - {user['total score']}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
