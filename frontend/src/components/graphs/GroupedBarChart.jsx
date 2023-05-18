/* eslint-disable no-console */
import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Plot from "react-plotly.js";
const GroupedBarChart = () => {
  const { data: graphData, error, loading } = useFetch("/correct-answers");

  const quizNames = graphData?.map((quiz) => Object.keys(quiz)[0]);
  const easyQuestions = graphData?.map((quiz) => Object.values(quiz)[0].easy);
  const mediumQuestions = graphData?.map(
    (quiz) => Object.values(quiz)[0].medium
  );
  const hardQuestions = graphData?.map((quiz) => Object.values(quiz)[0].hard);
  console.log({ quizNames });

  const navigate = useNavigate();

  const easyQuestionsBar = {
    x: quizNames,
    y: easyQuestions,
    name: "Easy Questions",
    type: "bar",
  };

  const mediumQuestionsBar = {
    x: quizNames,
    y: mediumQuestions,
    name: "Medium Questions",
    type: "bar",
  };
  const hardQuestionsBar = {
    x: quizNames,
    y: hardQuestions,
    name: "Hard Questions",
    type: "bar",
  };

  useEffect(() => {
    //navigate to the error page if there is an error
    // error && window.location.replace("/error");
    error && navigate("/error");
  }, [error]);

  // eslint-disable-next-line no-console
  console.log({ graphData });
  return (
    <div>
      {loading && <div>Loading...</div>}

      <Plot
        data={[easyQuestionsBar, mediumQuestionsBar, hardQuestionsBar]}
        layout={{ width: 700, height: 500, title: "Question levels" }}
      />
    </div>
  );
};

export default GroupedBarChart;
