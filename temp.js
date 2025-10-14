require("dotenv").config();
const mongoose = require("mongoose");
try {
  mongoose.connect(process.env.DB_URL)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => console.log("❌ MongoDB connection error", err));
} catch (e) {
  console.log("⚠ Some error occurred", e);
}