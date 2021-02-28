const express = require("express");
const routes = require("./src/routes");
const CONFIG = require("./config/config");
const bodyParser = require("body-parser");
const sgMail = require('@sendgrid/mail')
const cookieParser = require('cookie-parser')

// Connect to Database
require("./database")

// Set Sengrid API Key to send emails
sgMail.setApiKey(CONFIG.SENGRID_API_KEY);


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
app.use(cookieParser());

app.get("/test", (req,res)=>{

  const msg = {
    to: 'bcsf17m547@pucit.edu.pk', // Change to your recipient
    from: 'servicehubinc@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail.send(msg).then(()=>{
    console.log("sent");
  }).catch((err)=>{
    res.send(err)
  })

})

app.use("/api/v1/", routes);



app.listen(CONFIG.PORT, (err) => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
      return;
    }
    console.log(`App is running on port ${CONFIG.PORT}`); // eslint-disable-line no-console
});
  
module.exports = app;
  