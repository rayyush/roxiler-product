/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getStatistics } from "../services/api";

const StatisticsBox = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSale: 0,
    soldItems: 0,
    notSoldItems: 0,
  });

  const fetchStatistics = async () => {
    try {
      const data = await getStatistics(selectedMonth);
      console.log("Fetched Statistics Data:", data); 
      setStatistics(data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div>
      <h3>Transaction Statistics</h3>
      <p>Total Sale: ${statistics.totalSale}</p>
      <p>Sold Items: {statistics.soldItems}</p>
      <p>Not Sold Items: {statistics.notSoldItems}</p>
    </div>
  );
};

export default StatisticsBox;
