const { User } = require("../../database/models");
const { confirmUserEmail } = require("../../auth/email");
const { generateJWTauthToken } = require("../../auth/jwttoken");
const jwt = require("jsonwebtoken");
const CONFIG = require("../../config/config");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { username, first_name, last_name, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      first_name,
      last_name,
      email,
      password,
    });

    const EMAIL_JWT_TOKEN = jwt.sign(
      { username, email },
      CONFIG.JWT_EMAIL_SECRET,
      {
        expiresIn: "1d",
      }
    );

    confirmUserEmail(EMAIL_JWT_TOKEN, email);

    res.json({
      error: false,
      message: "User successfully created",
    });
  } catch (err) {
    res.json({
      error: true,
      message: "An error occured",
    });
    console.log(err);
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const authUser = await User.findOne({ username }).exec();
    // If the username entered return no results
    if (authUser === null) {
      res.json({
        error: true,
        message: "The user with entered username doesnt exists",
      });
      return;
    }

    console.log(authUser);
    // User has been returned. Now matching their passwords
    const pwdCompare = bcrypt.compare(
      password,
      authUser.password,
      function (err, result) {
        if (err) {
          // means passwords donot match
          console.log(err);
          res.json({
            error: true,
            message: "The entered password is wrong",
          });
          return;
        }
        if (result) {
          if (authUser.confirmed) {
            // means user has validated their email. At this point its safe to send back a success response
            const accessToken = generateJWTauthToken(authUser.username);
            res.cookie("X-Auth", accessToken, { httpOnly: true });
            res.json({
              error: false,
              message: "Successfully Signed In",
              data: authUser,
            });
            return;
          } else {
            // Means the user has not confirmed their email yet
            res.json({
              error: true,
              message: "Please verify your email first",
            });
            return;
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An unexpected Error occured. Please try again in a while",
    });
  }
};

const validateEmail = async (req, res) => {
  try {
    const token = req.params.token;

    const { username } = jwt.verify(token, CONFIG.JWT_EMAIL_SECRET);

    const update = await User.findOneAndUpdate(
      { username: username },
      { confirmed: true }
    );
    console.log(update);
    res.json({
      error: false,
      message:
        "Your email has been verified successfully. Now you can sign in.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An error occured. This may be because the link has expired.",
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("X-Auth");
  res.json({
    error: false,
    message: "Successfully Logged Out",
  });
};

module.exports = {
  signUp,
  signIn,
  validateEmail,
  logout,
};
