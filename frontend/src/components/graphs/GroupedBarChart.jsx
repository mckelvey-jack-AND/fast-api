import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
const GroupedBarChart = () => {
  const { data: graphData, error, loading } = useFetch("/correct-answers");

  const navigate = useNavigate();

  useEffect(() => {
    error && navigate("/error");
  }, [error, navigate]);

  // eslint-disable-next-line no-console
  console.log({ graphData });
  return <div>{loading && <div>Loading...</div>}</div>;
};

export default GroupedBarChart;
