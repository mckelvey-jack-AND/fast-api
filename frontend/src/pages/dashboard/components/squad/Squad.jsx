import React from "react";
import { useEffect } from "react";
import Leaderboard from "../leaderboard/Leaderboard";
import useFetch from "../../../../hooks/useFetch";
import styles from "./squad.module.css";
import OvertimeChart from "../../../../components/graphs/overtimeChart/OvertimeChart";

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
      <h2>Dashboard</h2>
      <div className={styles.leaderboard}>
        {userData && <Leaderboard userData={userData} type="squad" />}
        <OvertimeChart type="squad" />
      </div>
    </div>
  );
};

export default Squad;
