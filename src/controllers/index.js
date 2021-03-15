const { signUp, signIn, validateEmail, logout } = require("./userController");
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
} = require("./placeController");

module.exports = {
  signUp,
  signIn,
  validateEmail,
  logout,
  addGig,
  submitReview,
  deleteGig,
  showAllGigs,
  showUserGigs,
  AddPlace,
  GetAllPlaces,
  GetUserPlaces,
  SubmitPlaceReview,
  createOrder,
  cancelOrder,
  getAllOrdersForUser,
  getAllNotifications,
};
