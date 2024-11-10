const mongoose = require("mongoose");
const Journey = require("../../models/Journey.models.js");

const fetchJourniesRequests = async (req, res) => {
  try {
    console.log('journey');
    const journeyRequests = await Journey.find().sort({ journeyTime: -1 });

    console.log('journey Founded',journeyRequests);

    if (!journeyRequests) {
      return res.status(404).json({ message: "No journey requests found" });
    }

    // console.log('journey Founded');
    res.status(200).json(journeyRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchJourneyRequest = async (req, res) => {
  const requestId = req.params.id;

  try {
    if (!requestId || requestId === "") {
      return res.status(400).json({ message: "No request ID provided" });
    }

    // const ObjectId=mongoose.Types.ObjectId(requestId)
    const objectId = mongoose.Types.ObjectId(requestId)
    const [journeyRequest] = await Journey.aggregate([
      {
        $match: {
          // _id: new mongoose.Types.ObjectId(requestId),  
          _id:objectId
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "passengers",
          foreignField: "_id",
          as: "passengerDetails",
        },
      },
      {
        $project: {
          _id: 1,
          journeyStartLocation: 1,
          journeyEndLocation: 1,
          userId: 1,
          journeyDescription: 1,
          fare: 1,
          journeyDate: 1,
          journeyTime: 1,
          status: 1,
          createdAt: 1,
          passengers: "$passengerDetails",
        },
      },
    ]);

    if (!journeyRequest) {
      return res.status(404).json({ message: "Journey request not found" });
    }

    res.status(200).json(journeyRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { fetchJourniesRequests, fetchJourneyRequest };
