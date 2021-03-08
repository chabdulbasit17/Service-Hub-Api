const { Router } = require("express");

const routes = Router();

routes.use("/user", require("./user"));
routes.use("/gigs", require("./gig"));
routes.use("/order", require("./orders"));
routes.use("/notifications", require("./notifications"));
module.exports = routes;
