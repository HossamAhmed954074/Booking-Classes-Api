const express = require("express");
const helmet = require("helmet");
const limiter = require("./middleware/appLimiterMW");
const cors = require("cors");
const authRoutes = require("./routers/auth");
const businessRoutes = require("./routers/businessRoutes");
const dotenv = require("dotenv");
const httpStatusConstant = require("./utils/httpStatusConstant");
const { connectDB } = require("./data/db");

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/businesses", businessRoutes);
// fallback handler for unknown routes
// use app.use with no path so we don't pass a string route into path-to-regexp
app.use((req, res) => {
  res.status(404).json({
    status: httpStatusConstant.ERROR,
    message: "The Route not found",
  });
});

// global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.statusText || httpStatusConstant.ERROR,
    message: err.message || "Internal Server Error",
  });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
