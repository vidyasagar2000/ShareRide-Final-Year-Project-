const Journey = require("../../models/Journey.models.js");
const User = require("../../models/user.models.js");


const joinedJourney = async (req, res) => {
    const requestId = req.body.id;
    const { fullName, enrollmentNo, _id, phoneNo } = req.user;

    try {
        if (!requestId || requestId.trim() === "") {
            return res.status(400).json({ message: "No request ID provided" });
        }

        if (![fullName, enrollmentNo].every(Boolean) || [fullName, enrollmentNo].some(field => field.trim() === '')) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const journeyRequest = await Journey.findById(requestId);

        if (!journeyRequest) {
            return res.status(404).json({ message: "Journey form not found" });
        }

        if (journeyRequest.status === 'cancelled' || journeyRequest.status === 'full') {
            return res.status(400).json({ message: "Journey form is not accepting requests" });
        }

        const joiningPassenger = await User.findOne({ enrollmentNo, fullName });

        if (!joiningPassenger) {
            return res.status(404).json({ message: "User not recognized" });
        }

        if (journeyRequest.passengers.includes(joiningPassenger._id)) {
            return res.status(400).json({ message: "User already registered" });
        }

        journeyRequest.passengers.push(joiningPassenger._id);
        // journeyRequest.passengerRequired--;

        if (journeyRequest.passengerRequired === journeyRequest.passengers.length) {
            journeyRequest.status = 'full';
        }

        await journeyRequest.save({ validateBeforeSave: false });

        return res.status(200).json({ message: "Joined the journey successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while processing the request" });
    }
};

module.exports={joinedJourney};