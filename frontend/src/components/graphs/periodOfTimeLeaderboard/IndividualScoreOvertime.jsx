/* eslint-disable no-console */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styles from "./individualScoreOvertime.module.css";

const IndividualScoreOvertime = () => {
  const {
    data: graphData,
    error,
    loading,
  } = useFetch("/individual-score-overtime");
  const navigate = useNavigate();

  console.log({ graphData });
  useEffect(() => {
    error && navigate("/error");
  }, [error]);

  return (
    <div className={styles.graph_container}>
      {loading && <div>Loading...</div>}

      <LineChart width={500} height={250} data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rounds" />
        <YAxis reversed={true} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="position" stroke="#B21F2B" />
      </LineChart>
    </div>
  );
};

export default IndividualScoreOvertime;
