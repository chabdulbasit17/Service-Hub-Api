const { Gig } = require("../../database/models");

const addGig = async (req, res) => {
  const username = req.user.username;
  console.log(username);
  const { category, desc, price } = req.body;
  try {
    const gig = await Gig.create({
      username,
      category,
      desc,
      price,
    });

    res.json({
      error: false,
      message: "Your gig has successfully been created",
    });
  } catch (err) {
    // console.log(err);
    res.json({
      error: true,
      message:
        "An unexpected error occured. Please enter correct data and try again in a while",
    });
  }
};

const submitReview = async (req, res) => {
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

const deleteGig = async (req, res) => {
  const { gigID } = req.body;
  try {
    await Gig.deleteOne({ _id: gigID });
    res.json({
      error: false,
      message: "Your gig was deleted",
    });
  } catch (err) {
    res.json({
      error: true,
      message: "An error occured while performing the operation",
    });
  }
};

const showAllGigs = async (req, res) => {
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

const showUserGigs = async (req, res) => {
  const username = req.user.username;
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

module.exports = {
  addGig,
  submitReview,
  deleteGig,
  showAllGigs,
  showUserGigs,
};
