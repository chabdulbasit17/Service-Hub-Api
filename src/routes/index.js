const { Router } = require("express");

const routes = Router();

routes.use("/user", require("./user"));
routes.use("/gigs", require("./gig"));

module.exports = routes;
