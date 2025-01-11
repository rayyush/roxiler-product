import React, { useState, useEffect } from "react";
import { getTransactions } from "../services/api";

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [search, setSearch] = useState("");

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions(selectedMonth, page, perPage, search);
      setTransactions(data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, page, search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.dateOfSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TransactionsTable;
