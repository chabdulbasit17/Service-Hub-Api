const { Router } = require("express");
const {
  createOrder,
  cancelOrder,
  getAllOrdersForUser,
  getAllRequestsForUser,
  submitOrder,
  verifyOrder,
  bookRide,
  completeRide,
  completeStay,
  bookOrder,
  reviewOrder,
} = require("../controllers");
const { isAuthenticated } = require("../../auth/jwttoken");
const routes = Router();

routes.post("/place-order", isAuthenticated, createOrder);
routes.post("/cancel-order", isAuthenticated, cancelOrder);
routes.post("/my-orders", isAuthenticated, getAllOrdersForUser);
routes.post("/my-requests", isAuthenticated, getAllRequestsForUser);
routes.post("/submit-order", isAuthenticated, submitOrder);
routes.post("/verify-order", isAuthenticated, verifyOrder);
routes.post("/book-ride", isAuthenticated, bookRide);
routes.post("/complete-ride", isAuthenticated, completeRide);
routes.post("/complete-stay", isAuthenticated, completeStay);
routes.post("/book-order", isAuthenticated, bookOrder);
routes.post("/review-order", isAuthenticated, reviewOrder);

module.exports = routes;