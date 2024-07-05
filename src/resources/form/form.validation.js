const Joi = require("joi");

const optionSchema = Joi.object({
  label: Joi.string().required(),
  value: Joi.string().required(),
});

const fieldSchema = Joi.object({
  type: Joi.string().required(),
  label: Joi.string().required(),
  value: Joi.string().optional().default(""),
  options: Joi.array().items(optionSchema).optional().default([]),
});

const create = Joi.object({
  name: Joi.string().required(),
  fields: Joi.array().items(fieldSchema).required(),
});

const update = Joi.object({
  name: Joi.string().required(),
  fields: Joi.array().items(fieldSchema).required(),
  deleted: Joi.boolean().optional().default(false),
});

module.exports = {
  create,
  update,
};
