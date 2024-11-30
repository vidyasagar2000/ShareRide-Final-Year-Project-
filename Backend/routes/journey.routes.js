const { Router } = require("express");
const {
  journeyRequest,
} = require("../controllers/journey.controllers/journeyRequest.js");
const {
  
  fetchJourniesRequests,
  fetchJourneyRequest,
} = require("../controllers/journey.controllers/fetchJourniesRequest.js");
const {
  joinedJourney,
} = require("../controllers/journey.controllers/joinedJourney.js");
const {
  fetchRideHistories,
} = require("../controllers/journey.controllers/fetchHistories.js");
const {
  exitRide,
  cancelJourney,
} = require("../controllers/journey.controllers/journeyCancel.js");
const deleteJourneyInfo = require("../controllers/journey.controllers/deleteJourney.js");
const fetchUserDetails = require("../controllers/fetchUsersDetails.js");
const restartJourney = require("../controllers/journey.controllers/restartJourney.js");
const updateJourneyForm = require("../controllers/journey.controllers/updateJourneyForm.js");
const router = Router();

//authentic route

router.post("/journey-request", journeyRequest);
router.post("/delete-journey", deleteJourneyInfo);
router.get("/journey-requests", fetchJourniesRequests);
router.get("/journey-request/:id", fetchJourneyRequest);
router.post("/join-journey", joinedJourney);

router.post("/journey-exit", exitRide);
router.post("/journeyCancel", cancelJourney);
router.post("/restartJourney", restartJourney);


router.get("/my-journey", fetchRideHistories);
router.post("/passengers", fetchUserDetails);


router.post("/journey-Update", updateJourneyForm)

module.exports = router;
fetchJourneyRequest