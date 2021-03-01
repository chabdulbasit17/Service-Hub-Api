const CONFIG = require("../config/config");
const jwt = require("jsonwebtoken");
const { use } = require("../src/routes");

const generateJWTauthToken = (username) => {
  try {
    const ACCESS_TOKEN = jwt.sign({ username }, CONFIG.JWT_ACCESS_SECRET, {
      expiresIn: "1d",
    });
    return ACCESS_TOKEN;
  } catch (err) {
    return null;
  }
};

// Middleware that will protect routes
const isAuthenticated = (req, res, next) => {
  let authCookie = req.cookies["X-Auth"];
  // If cookie wasnt sent from client side, it means they are not logged in
  if (!authCookie) {
    res.json({
      error: true,
      message: "You are not authenticated to perform the requested operation",
    });
  } else {
    // Verifying token using JWT
    jwt.verify(authCookie, CONFIG.JWT_ACCESS_SECRET, (err, usr) => {
      if (err) {
        console.log(err);
        res.json({
          error: true,
          message: "Your session has expired. Please login again.",
        });
      } else {
        req.user = usr;
        next();
      }
    });
  }
};

module.exports = {
  generateJWTauthToken,
  isAuthenticated,
};
