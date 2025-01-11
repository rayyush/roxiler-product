import axios from "axios";

const API_URL = "http://localhost:9000/api/products"; // Update with your backend URL

// Get Transactions
export const getTransactions = async (
  month,
  page = 1,
  perPage = 10,
  search = ""
) => {
  try {
    const response = await axios.get(
      `${API_URL}?month=${month}&page=${page}&perPage=${perPage}&search=${search}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

// Get Statistics
export const getStatistics = async (month) => {
  try {
    const response = await axios.get(`${API_URL}/statistics?month=${month}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};

// Get Bar Chart data
export const getBarChart = async (month) => {
  try {
    const response = await axios.get(`${API_URL}/barchart?month=${month}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    throw error;
  }
};
