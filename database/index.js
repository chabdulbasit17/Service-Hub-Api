const mongoose = require("mongoose");
const CONFIG = require("../config/config");

const mongoConnect = () => {
  mongoose.connect(
    CONFIG.MONGO_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      console.log("Database connected");
    }
  );
  mongoose.Promise = global.Promise;
  mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
  );
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);
};

mongoConnect();
