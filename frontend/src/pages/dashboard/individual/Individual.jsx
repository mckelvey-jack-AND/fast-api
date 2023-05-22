import React from "react";
import GroupedBarChart from "../../../components/graphs/GroupedBarChart";
import QuestionDifficulty from "../../../components/questionDifficulty/QuestionDifficulty";

const Individual = () => {
  return (
    <div>
      <p>Individual dashboard content</p>
      <GroupedBarChart />
      <QuestionDifficulty />
    </div>
  );
};
export default Individual;
