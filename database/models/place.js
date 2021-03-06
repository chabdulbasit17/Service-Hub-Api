const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    desc: { type: String, default: 0 },
    propertyType: { type: String, default: 0 },
    totalRooms: { type: String, default: 0 },
    guestPlaceType: { type: String, default: 0 },
    totalGuests: { type: Number, default: 0 },
    totalBeds: { type: Number, default: 0 },
    totalBathrooms: { type: Number, default: 0 },
    basicAmenities: { type: Array, default: [] },
    safetyAmenities: { type: Array, default: [] },
    rent: { type: Number, require: true },
    Position: {
      lat: { type: Number },
      lng: { type: Number },
      default: { lat: 0, lng: 0 },
    },
    reviews: { type: Array, default: [] },
    bookingDates: { type: Array, default: []},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Place", userSchema);
