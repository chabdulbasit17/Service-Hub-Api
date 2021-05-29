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
  getAllRequestsForUser,
  submitOrder,
  verifyOrder,
  bookRide,
  completeRide,
  completeStay,
} = require("./orderController");

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
  RequestPlace,
  GetMyRequests,
  GetMyPlaces,
  CancelPlace,
  BookPlace,
  ShowPlaceDescription,
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
  getAllRequestsForUser,
  submitOrder,
  verifyOrder,
  bookRide,
  completeRide,
  completeStay,
  getAllNotifications,
};
