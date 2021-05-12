const { Router } = require("express");
const { isAuthenticated } = require("../../auth/jwttoken");
const { Gig } = require("../../database/models");
const paginatedResult = require("../helpers/pagination");

const {
  addGig,
  submitReview,
  deleteGig,
  showAllGigs,
  showUserGigs,
  getGig,
} = require("../controllers");
const routes = Router();

routes.post("/create-gig", isAuthenticated, addGig);
routes.post("/submit-review", isAuthenticated, submitReview);
routes.post("/delete-gig", isAuthenticated, deleteGig);
routes.post(
  "/get-all-gigs",
  isAuthenticated,
  paginatedResult(Gig),
  showAllGigs
);
routes.post(
  "/get-user-gigs",
  isAuthenticated,
  paginatedResult(Gig),
  showUserGigs
);
routes.post("/get-gig", isAuthenticated, getGig);
module.exports = routes;
