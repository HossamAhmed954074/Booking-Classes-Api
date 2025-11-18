const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB_URI } = process.env;

async function connectDB() {
  if (!MONGODB_URI) throw new Error("MONGODB_URI not set in environment");
  await mongoose.connect(MONGODB_URI);
  console.log("✅ MongoDB connected");
}

module.exports = { connectDB, mongoose };
