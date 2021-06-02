const {
  signUp,
  signIn,
  validateEmail,
  logout,
  resetPassword,
  getBalance,
  getUserData,
  completeProfile,
  getOtherUserData,
} = require("./userController");
const {
  getAllNotifications,
  DeleteNotification,
} = require("./notificationController");
const {
  addGig,
  submitReview,
  deleteGig,
  showAllGigs,
  showUserGigs,
  getGig,
  showGigDescription,
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
  bookOrder,
  reviewOrder,
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
  getBalance,
  addGig,
  submitReview,
  deleteGig,
  showAllGigs,
  showUserGigs,
  getGig,
  showGigDescription,
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
  reviewOrder,
  getAllOrdersForUser,
  getAllRequestsForUser,
  submitOrder,
  verifyOrder,
  bookRide,
  completeRide,
  completeStay,
  bookOrder,
  getAllNotifications,
  DeleteNotification,
  getUserData,
  completeProfile,
  getOtherUserData,
};
