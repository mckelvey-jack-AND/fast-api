import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
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
const GroupedBarChart = () => {
  const { data: graphData, error, loading } = useFetch("/correct-answers");
  const navigate = useNavigate();

  useEffect(() => {
    error && navigate("/error");
  }, [error]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      <div style={{ height: "400px", width: "100%" }}>
        <ResponsiveContainer width={"100%"} height="100%">
          <BarChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width={25} />
            <Tooltip />
            <Legend />
            <Bar dataKey="easy" fill="#acdf87" />
            <Bar dataKey="medium" fill="#ffc500" />
            <Bar dataKey="hard" fill="#e61717" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GroupedBarChart;
