const FormModel = require("./form.model");
/**
 * Create a new form
 */
const create = async (name, fields) => {
  try {
    const form = await FormModel.create({ name, fields });
    return form;
  } catch (error) {
    throw new Error("Unable to create form");
  }
};

/**
 * Get forms
 */
const get = async () => {
  try {
    const forms = await FormModel.find({ deleted: { $ne: true } });
    return forms;
  } catch (error) {
    throw new Error("Unable to create form");
  }
};

/**
 * Retrieve form
 */
const getById = async (id) => {
  try {
    const form = await FormModel.findOne({ _id: id, deleted: { $ne: true } });
    return form;
  } catch (error) {
    throw new Error("Unable to retrieve form");
  }
};

/**
 * Update form by ID
 */
const update = async (id, body) => {
  try {
    const form = await FormModel.findByIdAndUpdate(id, body, { new: true });
    return form;
  } catch (error) {
    throw new Error("Unable to update form");
  }
};

/**
 * Will mark the form as deleted logically but still exist in the DB
 */
const softDelete = async (id) => {
  try {
    const updatedForm = await FormModel.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    return updatedForm;
  } catch (error) {
    throw new Error("Unable to soft delete form");
  }
};

module.exports = {
  create,
  get,
  getById,
  update,
  softDelete,
};
