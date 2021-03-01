const { config } = require("dotenv");
config({ path: "./sample.env" });

module.exports = {
  PORT: process.env.PORT,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  SENGRID_API_KEY: process.env.SENGRID_KEY,
  SENDER_EMAIL: process.env.SENDER_EMAIL,
  JWT_EMAIL_SECRET: process.env.JWT_EMAIL_SECRET,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
};
