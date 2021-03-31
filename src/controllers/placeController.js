const Place = require("../../database/models/place.js");

const AddPlace = async (req, res) => {
  try {
    const username = req.user.username;
    const {
      country,
      city,
      address,
      desc,
      propertyType,
      totalRooms,
      guestPlaceType,
      totalGuests,
      totalBeds,
      totalBathrooms,
      basicAmenities,
      safetyAmenities,
      rent,
    } = req.body;
    await Place.create({
      username,
      country,
      city,
      address,
      desc,
      propertyType,
      totalRooms,
      guestPlaceType,
      totalGuests,
      totalBeds,
      totalBathrooms,
      basicAmenities,
      safetyAmenities,
      rent,
    });
    res.json({
      error: false,
      message: "Place successfully put up for rent",
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: true,
      message: "An unexpected error occured. Please try again in a while",
    });
  }
};

const GetAllPlaces = async (req, res) => {
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

const GetUserPlaces = async (req, res) => {
  try {
    const username = req.user.username;
    const data = await Place.find({ username });
    res.json({
      error: false,
      data,
    });
  } catch (err) {
    res.json({
      error: true,
      message: "An unexpected error occured.",
    });
  }
};

const DeletePlace = async (req, res) => {
  const { placeID } = req.body;
  try {
    await Place.deleteOne({ _id: placeID });
    res.json({
      error: false,
      message: "Your place was deleted",
    });
  } catch (err) {
    res.json({
      error: true,
      message: "An error occured while performing the operation",
    });
  }
};

const SubmitPlaceReview = async (req, res) => {
  const { placeID, review } = req.body;
  const username = req.user.username;
  try {
    const check = await Place.updateOne(
      {
        _id: placeID,
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

module.exports = {
  AddPlace,
  GetAllPlaces,
  GetUserPlaces,
  SubmitPlaceReview,
  DeletePlace,
};
