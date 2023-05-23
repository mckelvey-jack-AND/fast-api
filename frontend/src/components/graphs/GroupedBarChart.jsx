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

      <BarChart width={500} height={250} data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="easy" fill="#acdf87" />
        <Bar dataKey="medium" fill="#ffc500" />
        <Bar dataKey="hard" fill="#e61717" />
      </BarChart>
    </div>
  );
};

export default GroupedBarChart;
