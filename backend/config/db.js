const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://ayush070503:%401234_5678@cluster0.3aqdr.mongodb.net/";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
