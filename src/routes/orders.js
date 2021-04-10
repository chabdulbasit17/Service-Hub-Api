const { Router } = require("express");
const {
  createOrder,
  cancelOrder,
  getAllOrdersForUser,
  submitOrder,
  verifyOrder,
} = require("../controllers");
const { isAuthenticated } = require("../../auth/jwttoken");
const routes = Router();

routes.post("/place-order", isAuthenticated, createOrder);
routes.post("/cancel-order", isAuthenticated, cancelOrder);
routes.post("/my-orders", isAuthenticated, getAllOrdersForUser);
routes.post("/submit-order", isAuthenticated, submitOrder);
routes.post("/verify-order", isAuthenticated, verifyOrder);
module.exports = routes;
