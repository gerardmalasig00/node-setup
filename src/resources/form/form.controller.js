const express = require("express");
const { validationMiddleware } = require("../../middlewares");
const { createHttpException } = require("../../utils/errorHandler");
const validate = require("./form.validation");
const FormService = require("./form.service");

const path = "/form";
const router = express.Router();

router.get(`${path}`, async (req, res, next) => {
  try {
    const form = await FormService.get();
    res.status(201).json({ form });
  } catch (error) {
    next(createHttpException(400, error.message));
  }
});

router.post(
  `${path}`,
  validationMiddleware(validate.create),
  async (req, res, next) => {
    try {
      const { name, fields } = req.body;
      const form = await FormService.create(name, fields);

      res.status(201).json({ form });
    } catch (error) {
      next(createHttpException(400, error.message));
    }
  }
);

router.get(`${path}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params;
    const form = await FormService.getById(id);
    if (form) {
      res.status(200).json(form);
    } else {
      res.status(404).send({
        status: 400,
        message: "Form not found",
      });
    }
  } catch (error) {
    next(new HttpException(400, error.message));
  }
});

router.put(
  `${path}/:id`,
  validationMiddleware(validate.update),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const form = await FormService.update(id, body);
      res.status(200).json(form);
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  }
);

router.delete(`${path}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params;
    const form = await FormService.softDelete(id);
    if (form) {
      res.status(200).json(form);
    } else {
      res.status(404).send({
        status: 400,
        message: "Form not found",
      });
    }
  } catch (error) {
    next(new HttpException(400, error.message));
  }
});

module.exports = router;
