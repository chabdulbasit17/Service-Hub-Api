const express = require("express");
const routes = require("./src/routes");
const CONFIG = require("./config/config");
const bodyParser = require("body-parser");

// Connect to Database
require("./database")

const app = express();


/**
 * CORS 
 */
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin, X-Requested-With, Accept"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
app.use(bodyParser.json());



app.use("/api/v1/", routes);



app.listen(CONFIG.PORT, (err) => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
      return;
    }
    console.log(`App is running on port ${CONFIG.PORT}`); // eslint-disable-line no-console
});
  
module.exports = app;
  