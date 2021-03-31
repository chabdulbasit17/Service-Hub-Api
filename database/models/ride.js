const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Ride", userSchema);