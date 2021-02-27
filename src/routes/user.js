const { Router } = require("express");
const {signUp, signIn} = require("../controllers")
const routes = Router();

routes.post("/signin", signIn);
routes.post("/signup", signUp);




module.exports = routes;