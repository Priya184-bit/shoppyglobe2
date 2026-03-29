require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./routes/config/db");

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use(require("./routes/authRoutes"));
app.use(require("./routes/productRoutes"));
app.use(require("./routes/cartRoutes"));

// Error handling
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Server start
app.listen(3000, () => {
  console.log("Server running on port 3000");
});