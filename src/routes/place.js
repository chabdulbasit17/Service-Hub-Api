const { Router } = require("express");
const {
  AddPlace,
  GetAllPlaces,
  GetUserPlaces,
  SubmitPlaceReview,
} = require("../controllers");
const { isAuthenticated } = require("../../auth/jwttoken");
const routes = Router();

routes.post("/add-place", isAuthenticated, AddPlace);
routes.post("/all-places", isAuthenticated, GetAllPlaces);
routes.get("/user-places", isAuthenticated, GetUserPlaces);
routes.post("/submit-review", isAuthenticated, SubmitPlaceReview);

module.exports = routes;
