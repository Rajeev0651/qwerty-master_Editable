const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    contentId: { type: String, required: true },
    content: [
      {
        heading: { type: String },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const content = mongoose.model("FeedContents", contentSchema);
module.exports = content;
