const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true},
    heading: { type: String, required: true },
    description: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const content = mongoose.model("Contents", contentSchema);
module.exports = content;
