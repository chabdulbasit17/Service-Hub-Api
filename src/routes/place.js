const { Router } = require("express");
const { Place } = require("../../database/models")
const paginatedResult = require("../helpers/pagination");

const {
  AddPlace,
  GetAllPlaces,
  GetUserPlaces,
  SubmitPlaceReview,
  DeletePlace,
  GetPlace,
} = require("../controllers");
const { isAuthenticated } = require("../../auth/jwttoken");
const routes = Router();

routes.post("/add-place", isAuthenticated, AddPlace);
routes.post("/all-places", isAuthenticated, paginatedResult(Place), GetAllPlaces);
routes.post("/user-places", isAuthenticated, GetUserPlaces);
routes.post("/submit-review", isAuthenticated, SubmitPlaceReview);
routes.post("/delete-place", isAuthenticated, DeletePlace);
routes.post("/get-place", isAuthenticated, GetPlace);

module.exports = routes;
