const express = require("express");

const app = express();
app.get("/test",(req,res)=>{
    res.send("Hello There. Test Complete");
})



app.listen(5000, (err) => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
      return;
    }
    console.log(`App is running on port 5000`); // eslint-disable-line no-console
  });
  
  module.exports = app;
  