const { signUp, signIn, validateEmail, logout } = require("./userController");

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
  createOrder,
  cancelOrder,
  getAllOrdersForUser,
};
