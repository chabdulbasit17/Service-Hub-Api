const { Router } = require("express");
const { getAllNotifications, DeleteNotification } = require("../controllers");
const { isAuthenticated } = require("../../auth/jwttoken");
const routes = Router();

routes.post("/all", isAuthenticated, getAllNotifications);
routes.post("/del", isAuthenticated, DeleteNotification);
module.exports = routes;
