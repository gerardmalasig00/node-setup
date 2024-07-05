const mongoose = require("mongoose");

const initializeDatabaseConnection = () => {
  const { MONGO_HOST, MONGO_USER, MONGO_PASSWORD, MONGO_DBNAME } = process.env;

  const mongoDBURL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose
    .connect(mongoDBURL)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
};

module.exports = initializeDatabaseConnection;
