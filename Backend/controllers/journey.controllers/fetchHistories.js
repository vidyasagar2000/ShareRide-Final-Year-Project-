const { ObjectId } = require("mongoose").Types;
const Journey = require("../../models/Journey.models.js");

const fetchRideHistories = async (req, res) => {
  try {
    const { fullName, enrollmentNo, _id, phoneNo } = req.user;
    console.log("Fetching histories for user:", _id);

    const rideHistories = await Journey.aggregate([
      {
        $match: {
          passengers: new ObjectId(_id),
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
    ]);

    console.log("Ride histories found:", rideHistories);

    if (!rideHistories) {
      return res.status(404).json({ message: "No journey history found." });
    }

    // if (rideHistories.length === 0) {
    //   return res.status(400).json({ message: "No journey history found." });
    // }

    return res.status(200).json(rideHistories);
  } catch (error) {
    console.error("Error fetching ride histories:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { fetchRideHistories };
