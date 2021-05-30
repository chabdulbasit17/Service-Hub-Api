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

const DeleteNotification = async (req, res) => {
  const { id } = req.body;
  try {
    await Notification.deleteOne({ _id: id });
    res.json({ error: false });
  } catch (err) {
    console.log(err);
    res.json({ error: true });
  }
};

module.exports = { getAllNotifications, DeleteNotification };
