const { Router } = require("express");
const {
  signUp,
  signIn,
  validateEmail,
  logout,
  getBalance,
  resetPassword,
  getUserData,
  completeProfile,
  getOtherUserData,
} = require("../controllers");
const { isAuthenticated } = require("../../auth/jwttoken");
const routes = Router();

routes.post("/signin", signIn);
routes.post("/signup", signUp);
routes.get("/confirmation/:token", validateEmail);
routes.post("/logout", isAuthenticated, logout);
routes.post("/reset-password", isAuthenticated, resetPassword);
routes.post("/get-balance", isAuthenticated, getBalance);
routes.post("/userdata", isAuthenticated, getUserData);
routes.post("/complete-profile", isAuthenticated, completeProfile);
routes.post("/otheruserdata", isAuthenticated, getOtherUserData);

module.exports = routes;
