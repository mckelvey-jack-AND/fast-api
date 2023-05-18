import React, { useEffect, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Plot from "react-plotly.js";
const GroupedBarChart = () => {
  const { data: graphData, error, loading } = useFetch("/correct-answers");
  const navigate = useNavigate();

  const getQuestionBars = () => {
    const questionCategories = ["easy", "medium", "hard"];
    const quizNames = graphData?.map((quiz) => Object.keys(quiz)[0]);

    const questions = questionCategories.map((level) =>
      graphData?.map((quiz) => Object.values(quiz)[0][level])
    );

    return questionCategories.map((level, index) => ({
      x: quizNames,
      y: questions[index],
      name: level,
      type: "bar",
    }));
  };

  const questionBars = useMemo(() => getQuestionBars(), [graphData]);

  useEffect(() => {
    error && navigate("/error");
  }, [error]);

  return (
    <div>
      {loading && <div>Loading...</div>}

      <Plot
        data={questionBars}
        layout={{ width: 700, height: 500, title: "Question levels" }}
      />
    </div>
  );
};

export default GroupedBarChart;
