const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    buyer: { type: String, required: true },
    seller: { type: String, required: true },
    gigID: { type: String, required: true },
    due: { type: Date, required: true },
    status: {type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", userSchema);
