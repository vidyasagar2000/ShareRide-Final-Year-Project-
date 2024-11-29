import PropTypes from "prop-types";
import { useState } from "react";
import "./JourneyCard.css";
import { useAuth } from "../context/AuthContext";
import { useJourney } from "../context/JourneyContext";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePopUp } from "../context/PopUpContext";

const JourneyCard = ({ journey }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();
  const { deleteJourneyInfo, joinJourney, exitJourney } = useJourney();
  const { setPopUPMessage, setIsPopUPVisible, setOnYesFunc, SetIsOnYesFucSuccessful } = usePopUp();

  const navigate = useNavigate();
  // const location = useLocation();

  const [isJourneyJoined, setIsJourneyJoined] = useState(() =>
    journey?.passengers?.includes(user?._id)
  );

  const handleOpenDesc = (e) => {
    e.stopPropagation();
    if (journey?.journeyDescription.length < 28) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  const handleDeleteJourney = (e) => {
    e.stopPropagation();
    if (journey?.userId !== user?._id) {
      return;
    }

    setPopUPMessage("DO YOU REALLY WANT TO DELETE THE JOURNEY");
    setOnYesFunc(() => () => deleteJourneyInfo(journey?._id));
    setIsPopUPVisible(true);
    SetIsOnYesFucSuccessful(null);

    // deleteJourneyInfo(journey?._id);
    // toast.success("Successfully deleted journey item");
  };

  const handleExitJourney = (e) => {
    e.stopPropagation();

    setPopUPMessage("DO YOU REALLY WANT TO EXIT FROM JOURNEY");
    setOnYesFunc(() => () => exitJourney(journey?._id) && setIsJourneyJoined(false));
    setIsPopUPVisible(true);
    SetIsOnYesFucSuccessful(null);
    // toast.success("Successfully exited journey item");
  };

  const handleJoinJourney = (e) => {
    e.stopPropagation();

    // joinJourney(journey?._id);
    setPopUPMessage("DO YOU REALLY WANT TO JOIN JOURNEY");
    setOnYesFunc(() => () => joinJourney(journey?._id) && setIsJourneyJoined(true));
    setIsPopUPVisible(true);
    SetIsOnYesFucSuccessful(null);
    //  if(isOnYesFucSuccessful){
    //   setIsJourneyJoined(true);
    //   toast.success("Successfully joined journey item");
    //   SetIsOnYesFucSuccessful(null);
    // }
  };


  const handleCardOpenClick = () => {
    console.log("handleCardOpenClick clicked")
    if (!journey.passengers.includes(user?._id)) return;
    navigate(`/app/journey-form`, { state: journey })
  }

  return (
    <div className="journey-card" onClick={handleCardOpenClick}>
      <h1>
        <strong>Journey Details</strong>
      </h1>

      <div className="journey-header">
        <div className="location from">{journey?.journeyStartLocation}</div>
        <div className="text-3xl text-gray-600">&rarr;</div>
        <div className="location to">{journey?.journeyEndLocation}</div>
      </div>

      <div className="journey-info">
        <div>
          <strong>Date:</strong>{' '}
          {new Date(journey?.journeyDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </div>

        <div>
          <strong>Time:</strong> {journey?.journeyTime}
        </div>
      </div>


      <p className="relative">
        <strong>Total joined:</strong> {journey?.passengers?.length || 0}
        <div className="absolute right-0 top-1">
          <span
            className={`bg-blue-600 text-white px-3 py-1 rounded-full text-sm ${journey?.status === "cancelled" ? "bg-red-600" : ""
              }`}
          >
            {journey?.status === "full"
              ? "completed"
              : journey?.status === "cancelled"
                ? "cancelled"
                : "incomplete"}
          </span>
        </div>
      </p>

      <p>
        <strong>Passengers seat left:</strong> {journey?.passengerRequired - journey?.passengers?.length}
      </p>
      <p className="fare">
        <strong>Fare:</strong> ₹{journey?.fare}
      </p>
      <p>
        <strong>Join to:</strong> {journey?.fullName?.toUpperCase() || "Unknown"}
      </p>
      <p>
        <strong>Mobile No.:</strong> {journey?.phoneNo || "N/A"}
      </p>

      {/* Description with expansion/collapse functionality */}
      <p
        className={`description ${isExpanded ? "expanded" : ""}`}
        onClick={handleOpenDesc}
      >
        {isExpanded
          ? journey?.journeyDescription
          : `${journey?.journeyDescription?.substring(0, 28)}...`}
      </p>

      <div className="button-container">
        {isJourneyJoined ? (
          journey?.userId === user?._id ? (
            <button
              className="delete-button"
              type="button"
              onClick={handleDeleteJourney}
            >
              Delete Journey
            </button>
          ) : (
            <button
              className="exit-button"
              type="button"
              onClick={handleExitJourney}
            >
              Exit From Journey
            </button>
          )
        ) : (
          <button
            className="join-button"
            type="button"
            onClick={handleJoinJourney}
          >
            Join Journey
          </button>
        )}
      </div>
    </div>
  );
};

// Add prop-types validation
JourneyCard.propTypes = {
  journey: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    journeyStartLocation: PropTypes.string.isRequired,
    journeyEndLocation: PropTypes.string.isRequired,
    journeyDate: PropTypes.string.isRequired,
    journeyTime: PropTypes.string.isRequired,
    passengers: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
      })
    ),
    passengerRequired: PropTypes.number.isRequired,
    fare: PropTypes.number.isRequired,
    fullName: PropTypes.string,
    phoneNo: PropTypes.string,
    journeyDescription: PropTypes.string,
    userId: PropTypes.string,
    status: PropTypes.string, // Add this line
  }).isRequired,
};

export default JourneyCard;
