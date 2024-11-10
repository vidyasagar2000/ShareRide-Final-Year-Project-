const Journey = require("../../models/Journey.models.js");

const exitRide = async (req, res) => {
  try {
    const { fullName, enrollmentNo, _id, phoneNo } = req.user;
    const {id: journeyId } = req.body;

    if (!journeyId || journeyId === "") {
      return res
        .status(400)
        .json({ message: "All fields are mandatory in cancel journey" });
    }

    const journeyRequest = await Journey.findById(journeyId);

    if (!journeyRequest) {
      return res.status(404).json({ message: "No such journey exists" });
    }

    if (journeyRequest.status === "cancelled") {
      return res
        .status(400)
        .json({ message: "Ride is already cancelled by Admin" });
    }

    if (!journeyRequest.passengers.includes(_id)) {
      return res
        .status(400)
        .json({ message: "You are not a member of the ride" });
    }

    journeyRequest.passengers = journeyRequest.passengers.filter(
      (id) => id.toString() !== _id.toString()
    );
    // journeyRequest.passengerRequired++;

    if (journeyRequest.passengerRequired > journeyRequest.passengers.length) {
      journeyRequest.status = "required";
    }

    await journeyRequest.save({ validateBeforeSave: false });

    res.status(200).json(journeyRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelJourney = async (req, res) => {
  try {
    console.log("cancel journey ",req.body)
    const { fullName, enrollmentNo, _id, phoneNo } = req.user;
    const { _id: journeyId } = req.body;
   

    // Validate input
    if (!journeyId || journeyId === "") {
      return res
        .status(400)
        .json({ message: "All fields are mandatory in cancel journey" });
    }

    // Fetch journey
    const journeyRequest = await Journey.findById(journeyId);

    if (!journeyRequest) {
      return res.status(404).json({ message: "No such journey exists" });
    }

    // Check if journey is already cancelled
    if (journeyRequest.status === "cancelled") {
      return res
        .status(400)
        .json({ message: "Ride is already cancelled by Admin" });
    }

    // Check if the user is a passenger in the journey
    if (!journeyRequest.passengers.includes(_id)) {
      return res
        .status(400)
        .json({ message: "You are not a member of the ride" });
    }

    // Check if the current user is the journey creator
    if (journeyRequest.userId.toString() !== _id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to cancel this ride" });
    }

    // Update journey status to 'cancelled' and modify description
    journeyRequest.status = "cancelled";
    journeyRequest.journeyDescription =
      " THIS RIDE IS CANCELLED TEMPORARILY. WAIT FOR FUTURE UPDATES.";

    // Save changes
    await journeyRequest.save({ validateBeforeSave: false });

    res.status(200).json(journeyRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { exitRide, cancelJourney };
