import React from "react";
import { useEffect } from "react";
import Leaderboard from "../leaderboard/Leaderboard";
import useFetch from "../../../../hooks/useFetch";
import styles from "./individual.module.css";
import GroupedBarChart from "../../../../components/graphs/GroupedBarChart";
import QuestionDifficulty from "../../../../components/questionDifficulty/QuestionDifficulty";
import OvertimeChart from "../../../../components/graphs/overtimeChart/OvertimeChart";
import BestWorseResults from "../../../../components/resultCards/BestWorseResults";

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
        {userData && (
          <>
            <Leaderboard userData={userData} type="individual" />
            <QuestionDifficulty />
            <OvertimeChart type="individual" />
            <BestWorseResults type="individual" />
            <GroupedBarChart />
          </>
        )}
      </div>
    </div>
  );
};

export default Individual;
