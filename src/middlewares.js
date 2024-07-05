const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const express = require("express");

// App level middlewares
const initializeMiddleware = (app) => {
  app.use(helmet());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());
};

// Route level middlewares
const errorMiddleware = (error, req, res, next) => {
  console.log(error, res);
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  res.status(status).send({
    status,
    message,
  });
};

const validationMiddleware = (schema) => {
  return async (req, res, next) => {
    const validationOptions = {
      abortEarly: false,
    };

    try {
      const value = await schema.validateAsync(req.body, validationOptions);

      req.body = value;
      next();
    } catch (error) {
      if (error) {
        const errors = [];
        error.details.forEach((error) => {
          errors.push({
            field: error?.context?.label,
            message: error?.message.replace(/[\\"]/g, ""),
          });
        });
        res.status(400).send({ type: "Validation", errors: errors });
      }

      res.status(500).send("Something went wrong");
    }
  };
};

module.exports = {
  initializeMiddleware,
  errorMiddleware,
  validationMiddleware,
};
