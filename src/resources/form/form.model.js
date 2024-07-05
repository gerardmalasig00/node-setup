const { Schema, model } = require("mongoose");

const OptionSchema = new Schema({
  label: { type: String, required: true },
  value: { type: String, required: false, default: "" },
});

const FieldSchema = new Schema({
  type: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: String, required: false, default: "" },
  options: { type: [OptionSchema], required: false, default: [] },
});

const FormSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fields: [FieldSchema],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Form", FormSchema);
