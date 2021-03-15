const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    reviews: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Place", userSchema);
