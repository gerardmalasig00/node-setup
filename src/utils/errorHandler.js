const { errorMiddleware } = require("../middlewares");

const initializeErrorHandling = (app) => {
  app.use(errorMiddleware);
};

const createHttpException = (status, message) => {
  const error = new Error(message);
  error.status = status;
  error.message = message;
  return error;
};

module.exports = {
  initializeErrorHandling,
  createHttpException,
};
