const Product = require("../models/Product");
const fetchData = require("../utils/fetchData");

// Helper Functions
async function getStatisticsData(month) {
  const soldItems = await Product.find({
    dateOfSale: { $regex: month, $options: "i" },
    sold: true,
  }).countDocuments();

  const notSoldItems = await Product.find({
    dateOfSale: { $regex: month, $options: "i" },
    sold: false,
  }).countDocuments();

  const totalSale = await Product.aggregate([
    {
      $match: { dateOfSale: { $regex: month, $options: "i" }, sold: true },
    },
    {
      $group: { _id: null, total: { $sum: "$price" } },
    },
  ]);

  return {
    totalSale: totalSale[0]?.total || 0,
    soldItems,
    notSoldItems,
  };
}

async function getBarChartData(month) {
  const priceRanges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];

  const result = await Promise.all(
    priceRanges.map(async (range) => {
      const count = await Product.find({
        dateOfSale: { $regex: month, $options: "i" },
        price: { $gte: range.min, $lt: range.max },
      }).countDocuments();

      return { range: range.range, count };
    })
  );

  return result;
}

async function getPieChartData(month) {
  const categories = await Product.aggregate([
    {
      $match: { dateOfSale: { $regex: month, $options: "i" } },
    },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
  ]);

  return categories;
}

exports.initializeDB = async (req, res) => {
  try {
    const data = await fetchData();
    await Product.deleteMany();
    await Product.insertMany(data);
    res.status(200).json({ message: "Database initialized with seed data" });
  } catch (error) {
    res.status(500).json({ message: "Error initializing database", error });
  }
};

exports.getAllTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = "" } = req.query;

  try {
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { price: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const transactions = await Product.find(query)
      .skip((parseInt(page) - 1) * parseInt(perPage))
      .limit(parseInt(perPage));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      page: parseInt(page),
      perPage: parseInt(perPage),
      total,
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

exports.getStatistics = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  try {
    const statistics = await getStatisticsData(month);
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error });
  }
};

exports.getBarChart = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  try {
    const barChart = await getBarChartData(month);
    res.status(200).json(barChart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bar chart data", error });
  }
};

exports.getPieChart = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month is required" });
  }

  try {
    const pieChart = await getPieChartData(month);
    res.status(200).json(pieChart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pie chart data", error });
  }
};

exports.getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      Product.find({ dateOfSale: { $regex: month, $options: "i" } }),
      getStatisticsData(month),
      getBarChartData(month),
      getPieChartData(month),
    ]);

    res.status(200).json({
      transactions,
      statistics,
      barChart,
      pieChart,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching combined data", error });
  }
};
