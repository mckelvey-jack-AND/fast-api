import React from "react";
import { useEffect } from "react";
import Leaderboard from "../leaderboard/Leaderboard";
import useFetch from "../../../../hooks/useFetch";
import styles from "./individual.module.css";

const Individual = () => {
  const {
    data: userData,
    error,
    loading,
  } = useFetch("/leaderboard", { type: "individual" });

  useEffect(() => {
    if (error) {
      window.location.replace("/error");
    }
  }, [error]);

  return (
    <div>
      {loading && <div>LOADING!</div>}
      <div className={styles.leaderboard}>
        {userData && <Leaderboard userData={userData} type="individual" />}
      </div>
    </div>
  );
};

export default Individual;
