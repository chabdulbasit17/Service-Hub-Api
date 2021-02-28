const CONFIG = require("../config/config");
const jwt = require("jsonwebtoken");

const generateJWTauthToken= (username)=>{
    try {
        const ACCESS_TOKEN = jwt.sign({ username }, CONFIG.JWT_ACCESS_SECRET, {
          expiresIn: "1d",
        });
        return ACCESS_TOKEN;
      } catch (err) {
        return null;
      }
}


module.exports = {
    generateJWTauthToken
}