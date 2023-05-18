import React from "react";
import { useEffect } from "react";


const Individual = () => {

  const leaderboardData = () =>{
    fetch('/leaderboard')
  .then(response => response.data)
  .then(response => {
    return response
  })
}

useEffect(() => {
  leaderboardData();
}, []);


  return (
    <div>
      <p>Individual dashboard content</p>
    </div>
  );
};
export default Individual;
