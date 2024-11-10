const Journey = require("../../models/Journey.models.js");

const updateJourneyForm = async (req, res) => {
  try {
    const { fullName, enrollmentNo, phoneNo, _id: userId } = req.user;
    const { _id: journeyId, userId: bodyUserId } = req.body;

    console.log("update journey form",req.body)
    // Validate that the journey ID is provided
    if (!journeyId) {
      return res.status(400).json({ message: "No journey data provided. Provide Journey Form ID." });
    }

    // Check if the user making the request is authorized to update the form
    if (bodyUserId !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this form." });
    }

    // Initialize an empty update object
    const updateData = {};

    // Validate and update passengerRequired
    if (req.body.passengerRequired && req.body.passengerRequired !== '') {
      updateData.passengerRequired = req.body.passengerRequired;
      if(updateData.passengerRequired===req.body.passengers.length){
        updateData.status='full';
      }else if(updateData.passengerRequired>req.body.passengers.length){
        updateData.status='required'
      }
    }

    // Validate and update phoneNo
    if (phoneNo && phoneNo.trim() !== '') {
      updateData.phoneNo = phoneNo.trim().toLowerCase();
    }

    // Validate and update fullName
    if (fullName && fullName.trim() !== '') {
      updateData.fullName = fullName.trim().toLowerCase();
    }

    // Validate and update enrollmentNo
    if (enrollmentNo && enrollmentNo.trim() !== '') {
      updateData.enrollmentNo = enrollmentNo.trim().toLowerCase();
    }

    // Additional journey fields validation
    if (req.body.journeyStartLocation && req.body.journeyStartLocation.trim() !== '') {
      updateData.journeyStartLocation = req.body.journeyStartLocation.trim().toLowerCase();
    }

    if (req.body.journeyEndLocation && req.body.journeyEndLocation.trim() !== '') {
      updateData.journeyEndLocation = req.body.journeyEndLocation.trim().toLowerCase();
    }

    if (req.body.journeyDescription && req.body.journeyDescription.trim() !== '') {
      updateData.journeyDescription = req.body.journeyDescription.trim().toLowerCase();
    }

    if (req.body.fare && req.body.fare!== '') {
      updateData.fare = req.body.fare;
    }

    if (req.body.journeyDate) {
      updateData.journeyDate = req.body.journeyDate;
    }

    if (req.body.journeyTime) {
      updateData.journeyTime = req.body.journeyTime;
    }

    if(req.body.passengers && req.body.passengers?.length!=0){
      updateData.passengers=req.body.passengers.map(passenger=>passenger._id)
    }

    // console.log("req.body.passengers",req.body.passengers)

    // Check if there is any data to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid update data provided." });
    }

    // Perform the update
    const updatedJourneyForm = await Journey.findByIdAndUpdate(
      journeyId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedJourneyForm) {
      return res.status(404).json({ message: "Journey not found." });
    }

    // Send back the updated journey data
    return res.status(200).json({ journeyForm: updatedJourneyForm });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while updating the journey form.", error: error.message });
  }
};

module.exports = updateJourneyForm;
