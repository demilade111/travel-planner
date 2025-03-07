require('dotenv').config();
const express = require('express');
const http = require('http');
const connectDB = require('./src/config/db');
const { initializeSocket } = require('./src/loaders/socket');
const logger = require('./src/utils/logger');
const app = require('./src/app');
connectDB();
const server = http.createServer(app);
initializeSocket(server);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
process.on('unhandledRejection', (err) => {
  logger.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
}); 