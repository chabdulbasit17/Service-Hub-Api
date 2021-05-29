const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    owner: { type: String, required: true },
    rentee: { type: String, required: true },
    placeID: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", userSchema);
