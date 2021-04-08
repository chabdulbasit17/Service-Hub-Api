const {
  signUp,
  signIn,
  validateEmail,
  logout,
  resetPassword,
} = require("./userController");
const { getAllNotifications } = require("./notificationController");
const {
  addGig,
  submitReview,
  deleteGig,
  showAllGigs,
  showUserGigs,
} = require("./gigController");

const {
  createOrder,
  cancelOrder,
  getAllOrdersForUser,
} = require("./orderController");

const {
  AddPlace,
  GetAllPlaces,
  GetUserPlaces,
  SubmitPlaceReview,
  DeletePlace,
} = require("./placeController");

module.exports = {
  signUp,
  signIn,
  validateEmail,
  logout,
  resetPassword,
  addGig,
  submitReview,
  deleteGig,
  showAllGigs,
  showUserGigs,
  AddPlace,
  GetAllPlaces,
  GetUserPlaces,
  SubmitPlaceReview,
  DeletePlace,
  createOrder,
  cancelOrder,
  getAllOrdersForUser,
  getAllNotifications,
};
