const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./utils/logger");
const authRoutes = require("./api/routes/authRoutes");
const userRoutes = require("./api/routes/userRoutes");
const tripRoutes = require("./api/routes/tripRoutes");
const expenseRoutes = require("./api/routes/expenseRoutes");
const packingRoutes = require("./api/routes/packingRoutes");
const collaborationRoutes = require("./api/routes/collaborationRoutes");
const communityRoutes = require("./api/routes/communityRoutes");
const aiRoutes = require("./api/routes/aiRoutes");
const app = express();
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api/", limiter);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/packing", packingRoutes);
app.use("/api/collaboration", collaborationRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/ai", aiRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Travel Planner API" });
});
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorHandler);
module.exports = app;
