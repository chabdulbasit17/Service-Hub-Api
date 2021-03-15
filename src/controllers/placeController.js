const Place = require("../../database/models");

const AddPlace = async (req, res) => {
  try {
    const username = req.user.username;
    const { category, desc, price } = req.body;
    await Place.create({
      username,
      category,
      desc,
      price,
    });
    res.json({
      error: false,
      message: "Place successfully put up for rent",
    });
  } catch (err) {
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
};