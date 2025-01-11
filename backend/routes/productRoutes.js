const express = require("express");
const {
  initializeDB,
  getAllTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
} = require("../controllers/productController");

const router = express.Router();

router.get("/initialize", initializeDB);

router.get("/", getAllTransactions);
router.get("/statistics", getStatistics);
router.get("/barchart", getBarChart);
router.get("/piechart", getPieChart);
router.get("/combined", getCombinedData);

module.exports = router;
