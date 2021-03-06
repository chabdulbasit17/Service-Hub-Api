const { Order, Gig } = require("../../database/models");

const createOrder = async (req, res) => {
  const userBuyer = req.user.username;
  const { gigID, dueDate } = req.body;
  try {
    const userSeller = await Gig.find({ _id: gigID }, "username").exec();

    await Order.create({
      buyer: userBuyer,
      seller: userSeller[0].username,
      gigID,
      due: dueDate,
    });
    res.json({
      error: false,
      message: "You have successfully placed this order",
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An unexpected error occured. Please try again",
    });
  }
};

const cancelOrder = async (req, res) => {
  const username = req.user.username;
  const { orderID } = req.body;
  try {
    const buyer = await Order.find({ _id: orderID }, "buyer");
    if (buyer === username) {
      await Order.findOneAndUpdate({ _id: orderID }, { isActive: false });
      res.json({
        error: false,
        message: "Your order has been cancelled",
      });
    } else {
      res.json({
        error: true,
        message: "You are not authenticated to cancel this order",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An unexpected error occured",
    });
  }
};

const getAllOrdersForUser = async (req, res) => {
  const username = req.user.username;
  try {
    const data = await Order.find({ seller: username });
    res.json({
      error: false,
      data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An unexpected error occured while fetching data from server",
    });
  }
};

module.exports = {
  createOrder,
  cancelOrder,
  getAllOrdersForUser,
};
