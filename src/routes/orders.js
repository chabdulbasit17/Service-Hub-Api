const { Router } = require("express");
const {
  createOrder,
  cancelOrder,
  getAllOrdersForUser,
} = require("../controllers");
const { isAuthenticated } = require("../../auth/jwttoken");
const routes = Router();

routes.post("/place-order", isAuthenticated, createOrder);
routes.post("/cancel-order", isAuthenticated, cancelOrder);
routes.post("/my-orders", isAuthenticated, getAllOrdersForUser);

module.exports = routes;
