import React from "react";
import { useEffect } from "react";
import Leaderboard from "../leaderboard/Leaderboard";
import useFetch from "../../../../hooks/useFetch";
import styles from "./squad.module.css";

const Squad = () => {
  const {
    data: userData,
    error,
    loading,
  } = useFetch("/leaderboard", { type: "squad" });

  useEffect(() => {
    if (error) {
      window.location.replace("/error");
    }
  }, [error]);

  return (
    <div>
      {loading && <div>LOADING!</div>}
      <div className={styles.leaderboard}>
        {userData && <Leaderboard userData={userData} type="squad" />}
      </div>
    </div>
  );
};

export default Squad;
