const { Router } = require("express");
const {signUp, signIn} = require("../controllers")
const routes = Router();

routes.get("/signin", signIn);
routes.get("/signup", signUp);




module.exports = routes;