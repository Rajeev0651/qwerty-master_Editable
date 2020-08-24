const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContentDetails = new Schema(
  {
    userId: { type: String, required: true },
    contentid: { type: String },
    bylatest : { type : Number},
    byLikes : { type : Number},
    parameters: [
      {
        like: { type: Number, default: "0" },
      },
      {
        join: { type: Number, default: "0" },
      },
      {
        engage: { type: Number, default: "0" },
      },
    ],
  },
  { timestamps: true }
);

const content = mongoose.model("ContentsDetails", ContentDetails);
module.exports = content;
