const sgMail = require('@sendgrid/mail');
const CONFIG = require("../config/config");

sgMail.setApiKey(CONFIG.SENGRID_API_KEY);

const confirmUserEmail = async (token, email) => {
    const buttonStyle =
      "text-decoration:none;border:none; background-color: #008CBA; color: white;padding: 15px 32px; text-align: center;font-size: 16px;";
    const targetLink = `http://localhost:5000/api/v1/user/confirmation/${token}`;
    const msg1 = `<h1 style="color:black">Hey there ! Welcome to Service</h1>.<br><a href="${targetLink}" style="${buttonStyle}">Please Click Here To Confirm Your Email<a/><br><br>`;
    try {
      const msg = {
        to: email,
        from: CONFIG.SENDER_EMAIL,
        subject: "Welcome To ServiceHub",
        text: ".",
        html: msg1,
      };
      await sgMail.send(msg);
      return true;
    } catch (err) {
      return false;
    }
  };

  module.exports = {
      confirmUserEmail
  }