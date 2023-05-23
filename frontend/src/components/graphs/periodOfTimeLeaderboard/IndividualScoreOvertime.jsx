import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styles from "./individualScoreOvertime.module.css";
import CustomToolTip from "./CustomToolTip";

const IndividualScoreOvertime = () => {
  const {
    data: graphData,
    error,
    loading,
  } = useFetch("/individual-score-overtime");
  const navigate = useNavigate();

  useEffect(() => {
    error && navigate("/error");
  }, [error]);

  return (
    <div className={styles.graph_container}>
      {loading && <div>Loading...</div>}
      <div style={{ height: "400px", width: "100%" }}>
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

export default IndividualScoreOvertime;
