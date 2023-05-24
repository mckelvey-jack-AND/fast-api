import React from "react";
import { useEffect } from "react";
import Leaderboard from "../leaderboard/Leaderboard";
import useFetch from "../../../../hooks/useFetch";
import styles from "./individual.module.css";
import GroupedBarChart from "../../../../components/graphs/GroupedBarChart";
import QuestionDifficulty from "../../../../components/questionDifficulty/QuestionDifficulty";
import OvertimeChart from "../../../../components/graphs/overtimeChart/OvertimeChart";
// import IndividualScoreOvertime from "../../../../components/visualisations/periodOfTimeLeaderboard/individual/IndividualScoreOvertime";
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
      <h2>Dashboard</h2>
      <div className={styles.leaderboard}>
        {userData && (
          <>
            <Leaderboard userData={userData} type="individual" />
            <GroupedBarChart />
            <QuestionDifficulty />
            {/* <IndividualScoreOvertime /> */}
            <OvertimeChart type="individual" />
          </>
        )}
      </div>
    </div>
  );
};

export default Individual;
