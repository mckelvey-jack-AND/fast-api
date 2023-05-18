import React from "react";
import { useEffect } from "react";
import Leaderboard from "../leaderboard/Leaderboard";
import useFetch from "../../../../hooks/useFetch";
import styles from "./individual.module.css"
const Individual = () => {
  const { data: userData, error, loading } = useFetch("/leaderboard");

  useEffect(() => {
    if (error) {
      window.location.replace("/error");
    }
  }, [error]);

  return (
    
    <div>
      {loading && <div>LOADING!</div>}
      <div className={styles.leaderboard}>
      {userData && <Leaderboard userData={userData} />}
      </div>
    </div>
  );
};
export default Individual;
