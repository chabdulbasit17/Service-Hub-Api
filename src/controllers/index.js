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
  getGig,
} = require("./gigController");

const {
  createOrder,
  cancelOrder,
  getAllOrdersForUser,
  submitOrder,
  verifyOrder,
  bookRide,
  completeRide,
} = require("./orderController");

const {
  AddPlace,
  GetAllPlaces,
  GetUserPlaces,
  SubmitPlaceReview,
  DeletePlace,
  GetPlace,
} = require("./placeController");

const {
  AddRide,
  GetAllRides,
  GetUserRides,
  SubmitRideReview,
  DeleteRide,
  GetRide,
  GetMyBookings,
  GetMyRides,
} = require("./rideController");

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
  getGig,
  AddPlace,
  GetAllPlaces,
  GetUserPlaces,
  SubmitPlaceReview,
  DeletePlace,
  GetPlace,
  AddRide,
  GetAllRides,
  GetUserRides,
  SubmitRideReview,
  DeleteRide,
  GetRide,
  GetMyBookings,
  GetMyRides,
  createOrder,
  cancelOrder,
  getAllOrdersForUser,
  submitOrder,
  verifyOrder,
  bookRide,
  completeRide,
  getAllNotifications,
};
