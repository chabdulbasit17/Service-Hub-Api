const { Place, User } = require("../../database/models");
const { Booking } = require("../../database/models");
const { Notification } = require("../../database/models");

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
      Position,
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
      Position,
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
  const username = req.user.username;
  try {
    const data = await Place.find({ username: { $ne: username } });
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

const GetPlace = async (req, res) => {
  const { placeID } = req.body;
  try {
    const placeData = await Place.findById(placeID);
    res.json({
      error: false,
      placeData: placeData,
    });
  } catch (err) {
    res.json({
      error: true,
      message: "An error occured while performing the operation",
    });
  }
};

const RequestPlace = async (req, res) => {
  const username = req.user.username;
  const { placeID, owner, checkIn, checkOut, guests } = req.body;
  try {
    const days = Math.floor((new Date(checkOut.split("T")[0]) - new Date(checkIn.split("T")[0])) / (3600000*24))
    const userData = await User.findOne({ username: username })
    const placeData = await Place.findById(placeID)
    if(userData.totalBalance - (placeData.rent * days) >= 0){
      const flag = await IsBookingAvailabe(placeID, checkIn, checkOut);
    if (flag) {
      await Booking.create({
        owner: owner,
        rentee: username,
        placeID: placeID,
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guests,
        status: "Pending",
      });
      await Notification.create({
        username: owner,
        type: "placerequest",
        text: "You have a new request for your place.",
      });
      await User.findOneAndUpdate({username: username}, {totalBalance: userData.totalBalance - (placeData.rent * days)})
      res.json({
        error: false,
        message: "Your request has been placed",
      });
    } else {
      res.json({
        error: false,
        message: "Place is not available in requested dates",
      });
    }
    }
    else{
      res.json({
        error: false,
        message: "You don't have enough coins to buy this service",
      });
    }
  } catch (err) {
    res.json({
      error: true,
      message: "An error occured while performing the operation",
    });
  }
};

const GetMyRequests = async (req, res) => {
  const name = req.user.username;
  try {
    const data = await Booking.find({ rentee: name });
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

const GetMyPlaces = async (req, res) => {
  const name = req.user.username;
  try {
    const data = await Booking.find({
      owner: name,
      status: { $ne: "Cancelled" },
    });
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

const ShowPlaceDescription = async (req, res) => {
  const { placeID } = req.body;
  try {
    const data = await Place.findById(placeID);
    res.json({
      error: false,
      data: {
        address: data.address,
        city: data.city,
        country: data.country,
      },
    });
  } catch (err) {
    res.json({
      error: true,
      message: "An error occured while fetching data",
    });
  }
};

const BookPlace = async (req, res) => {
  const { placeID, bookingID, checkIn, checkOut, rentee } = req.body;
  try {
    const flag = await IsBookingAvailabe(placeID, checkIn, checkOut);
    if (flag) {
      await Booking.findByIdAndUpdate({ _id: bookingID }, { status: "Booked" });
      await Place.updateOne(
        { _id: placeID },
        {
          $push: {
            bookingDates: {
              checkIn: checkIn,
              checkOut: checkOut,
            },
          },
        }
      );

      await Notification.create({
        username: rentee,
        type: "placeapprove",
        text: "Your request for a place has been approved",
      });
      res.json({
        error: false,
        message: "Your booking has been approved",
      });
    } else {
      console.log("ELSE");
      await Booking.findByIdAndUpdate(
        { _id: bookingID },
        { status: "Cancelled" }
      );
      res.json({
        error: false,
        message:
          "Place is not available in requested dates. Cancelling Booking",
      });
    }
  } catch (err) {
    res.json({
      error: true,
      message: "An error occured while fetching data",
    });
  }
};

const CancelPlace = async (req, res) => {
  const { bookingID, rentee } = req.body;
  try {
    const bookingData = await Booking.findById(bookingID)
    const userData = await User.findOne({ username: bookingData.rentee })
    const placeData = await Place.findById(bookingData.placeID)
    //const days = Math.floor((new Date(bookingData.checkOut.toString().split("T")[0]) - new Date(bookingData.checkIn.toString().split("T")[0])) / (3600000*24))
    await User.findOneAndUpdate({username: rentee}, {totalBalance: userData.totalBalance + (placeData.rent)})
    await Booking.findByIdAndUpdate(
      { _id: bookingID },
      { status: "Cancelled" }
    );

    await Notification.create({
      username: rentee,
      type: "placereject",
      text: "Your request for a place has been rejected",
    });
    res.json({
      error: false,
      message: "Your booking has been cancelled",
    });
  } catch (err) {
    console.log(err)
    res.json({
      error: true,
      message: "An error occured while fetching data",
    });
  }
};

const IsBookingAvailabe = async (placeID, checkIn, checkOut) => {
  try {
    const data = await Place.findById(placeID);
    for (i = 0; i < data.bookingDates.length; i++) {
      if (
        (checkIn < data.bookingDates[i]["checkIn"] &&
          checkOut < data.bookingDates[i]["checkIn"]) ||
        (checkIn > data.bookingDates[i]["checkOut"] &&
          checkOut > data.bookingDates[i]["checkOut"])
      ) {
        console.log("True");
      } else {
        console.log("False");
        return false;
      }
    }
    console.log("Check");
    return true;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  AddPlace,
  GetAllPlaces,
  GetUserPlaces,
  SubmitPlaceReview,
  DeletePlace,
  GetPlace,
  RequestPlace,
  GetMyRequests,
  GetMyPlaces,
  ShowPlaceDescription,
  CancelPlace,
  BookPlace,
};
