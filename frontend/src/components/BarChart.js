import React, { useState, useEffect } from "react";
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
import { getBarChart } from "../services/api";

const Chart = ({ selectedMonth }) => {
  const [barData, setBarData] = useState([]);

  const fetchBarChart = async () => {
    try {
      const data = await getBarChart(selectedMonth);
      setBarData(data);
    } catch (error) {
      console.error("Error fetching bar chart:", error);
    }
  };

  useEffect(() => {
    fetchBarChart();
  }, [selectedMonth]);

  return (
    <div>
      <h3>Transaction Bar Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
