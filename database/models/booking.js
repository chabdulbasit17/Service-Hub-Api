const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    buyer: { type: String, required: true },
    seller: { type: String, required: true },
    placeID: { type: String, required: true },
    due: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", userSchema);
