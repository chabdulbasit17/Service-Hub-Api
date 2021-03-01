const { Router } = require("express");

const routes = Router();

routes.use("/user", require("./user"));

module.exports = routes;
