import React from "react";
import { useEffect, useState} from "react";
import Leaderboard from "../leaderboard/Leaderboard";

const Individual = () => {

  const [userData,setUserData] = useState(null);

useEffect(() => {
    fetch('/leaderboard')
    .then(response=>response.json())
    .then(data=> setUserData(data.data))
}, []);


  return (
    <>
    <div>
      <p>Individual dashboard content</p>
    </div>
    { userData && <Leaderboard userData={userData}/>}
    </>
  );
};
export default Individual;
