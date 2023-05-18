/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const GroupedBarChart = () => {
  const { data: graphData, error, loading } = useFetch("/correct-answers");
  useEffect(() => {
    console.log(graphData);
  }, []);
  return <div></div>;
};

export default GroupedBarChart;
