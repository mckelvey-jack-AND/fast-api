import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import CustomToolTip from "./CustomToolTip";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./groupedBarChart.module.css";

const GroupedBarChart = () => {
  const { data: graphData, error, loading } = useFetch("/correct-answers");
  const navigate = useNavigate();

  useEffect(() => {
    error && navigate("/error");
  }, [error]);

  return (
    <section className={styles.chart_container}>
      {loading && <div>Loading...</div>}
      <h3 className={styles.chart_header}>Difficulty Matrix</h3>
      <div style={{ height: "200px", width: "100%" }}>
        <ResponsiveContainer width={"100%"} height="100%">
          <BarChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis fontSize="10px" dataKey="name" />
            <YAxis
              fontSize="10px"
              width={30}
              type="number"
              domain={[0, 100]}
              tickFormatter={(tick) => `${tick}%`}
            />
            <Tooltip content={<CustomToolTip />} />
            <Legend />
            <Bar dataKey="easy" fill="#acdf87" />
            <Bar dataKey="medium" fill="#ffc500" />
            <Bar dataKey="hard" fill="#e61717" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default GroupedBarChart;
