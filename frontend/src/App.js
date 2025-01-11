import React, { useState } from "react";
import MonthDropdown from "./components/MonthDropdown";
import TransactionsTable from "./components/TransactionsTable";
import StatisticsBox from "./components/StatisticsBox";
import BarChart from "./components/BarChart";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("Mar");

  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <MonthDropdown
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
      <StatisticsBox selectedMonth={selectedMonth} />
      <TransactionsTable selectedMonth={selectedMonth} />
      <BarChart selectedMonth={selectedMonth} />
    </div>
  );
};

export default App;
