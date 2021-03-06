const { Router } = require("express");
const Ride = require("../../database/models/ride.js")
const paginatedResult = require("../helpers/pagination");

const {
  AddRide,
  GetAllRides,
  GetUserRides,
  SubmitRideReview,
  DeleteRide,
  GetRide,
  GetMyBookings,
  GetMyRides,
} = require("../controllers");
const { isAuthenticated } = require("../../auth/jwttoken");
const routes = Router();

routes.post("/add-ride", isAuthenticated, AddRide);
routes.post("/all-rides", isAuthenticated, paginatedResult(Ride), GetAllRides);
routes.post("/user-rides", isAuthenticated, GetUserRides);
routes.post("/submit-review", isAuthenticated, SubmitRideReview);
routes.post("/delete-ride", isAuthenticated, DeleteRide);
routes.post("/get-ride", isAuthenticated, GetRide);
routes.post("/get-my-rides", isAuthenticated, GetMyRides);
routes.post("/get-my-bookings", isAuthenticated, GetMyBookings);

module.exports = routes;
