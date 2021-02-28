const { Router } = require("express");
const {signUp, signIn, validateEmail} = require("../controllers")
const routes = Router();

routes.post("/signin", signIn);
routes.post("/signup", signUp);
routes.get("/confirmation/:token", validateEmail);



module.exports = routes;