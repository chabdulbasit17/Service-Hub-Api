const { Notification } = require("../../database/models");

const getAllNotifications = async (req, res) => {
  const username = req.user.username;
  try {
    const data = await Notification.find(
      { username },
      {},
      { sort: { created_at: -1 } }
    ).exec();
    res.json({
      error: false,
      data,
    });
  } catch (err) {
    res.json({
      error: true,
      message: "An unexpected error occured",
    });
  }
};

module.exports = { getAllNotifications };
