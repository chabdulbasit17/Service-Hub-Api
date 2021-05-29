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
  RequestPlace,
  GetMyRequests,
  GetMyPlaces,
  ShowPlaceDescription,
  CancelPlace,
  BookPlace,
} = require("../controllers");
const { isAuthenticated } = require("../../auth/jwttoken");
const routes = Router();

routes.post("/add-place", isAuthenticated, AddPlace);
routes.post("/all-places", isAuthenticated, paginatedResult(Place), GetAllPlaces);
routes.post("/user-places", isAuthenticated, GetUserPlaces);
routes.post("/submit-review", isAuthenticated, SubmitPlaceReview);
routes.post("/delete-place", isAuthenticated, DeletePlace);
routes.post("/get-place", isAuthenticated, GetPlace);
routes.post("/request-place", isAuthenticated, RequestPlace);
routes.post("/get-my-requests", isAuthenticated, GetMyRequests);
routes.post("/get-my-places", isAuthenticated, GetMyPlaces);
routes.post("/get-description", isAuthenticated, ShowPlaceDescription);
routes.post("/cancel-place", isAuthenticated, CancelPlace);
routes.post("/book-place", isAuthenticated, BookPlace);

module.exports = routes;
