// const { asyncHandler } = require("../../utils/asyncHandlers.js");
// const { Journey } = require("../../models/Journey.models.js");
const Journey = require("../../models/Journey.models.js");


const journeyRequest=async (req,res)=>{
    // console.log("req:",req.body);
    const userId = req.user._id;
    const {fullName, enrollmentNo, _id, phoneNo}=req.user;
    // console.log("hg",userId)

    
    try {
        let {
            passengerRequired,
            journeyStartLocation,
            journeyEndLocation,
            journeyDescription,
            journeyDate,
            journeyTime,
            fare
        }=req.body;
        
        // console.log('journeyRequestFucn',req.body,userId);
        if (![userId, passengerRequired, journeyStartLocation, journeyEndLocation, journeyDescription,fare].every(Boolean) ||
            [userId,
                passengerRequired,
                journeyStartLocation,
                journeyEndLocation,
                journeyDescription,
                fare].some(field => field.trim() === '')) {
            throw new Error(400, 'All fields are required');
        } 
       
        console.log('journeyRequestFucn',req.body,userId);
        passengerRequired--;
        let status='required'
        if(passengerRequired===0){
            status='full'
        }
        const newJourneyRequest = await Journey.create({
            userId,
            enrollmentNo: enrollmentNo.trim().toLowerCase(),
            fullName: fullName.trim().toLowerCase(),
            phoneNo: phoneNo.trim().toLowerCase(),
            passengerRequired,
            journeyStartLocation: journeyStartLocation.trim().toLowerCase(),
            journeyEndLocation: journeyEndLocation.trim().toLowerCase(),
            passengers: [userId],
            journeyDescription,
            journeyDate,
            journeyTime,
            fare,
            status
        });
        
          
        console.log(newJourneyRequest)
    
        if (!newJourneyRequest) {
            throw new Error(502, 'Unable to create journey request');
        }
    
        
        res.status(200).json(newJourneyRequest);
    } catch (error) {
        console.log("error:",error)
        res.status(500).json({ message: "Server error" });
      }
}

module.exports={journeyRequest};