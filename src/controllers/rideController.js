const { Ride } = require("../../database/models");
const { User } = require("../../database/models");

const AddRide = async (req, res) => {
  const username = req.user.username;
  const {
    source,
    destination,
    desc,
    pickupDate,
    pickupTime,
    passengers,
    fare,
  } = req.body;
  try {
    const ride = await Ride.create({
      username,
      source,
      destination,
      desc,
      pickupDate,
      pickupTime,
      passengers,
      fare,
      status: "Not Taken",
    });

    res.json({
      error: false,
      message: "Your ride has successfully been created",
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message:
        "An unexpected error occured. Please enter correct data and try again in a while",
    });
  }
};

const SubmitRideReview = async (req, res) => {
  const { gigID, review } = req.body;
  const username = req.user.username;
  try {
    const check = await Gig.updateOne(
      {
        _id: gigID,
      },
      {
        $push: {
          reviews: {
            username: username,
            review: review,
          },
        },
      }
    );
    res.json({
      error: false,
      message: "Your review has been submitted",
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "Your review was not submitted due to an error",
    });
  }
};

const DeleteRide = async (req, res) => {
  const { rideID } = req.body;
  try {
    await Ride.deleteOne({ _id: rideID });
    res.json({
      error: false,
      message: "Your ride was deleted",
    });
  } catch (err) {
    res.json({
      error: true,
      message: "An error occured while performing the operation",
    });
  }
};

const GetAllRides = async (req, res) => {
  const name = req.user.username;
  try {
    const data = await Ride.find({ username: {$ne: name}, status: "Not Taken" });
    res.json({
      error: false,
      data: data,
    });
  } catch (err) {
    res.json({
      error: true,
      message: "An error occured while fetching data",
    });
  }
};

const GetUserRides = async (req, res) => {
  const username = req.user.username;
  try {
    const data = await Ride.find({ username });
    res.json({
      error: false,
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An error occured while fetching data",
    });
  }
};

const GetRide = async (req, res) => {
  const { rideID } = req.body;
  try {
    const rideData = await Ride.findById(rideID)
    const reviews = await User.find({ username: rideData.username }, {rideReviews: 1, _id: 0})
    splitDate = rideData.pickupDate.toString().split(" ")
    splitTime = rideData.pickupTime.toString().split(" ")
    res.json({
      error: false,
      rideData: {
        username: rideData.username,
        source: rideData.source,
        destination: rideData.destination,
        passengers: rideData.passengers,
        fare: rideData.fare,
        pickupDate: splitDate[0] + " " + splitDate[1] + " " + splitDate[2] + " " + splitDate[3],
        pickupTime: splitTime[4],
        status: rideData.status,
      },
      reviews: reviews,
    });
  } catch (err) {
    res.json({
      error: true,
      message: "An error occured while performing the operation",
    });
  }
}

const GetMyBookings = async (req, res) => {
  const name = req.user.username;
  try {
    const data = await Ride.find({ buyer: name });
    res.json({
      error: false,
      data: data,
    });
  } catch (err) {
    res.json({
      error: true,
      message: "An error occured while fetching data",
    });
  }
};

const GetMyRides = async (req, res) => {
  const name = req.user.username;
  try {
    const data = await Ride.find({ username: name, status: {$ne: "Not Taken"} });
    res.json({
      error: false,
      data: data,
    });
  } catch (err) {
    res.json({
      error: true,
      message: "An error occured while fetching data",
    });
  }
};

module.exports = {
  AddRide,
  SubmitRideReview,
  DeleteRide,
  GetAllRides,
  GetUserRides,
  GetRide,
  GetMyBookings, 
  GetMyRides,
};
