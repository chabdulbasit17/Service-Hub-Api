const Ride = require("../../database/models/ride");
const user = require("../../database/models/user");


const AddRide = async (req, res) => {
  const username = req.user.username;
  const { source, destination, desc, pickupDate, pickupTime, passengers, fare } = req.body;
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
    });

    res.json({
      error: false,
      message: "Your ride has successfully been created",
    });
  } catch (err) {
		console.log(err)
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
  try {
    res.json({
      error: false,
      data: res.results,
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
};
