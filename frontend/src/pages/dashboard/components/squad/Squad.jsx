import React from "react";
import { useEffect } from "react";
import Leaderboard from "../leaderboard/Leaderboard";
import useFetch from "../../../../hooks/useFetch";
import styles from "./squad.module.css";
import OvertimeChart from "../../../../components/graphs/overtimeChart/OvertimeChart";
import BestWorseResults from "../../../../components/resultCards/BestWorseResults";
import GroupedBarChart from "../../../../components/graphs/GroupedBarChart";
import LoadingAnimation from "../../../../components/animations/LoadingAnimation";

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
    <div className={styles.squad_page_container}>
      {loading && <LoadingAnimation />}
      <div className={styles.leaderboard}>
        {userData && <Leaderboard userData={userData} type="squad" />}
        <BestWorseResults type="squad" />
        <OvertimeChart type="squad" />
        <GroupedBarChart />
      </div>
    </div>
  );
};

export default Squad;
