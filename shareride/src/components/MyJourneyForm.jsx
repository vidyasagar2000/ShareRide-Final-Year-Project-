import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useJourney } from "../context/JourneyContext";
import { usePopUp } from "../context/PopUpContext";
import { useChat } from "../context/chatContext";

function MyJourneyForm() {
  const location = useLocation();
  const [journey, setJourney] = useState(
    location.state ? { ...location.state, isAdmin: false } : { isAdmin: false }
  );

  const { user } = useAuth();
  const {
    fetchPassengersDetails,
    deleteJourneyInfo,
    exitJourney,
    cancelJourney,
    restartJourney,
    UpdateJourney,
  } = useJourney();
  const { setPopUPMessage, setIsPopUPVisible, setOnYesFunc } = usePopUp();
  const navigate = useNavigate();

  const [selectedJourney, setSelectedJourney] = useState(null);

  const { isChatVisible, setIsChatVisible, setChatWith } = useChat();

  const handleExitJourney = async (e) => {
    e.stopPropagation();
    // await exitJourney(journey?._id);

    setPopUPMessage("DO YOU REALLY WANT TO EXIT FROM THIS JOURNEY");
    setOnYesFunc(() => () => exitJourney(journey?._id) && navigate(-1));
    setIsPopUPVisible(true);

    // toast.success("You have exited the journey successfully!");
    // navigate(-1);
  };

  useEffect(() => {
    if (journey.userId === user._id) {
      setJourney((prevJourney) => ({
        ...prevJourney,
        isAdmin: true,
      }));
    }
  }, [journey.userId, user._id]);

  useEffect(() => {
    const fetchDetails = async () => {
      const { userDetails } = await fetchPassengersDetails(journey?.passengers);

      console.log("User details from backend", userDetails);
      if (!userDetails) return;
      setJourney((prev) => {
        return { ...prev, passengers: [...userDetails] };
      });
    };

    fetchDetails();
  }, []);

  const handleDeleteJourney = (e) => {
    e.stopPropagation();
    if (journey?.userId !== user?._id) {
      return;
    }
    // deleteJourneyInfo(journey?._id);
    // toast.success("Journey deleted successfully!");
    // window.history.back();
    setPopUPMessage("DO YOU REALLY WANT TO DELETE THE JOURNEY");
    setOnYesFunc(
      () => () => deleteJourneyInfo(journey?._id) && window.history.back()
    );
    setIsPopUPVisible(true);
  };

  const handleCancelJourney = async (e) => {
    e.stopPropagation();
    setPopUPMessage("DO YOU REALLY WANT TO CANCEL JOURNEY");
    setOnYesFunc(
      () => () =>
        cancelJourney(journey?._id) &&
        setJourney({ ...journey, status: "cancelled" })
    );
    setIsPopUPVisible(true);
    // setOnYesFunc(null);
    // await cancelJourney(journey?._id);
    // setJourney({ ...journey, status: "cancelled" });
  };

  const handleFareChange = (e) => {
    setJourney({ ...journey, fare: parseFloat(e.target.value) });
  };

  const handleDescriptionChange = (e) => {
    setJourney({ ...journey, journeyDescription: e.target.value });
  };

  const handlePassengerRequirementChange = (e) => {
    // if(e.target.value<journey.passengers.length) return;
    setJourney({ ...journey, passengerRequired: parseInt(e.target.value) });
  };

  const togglePassengerDetails = () => {
    setSelectedJourney((prev) => (prev === journey._id ? null : journey._id));
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleRestartJourney = async (e) => {
    e.stopPropagation();
    // await restartJourney(journey._id);
    // setJourney({ ...journey, status: "Active" });
    setPopUPMessage("DO YOU REALLY WANT TO RESTART THE JOURNEY");
    setOnYesFunc(
      () => () =>
        restartJourney(journey?._id) &&
        setJourney({ ...journey, status: "Active" })
    );
    setIsPopUPVisible(true);
  };

  const handleRemoveFromJourney = async (passenger) => {
    console.log("handleRemoveFromJourney clicked", passenger);

    // Filter out the passenger from the journey
    const newPassengers = journey.passengers.filter(
      (field) => field !== passenger
    );
    console.log(newPassengers);

    // Check if the user is allowed to modify the journey
    // if(journey.userId !== user._id) return;
    if (journey.userId === user._id) {
      // Update the journey state
      setJourney((prevJourney) => ({
        ...prevJourney,
        passengers: newPassengers,
      }));
    }

    // Wait for the journey to be updated
    // await UpdateJourney({
    //     ...journey,
    //     passengers: newPassengers // Ensure you're sending the updated passengers list
    // });
    setPopUPMessage("DO YOU REALLY WANT TO REMOVE THIS PASSENGER FROM JOURNEY");
    setOnYesFunc(
      () => () =>
        //  setJourney((prevJourney) => ({
        //   ...prevJourney,
        //   passengers: newPassengers
        //  })
        //  ) &&
        UpdateJourney({
          ...journey,
          passengers: newPassengers, // Ensure you're sending the updated passengers list
        })
    );
    setIsPopUPVisible(true);
  };

  const handleUpdateJourney = async () => {
    console.log("handleUpdateJourney clicked", journey);

    // Check if passengerRequired is less than the number of passengers
    if (journey.passengerRequired < journey.passengers.length) {
      toast.error(
        "Total count of passengers should be greater than or equal to passengers joined."
      );
      return; // Return early to prevent further execution
    }

    if (journey.fare <= 0) {
      toast.error("Price Can't be less than or equal to Rs 0.");
      return; // Return early to prevent further execution
    }

    try {
      // Update the journey
      // await UpdateJourney(journey);
      // window.history.back();
      setPopUPMessage("DO YOU REALLY WANT TO UPDATE THIS JOURNEY");
      setOnYesFunc(
        () => () =>
          UpdateJourney({
            ...journey,
          }) && window.history.back()
      );
      setIsPopUPVisible(true);

      // toast.success("Journey updated successfully!"); // Show a success message if needed
    } catch (error) {
      console.error("Error updating journey:", error);
      toast.error("Failed to update the journey. Please try again.");
    }
  };

  const handleChatOpen = (passenger) => {
    console.log("handleChatOpen clicked");
    setIsChatVisible(true);
    setChatWith((prev) => ({ ...prev, passenger }));
  };

  console.log("isChatVisible", isChatVisible);

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg sm:p-8 lg:p-10  w-full relative">
        {/* Back Arrow */}
        <button
          type="button"
          onClick={handleGoBack}
          className="absolute top-4 left-4 text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <FaArrowLeft className="text-xl sm:text-2xl" />
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center text-gray-800">
          My Journey
        </h2>

        <div className="bg-gray-50 shadow-lg rounded-lg p-4 sm:p-6 mb-4 sm:mb-8 relative border border-gray-200">
          {/* Journey Status */}
          <div className="absolute top-4 right-4">
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-sm">
              {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
            </span>
          </div>

          {/* Journey Date, Time, and Status */}
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <div>
              <p className="text-md sm:text-lg font-semibold text-gray-700">
                Date:{" "}
                <span className="text-gray-800">
                  {new Date(journey.journeyDate).toLocaleDateString()}
                </span>
              </p>
              <p className="text-md sm:text-lg font-semibold text-gray-700">
                Time:{" "}
                <span className="text-gray-800">{journey.journeyTime}</span>
              </p>
            </div>
          </div>

          {/* Start and End Locations */}
          <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
            <p className="text-md sm:text-lg">
              <strong>From:</strong>{" "}
              <span className="text-green-700 font-semibold">
                {journey.journeyStartLocation}
              </span>
            </p>
            <p className="text-md sm:text-lg">
              <strong>To:</strong>{" "}
              <span className="text-green-700 font-semibold">
                {journey.journeyEndLocation}
              </span>
            </p>
          </div>

          {/* Editable Fare for Admin */}
          
            <div className="mb-4 sm:mb-6 text-gray-700 font-semibold">
              <label htmlFor="fare" className="text-lg">
                Overall Fare: ₹
              </label>
              <input
                id="fare"
                type="number"
                disabled={!journey?.isAdmin}
                value={journey.fare}
                onChange={handleFareChange}
                className="ml-2 px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          

          {/* Fare Per Head */}
          <div className="mb-4 sm:mb-6 text-gray-700 font-semibold">
            <label htmlFor="farePerHead" className="text-lg">
              Fare Per Head: ₹
            </label>
            <input
              id="farePerHead"
              type="number"
              value={(journey.fare / journey.passengers.length).toFixed(2)}
              readOnly
              className="ml-2 px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 pointer-events-none"
            />
          </div>

          {/* Passenger Requirement for Admin */}

          <div className="mb-4 sm:mb-6 text-gray-700 font-semibold">
            <label htmlFor="requiredPassengers" className="text-lg">
              Total Passengers Required:{" "}
            </label>
            <input
              id="requiredPassengers"
              type="number"
              disabled={!journey?.isAdmin}
              value={journey.passengerRequired}
              onChange={handlePassengerRequirementChange}
              className="ml-2 px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>



          <div className="mb-4 sm:mb-6 text-gray-700 font-semibold">
            <label htmlFor="journeyDescription" className="text-lg">
              Description :{" "}
            </label>
            <input
              id="journeyDescription"
              type="text"
              disabled={!journey?.isAdmin}
              value={journey?.journeyDescription}
              onChange={handleDescriptionChange}
              className="ml-2 px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>


          {/* Passenger Details */}
          <div className="mb-4">
            <p
              className="text-md sm:text-lg cursor-pointer text-green-600 underline"
              onClick={() => togglePassengerDetails()}
            >
              Passenger Details
            </p>
            {selectedJourney === journey?._id && (
              <div className="pl-2 sm:pl-4 mt-2 space-y-4">
                {journey?.passengers?.map((passenger, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-2 sm:p-4 rounded-lg shadow-sm hover:bg-gray-200 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <FaUser className="text-green-600" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          {passenger?.fullName.toUpperCase()}{passenger._id===journey.userId ? " (Admin)":""}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Enrollment: {passenger?.enrollmentNo.toUpperCase()}
                        </p>
                        <p className="text-gray-600">{passenger?.phoneNo}</p>
                      </div>
                    </div>
                    {/* <p className="text-gray-600">{passenger.phoneNo}</p> */}
                    <div className="flex justify-end gap-4">
                      {journey?.isAdmin &&
                        passenger?._id != journey?.userId && (
                          <button
                            className="px-4 py-2 w-full sm:w-auto bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 focus:outline-none"
                            onClick={() => handleRemoveFromJourney(passenger)}
                          >
                            Remove
                          </button>
                        )}
                      {passenger._id !== user._id && <div
                        className="chat-with cursor-pointer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "10px",
                          border: "2px solid transparent",
                          borderRadius: "50%", // Initially round
                          backgroundColor: "rgba(76, 175, 80, 0.1)",
                          transition:
                            "border 0.3s ease, background-color 0.3s ease",
                        }}
                        onClick={() => handleChatOpen(passenger)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                          <path d="M3 9l9 6 9-6V4a2 2 0 00-2-2H5a2 2 0 00-2 2v5z" />
                        </svg>
                      </div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Admin Actions */}
          {journey.isAdmin && (
            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
              {journey.status !== "cancelled" ? (
                <button
                  type="button"
                  onClick={handleCancelJourney}
                  className="px-4 py-2 w-full sm:w-auto bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 focus:outline-none"
                >
                  Cancel Journey
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRestartJourney}
                  className="px-4 py-2 w-full sm:w-auto bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 focus:outline-none"
                >
                  Restart Journey
                </button>
              )}
              <button
                type="button"
                onClick={handleDeleteJourney}
                className="px-4 py-2 w-full sm:w-auto bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-gray-900 focus:outline-none"
              >
                Delete Journey
              </button>
              <button
                type="button"
                onClick={handleUpdateJourney}
                className="px-4 py-2 w-full sm:w-auto bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none"
              >
                Update Journey
              </button>
            </div>
          )}

          {/* User Actions */}
          {!journey.isAdmin && (
            <div className="mt-4 sm:mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleExitJourney}
                className="px-4 py-2  bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 focus:outline-none justify-center"
              >
                Exit Journey
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyJourneyForm;
