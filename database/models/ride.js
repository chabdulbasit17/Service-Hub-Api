const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        source: { type: String, required: true },
        destination: { type: String, required: true },
        desc: { type: String, required: true },
        pickupDate: { type: Date, required: true },
        pickupTime: { type: Date, required: true },
        passengers: { type: Number, required: true },
        fare: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Ride", userSchema);