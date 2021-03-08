const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    type: { type: String, required: true },
    text: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", userSchema);
