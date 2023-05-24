import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import CustomToolTip from "./CustomToolTip";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import styles from "./overtimeChart.module.css";

const OvertimeChart = ({ type }) => {
  const {
    data: graphData,
    error,
    loading,
  } = useFetch("/leaderboard-score-overtime", { type: type });
  const navigate = useNavigate();

  useEffect(() => {
    error && navigate("/error");
  }, [error]);

  return (
    <div className={styles.graph_container}>
      {loading && <div>Loading...</div>}
      <div className={styles.graph_chart}>
        <h3 className={styles.chart_header}>
          {`${type} Leaderboard over a period of time`}
        </h3>

        <ResponsiveContainer width={"100%"} height="100%">
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="rounds"
              label={{
                value: "Quiz round",
                position: "insideBottomLeft",
                offset: -20,
              }}
            />
            <YAxis
              type="number"
              domain={[1, "dataMax"]}
              reversed={true}
              tickCount={5}
              interval={"preserveStart"}
              label={{
                value: "Leaderboard Position",
                angle: -90,
                fontSize: 16,
                position: "insideLeft",
              }}
            />
            <Tooltip content={<CustomToolTip />} />
            <Line type="monotone" dataKey="position" stroke="#B21F2B" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OvertimeChart;
