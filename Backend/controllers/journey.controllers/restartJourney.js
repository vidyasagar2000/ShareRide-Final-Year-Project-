const Journey = require("../../models/Journey.models.js");

const restartJourney = async (req, res) => {
  try {
    console.log("restart journey ",req.body)
    const { fullName, enrollmentNo, _id, phoneNo } = req.user;
    const { _id: journeyId } = req.body;
   

    // Validate input
    if (!journeyId || journeyId === "") {
      return res
        .status(400)
        .json({ message: "All fields are mandatory in restart journey" });
    }

    // Fetch journey
    const journeyRequest = await Journey.findById(journeyId);

    if (!journeyRequest) {
      return res.status(404).json({ message: "No such journey exists" });
    }

    if (!journeyRequest.status === "cancelled") {
      return res
        .status(400)
        .json({ message: "Ride is not cancelled by Admin already" });
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
        .json({ message: "You are not authorized to restart this ride" });
    }


    if (Journey.passengerRequired === 0) {
      journeyRequest.status = "full";
    } else {
      journeyRequest.status = "required";

    }
    
    journeyRequest.journeyDescription =
      " THIS RIDE IS RESTARTED.";

    // Save changes
    await journeyRequest.save({ validateBeforeSave: false });

    res.status(200).json(journeyRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = restartJourney;