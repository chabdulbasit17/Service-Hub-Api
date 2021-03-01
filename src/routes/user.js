const { Router } = require("express");
const { signUp, signIn, validateEmail, logout } = require("../controllers");
const { isAuthenticated } = require("../../auth/jwttoken");
const routes = Router();

routes.post("/signin", signIn);
routes.post("/signup", signUp);
routes.get("/confirmation/:token", validateEmail);
routes.post("/logout", isAuthenticated, logout);

module.exports = routes;
