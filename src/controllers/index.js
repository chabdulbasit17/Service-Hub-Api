const { signUp, signIn, validateEmail, logout } = require("./userController");

const {
  addGig,
  submitReview,
  deleteGig,
  showAllGigs,
  showUserGigs,
} = require("./gigController");

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
};
