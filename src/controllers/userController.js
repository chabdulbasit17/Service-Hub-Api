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
    const check = false;
    const pwdCompare = bcrypt.compare(
      password,
      authUser.password,
      function (err, result) {
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
          } else {
            // Means the user has not confirmed their email yet
            res.json({
              error: true,
              message: "Please verify your email first",
            });
            return;
          }
        } else {
          res.json({
            error: true,
            message: "The entered password is wrong",
          });
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

const resetPassword = async (req, res) => {
  let { oldpassword, newpassword } = req.body;
  const username = req.user.username;
  const authUser = await User.findOne({ username }).exec();
  const pwdCmp = bcrypt.compare(
    oldpassword,
    authUser.password,
    async function (err, result) {
      if (err) {
        res.json({
          error: true,
          message: "Your entered old password didn't match.",
        });
        return;
      }
      try {
        const salt = await bcrypt.genSalt();
        newpassword = await bcrypt.hash(newpassword, salt);
      } catch (err) {
        res.json({
          error: true,
          message: "An unexpected error occured.",
        });
        console.log(err);
        return;
      }
      try {
        await User.findOneAndUpdate({ username }, { password: newpassword });
      } catch (err) {}
      res.json({
        error: false,
        message: "Password successfully updated",
      });
    }
  );
};

const getBalance = async (req, res) => {
  try {
    const username = req.user.username;
    const data = await User.findOne({ username: username });
    res.json({
      error: false,
      balance: data.totalBalance,
      earnings: data.totalEarnings,
      spent: data.totalReimbursements,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An error occured. This may be because the link has expired.",
    });
  }
};

const getUserData = async (req, res) => {
  try {
    const username = req.user.username;
    const data = await User.find({ username });
    res.json({
      error: false,
      data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An unexpected error occured",
    });
  }
};

const completeProfile = async (req, res) => {
  try {
    const username = req.user.username;
    const { age, city, country, skills, about } = req.body;
    await User.findOneAndUpdate(
      { username },
      { age, city, country, skills, about, completed: true }
    );
    res.json({
      error: false,
      message: "Your profile has been updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: true,
      message: "An unexpected error occured. Please try again",
    });
  }
};

const getOtherUserData = async (req, res) => {
  try {
    const username = req.body.username;
    console.log(username.username);
    const data = await User.find({ username });
    res.json({
      error: false,
      data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An unexpected error occured",
    });
  }
};

module.exports = {
  signUp,
  signIn,
  validateEmail,
  logout,
  getBalance,
  resetPassword,
  getUserData,
  completeProfile,
  getOtherUserData,
};
