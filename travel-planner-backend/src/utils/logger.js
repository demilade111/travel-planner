const winston = require("winston");
const path = require("path");
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  defaultMeta: { service: "travel-planner-api" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
      ),
    }),
  ],
});
if (process.env.NODE_ENV === "production") {
  const logDir = path.join(__dirname, "../../logs");
  logger.add(
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    })
  );
  logger.add(
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
    })
  );
}
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};
module.exports = logger;
