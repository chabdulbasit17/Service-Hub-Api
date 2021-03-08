const { Router } = require("express");
const { getAllNotifications } = require("../controllers");
const { isAuthenticated } = require("../../auth/jwttoken");
const routes = Router();

routes.post("/all", isAuthenticated, getAllNotifications);

module.exports = routes;
