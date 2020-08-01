const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    content: [
      {
        heading: { type: String },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const content = mongoose.model("Contents", contentSchema);
module.exports = content;
