const { Router } = require("express");
const { isAuthenticated } = require("../../auth/jwttoken");

const {
  addGig,
  submitReview,
  deleteGig,
  showAllGigs,
  showUserGigs,
} = require("../controllers");
const routes = Router();

routes.post("/create-gig", isAuthenticated, addGig);
routes.post("/submit-review", isAuthenticated, submitReview);
routes.post("/delete-gig", isAuthenticated, deleteGig);
routes.post("/get-all-gigs", isAuthenticated, showAllGigs);
routes.post("/get-user-gigs", isAuthenticated, showUserGigs);
module.exports = routes;
