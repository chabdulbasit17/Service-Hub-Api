const {
  Order,
  Gig,
  Notification,
  Ride,
  Place,
  User,
  Booking,
} = require("../../database/models");

const createOrder = async (req, res) => {
  const userBuyer = req.user.username;
  const { gigID, seller } = req.body;
  try {
    const userData = await User.findOne({ username: userBuyer })
    const gigData = await Gig.findById(gigID)
    if(userData.totalBalance - gigData.price >= 0){
      await Notification.create({
        username: seller,
        type: "new-order",
        text: "You have received a new order.",
      });
      await Order.create({
        buyer: userBuyer,
        seller: seller,
        gigID: gigID,
        due: new Date(new Date().getTime()+(gigData.duration*24*60*60*1000)),
        status: "Pending",
      });
      await User.findOneAndUpdate({username: userBuyer}, {totalBalance: userData.totalBalance - gigData.price})
      res.json({
        error: false,
        message: "You have successfully placed this order",
      });
    }
    else{
      res.json({
        error: false,
        message: "You don't have enough coins to buy this service",
      });
    }
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
  const { rideID, owner } = req.body;
  try {
    console.log(rideID)
    const userData = await User.findOne({ username: username })
    const rideData = await Ride.findById(rideID)
    if(userData.totalBalance - rideData.fare >= 0){
      await Ride.findOneAndUpdate(
        { _id: rideID },
        { buyer: username, status: "Booked" }
      );
  
      await Notification.create({
        username: owner,
        type: "riderequest",
        text: `${username} wants to share your ride with you !`,
      });
      await User.findOneAndUpdate({username: username}, {totalBalance: userData.totalBalance - rideData.fare})
      res.json({
        error: false,
        message: "Your ride has been booked",
      });
    }
    else{
      res.json({
        error: false,
        message: "You don't have enough coins to buy this service",
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

const completeRide = async (req, res) => {
  const username = req.user.username;
  const { name, review, rating, rideID } = req.body;
  try {
    const rideData = await Ride.findById(rideID)
    const userData = await User.findOne({ username: rideData.username })
    const buyerData = await User.findOne({ username: rideData.buyer })
    await User.findOneAndUpdate({username: rideData.username}, {totalBalance: userData.totalBalance + rideData.fare, totalEarnings: userData.totalEarnings + rideData.fare})
    await User.findOneAndUpdate({username: rideData.buyer}, {totalReimbursements: buyerData.totalReimbursements + rideData.fare})
    await User.updateOne(
      { username: name },
      {
        $push: {
          rideReviews: {
            reviewer: username,
            review: review,
            rating: rating,
          },
        },
      }
    );
    await Ride.findOneAndUpdate({ _id: rideID }, { status: "Completed" });
    res.json({
      error: false,
      message: "Your ride has been completed",
    });

    let rideDetails = await Ride.find({ _id: rideID });
    let rideOwner = rideDetails[0].username;

    await Notification.create({
      username: rideOwner,
      type: "ridecomplete",
      text: `${username} left a review for your ride!`,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An unexpected error occured",
    });
  }
};

const completeStay = async (req, res) => {
  const username = req.user.username;
  const { bookingID, review, rating, placeID } = req.body;
  try {
    const bookingData = await Booking.findById(bookingID)
    const ownerData = await User.findOne({ username: bookingData.owner })
    const renteeData = await User.findOne({ username: bookingData.rentee })
    const placeData = await Place.findById(bookingData.placeID)
    //const days = Math.floor((new Date(bookingData.checkOut.split("T")[0]) - new Date(bookingData.checkIn.split("T")[0])) / (3600000*24))
    await User.findOneAndUpdate({username: bookingData.owner}, {totalBalance: ownerData.totalBalance + (placeData.rent), totalEarnings: ownerData.totalEarnings + (placeData.rent)})
    await User.findOneAndUpdate({username: bookingData.rentee}, {totalReimbursements: renteeData.totalReimbursements + (placeData.rent)})
    await Place.updateOne(
      { _id: placeID },
      {
        $push: {
          reviews: {
            reviewer: username,
            review: review,
            rating: rating,
          },
        },
      }
    );
    await Booking.findOneAndUpdate({ _id: bookingID }, { status: "Completed" });
    res.json({
      error: false,
      message: "Your stay has been completed",
    });

    const PLACE = await Place.findById({ _id: placeID });
    const PlaceOwner = PLACE.username;

    await Notification.create({
      username: PlaceOwner,
      type: "placecomplete",
      text: `${username} have completed their stay and left a review`,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An unexpected error occured",
    });
  }
};

const cancelOrder = async (req, res) => {
  const username = req.user.username;
  const { orderID } = req.body;
  try {
    const seller = await Order.findById({ _id: orderID });
    if (seller.seller === username) {
      const userData = await User.findOne({ username: seller.buyer })
      const gigData = await Gig.findById(seller.gigID)
      await User.findOneAndUpdate({username: seller.buyer}, {totalBalance: userData.totalBalance + gigData.price})
      await Order.findOneAndUpdate({ _id: orderID }, { status: "Cancelled" });
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

const getAllRequestsForUser = async (req, res) => {
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
    await Order.findOneAndUpdate(
      { _id: orderID },
      { status: "Check", driveLink: driveLink }
    );
    const data = await Order.findById({ _id: orderID });
    await Notification.create({
      username: data.buyer,
      type: "order-received",
      text: `${data.seller} has delivered your order. Please check and verify`,
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

const reviewOrder = async (req, res) => {
  const { orderID } = req.body;
  try {
    await Order.findOneAndUpdate({ _id: orderID }, { status: "Review" });
    const data = await Order.findById({ _id: orderID });
    await Notification.create({
      username: data.seller,
      type: "order-received",
      text: `${data.buyer} has requested to review the work`,
    });
    res.json({
      error: false,
      message: "There is a request for review of work",
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
  const username = req.user.username;
  const { orderID, gigID, review, rating } = req.body;
  try {
    const orderData = await Order.findById(orderID)
    const sellerData = await User.findOne({ username: orderData.seller })
    const buyerData = await User.findOne({ username: orderData.buyer })
    const gigData = await Gig.findById(orderData.gigID)
    await User.findOneAndUpdate({username: orderData.seller}, {totalBalance: sellerData.totalBalance + gigData.price, totalEarnings: sellerData.totalEarnings + gigData.price})
    await User.findOneAndUpdate({username: orderData.buyer}, {totalReimbursements: buyerData.totalReimbursements + gigData.price})
    await Gig.updateOne(
      { _id: gigID },
      {
        $push: {
          reviews: {
            reviewer: username,
            review: review,
            rating: rating,
          },
        },
      }
    );
    await Order.findOneAndUpdate({ _id: orderID }, { status: "Completed" });
    const data = await Order.findById({ _id: orderID });
    await Notification.create({
      username: data.seller,
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

const bookOrder = async (req, res) => {
  const { orderID } = req.body;
  try {
    await Order.findOneAndUpdate({ _id: orderID }, { status: "Booked" });

    const orderDetails = await Order.findById({ _id: orderID });
    const buyer = orderDetails.buyer;
    const seller = orderDetails.seller;

    await Notification.create({
      username: buyer,
      type: "order-approve",
      text: `${seller} have accepted your bid and started working on your order.`,
    });
    res.json({
      error: false,
      message: "Your request has been approved",
    });
  } catch (err) {
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
  reviewOrder,
  verifyOrder,
  bookRide,
  completeRide,
  completeStay,
  bookOrder,
  getAllRequestsForUser,
};
