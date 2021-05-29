const { Order, Gig, Notification, Ride, Place, User, Booking } = require("../../database/models");

const createOrder = async (req, res) => {
  const userBuyer = req.user.username;
  const { gigID, dueDate } = req.body;
  try {
    const userSeller = await Gig.find({ _id: gigID }, "username").exec();
    await Notification.create({
      username: userSeller[0].username,
      type: "new-order",
      text: "You have received a new order.",
    });
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

const bookRide = async (req, res) => {
  const username = req.user.username;
  const { rideID } = req.body;
  try {
    await Ride.findOneAndUpdate({ _id: rideID }, { buyer: username, status: "Booked"});
    res.json({
      error: false,
      message: "Your ride has been booked",
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An unexpected error occured",
    });
  }
}

const completeRide = async (req, res) => {
  const username = req.user.username;
  const { name, review, rating, rideID } = req.body;
  try {
    await User.updateOne({ username: name }, { $push : { rideReviews: {
      reviewer: username,
      review: review,
      rating: rating,
    }}});
    await Ride.findOneAndUpdate({ _id: rideID }, { status: "Completed"})
    res.json({
      error: false,
      message: "Your ride has been completed",
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An unexpected error occured",
    });
  }
}

const completeStay = async (req, res) => {
  const username = req.user.username;
  const { bookingID, review, rating, placeID } = req.body;
  try {
    await Place.updateOne({ _id: placeID }, { $push : { reviews: {
      reviewer: username,
      review: review,
      rating: rating,
    }}});
    await Booking.findOneAndUpdate({ _id: bookingID }, { status: "Completed"})
    res.json({
      error: false,
      message: "Your stay has been completed",
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An unexpected error occured",
    });
  }
}

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
    const data = await Order.find({ buyer: username });
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

// This API will be called when a user completes an order and wants to submit the
// file for that. The order status will not be Completed. Rather, it will be in-check
// because the person that has placed the order will verify if the order is completed
// according to their needs
const submitOrder = async (req, res) => {
  const { driveLink, orderID } = req.body;
  try {
    await Order.findOneAndUpdate({ _id: orderID }, { completed: true });
    const userBuyer = await Order.find({ _id: orderID }, "buyer").exec();
    const userSeller = await Order.find({ _id: orderID }, "seller").exec();
    await Notification.create({
      username: userBuyer,
      type: "order-received",
      text: `${userSeller} has delivered your order. Please check and verify`,
    });
    res.json({
      error: false,
      message:
        "You have successfully delivered your order. Please wait for the receipient to verify the order",
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An unexpected error occured. Please try again",
    });
  }
};

// This will be called from the customer. When he sees the files for his order, he will
// verify based on the correctness
const verifyOrder = async (req, res) => {
  const { orderID } = req.body;
  try {
    await Order.findOneAndUpdate({ _id: orderID }, { isActive: false });
    const userSeller = await Order.find({ _id: orderID }, "seller").exec();
    await Notification.create({
      username: userSeller,
      type: "order-verified",
      text: "Congratulations! Your order submission was verified",
    });
    res.json({
      error: false,
      message: "Verification was submitted.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An unexpected error occured. Please try again",
    });
  }
};

module.exports = {
  createOrder,
  cancelOrder,
  getAllOrdersForUser,
  submitOrder,
  verifyOrder,
  bookRide,
  completeRide,
  completeStay,
};
