const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    confirmed: { type: Boolean, default: false }, // Confirm propert will be changed to true after a user has confirmed his/her email through two factor auth
  },
  {
    timestamps: true,
  }
);

/**
 * The function down below will fire just before the user is saved into the database.
 * So what we do is encrypt the @property {password}
 * using a 3rd party library called bcrypt.
 */
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
