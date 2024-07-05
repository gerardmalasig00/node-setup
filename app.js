const express = require("express");
const initializeDatabaseConnection = require("./src/db");
const { initializeMiddleware } = require("./src/middlewares");
const { initializeErrorHandling } = require("./src/utils/errorHandler");

const createApp = (routers, port) => {
  const app = express();
  app.set("port", port);

  // Initialize database connection
  initializeDatabaseConnection();

  // Initialize middlewares
  initializeMiddleware(app);

  // Prefix /api to each router path
  routers.forEach((router) => {
    app.use("/api", router);
  });

  // Initialize error handlers
  initializeErrorHandling(app);

  return app;
};

module.exports = createApp;
