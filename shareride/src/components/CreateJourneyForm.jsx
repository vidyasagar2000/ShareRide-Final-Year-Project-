import { useState } from "react";
import { useJourney } from "../context/JourneyContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// import { usePopUp } from "../context/PopUpContext";

function CreateJourneyForm() {
  const navigate = useNavigate();
  const { createJourney } = useJourney();
  const [formData, setFormData] = useState({
    passengerRequired: 0,
    // passengers: [],
    journeyStartLocation: "",
    journeyEndLocation: "",
    journeyDescription: "",
    fare: 0,
    journeyDate: "",
    journeyTime: "",
  });

  // const {setPopUPMessage,setIsPopUPVisible,setOnYesFunc}=usePopUp();

  const [loading, setLoading] = useState(false);

  console.log("formdata", formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleCreateJourney = async (e) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handle create submit clicked", formData);

    const {
      passengerRequired,
      journeyStartLocation,
      journeyEndLocation,
      journeyDescription,
      fare,
      journeyDate,
      journeyTime,
    } = formData;

    if (
      [
        journeyStartLocation,
        journeyEndLocation,
        journeyDescription,
        journeyDate,
        journeyTime,
      ].some((field) => field === "") ||
      passengerRequired === 0 ||
      fare === 0
    ) {
      console.log("Error condition met");
      toast.error("All fields are required!");
      return;
    }

    if (passengerRequired < 0) {
      console.log("some error");
      toast.error("Passenger Required must be 0 or a positive number.");
      return;
    }

    if (fare < 0) {
      toast.error("Fare must be 0 or a positive number.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (journeyDate < today) {
      toast.error("Journey Date must be today or a future date.");
      return;
    }

    setLoading(true);

    try {
      await createJourney(
        passengerRequired,
        journeyStartLocation,
        journeyEndLocation,
        journeyDescription,
        fare,
        journeyDate,
        journeyTime
      );

      toast.success("Journey created successfully!");

      setFormData({
        passengerRequired: 0,
        // passengers: [],
        journeyStartLocation: "",
        journeyEndLocation: "",
        journeyDescription: "",
        fare: 0,
        journeyDate: "",
        journeyTime: "",
      });
      navigate("/app/dashboard");
    } catch {
      toast.error("Error creating journey. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit=async(e)=>{
  //   setPopUPMessage("DO YOU WANT TO CREATE THIS JOURNEY");
  //   setOnYesFunc(()=>()=>handleCreateJourney(e));
  //   setIsPopUPVisible(true);
  //   setOnYesFunc(null);

  // };

  return (
    <div className="w-full bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg px-10 w-full py-6">
        <h2 className="text-4xl font-bold mb-8 text-center text-blue-800">
          Create New Journey
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Passenger Required & Fare */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                className="block text-lg text-gray-700 font-medium mb-3"
                htmlFor="passengerRequired"
              >
                Passenger Required
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="passengerRequired"
                type="number"
                name="passengerRequired"
                value={formData.passengerRequired}
                onChange={handleChange}
                placeholder="Enter number of passengers"
                min="0"
              />
            </div>

            <div>
              <label
                className="block text-lg text-gray-700 font-medium mb-3"
                htmlFor="fare"
              >
                Total Fare (₹)
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="fare"
                type="number"
                name="fare"
                value={formData.fare}
                onChange={handleChange}
                placeholder="Enter fare amount"
                min="0"
              />
            </div>
          </div>

          {/* Journey Start Location & End Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                className="block text-lg text-gray-700 font-medium mb-3"
                htmlFor="journeyStartLocation"
              >
                Start Location
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="journeyStartLocation"
                type="text"
                name="journeyStartLocation"
                value={formData.journeyStartLocation}
                onChange={handleChange}
                placeholder="Enter start location"
              />
            </div>

            <div>
              <label
                className="block text-lg text-gray-700 font-medium mb-3"
                htmlFor="journeyEndLocation"
              >
                End Location
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="journeyEndLocation"
                type="text"
                name="journeyEndLocation"
                value={formData.journeyEndLocation}
                onChange={handleChange}
                placeholder="Enter end location"
              />
            </div>
          </div>

          {/* Journey Description */}
          <div className="mb-8">
            <label
              className="block text-lg text-gray-700 font-medium mb-3"
              htmlFor="journeyDescription"
            >
              Journey Description
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="journeyDescription"
              name="journeyDescription"
              value={formData.journeyDescription}
              onChange={handleChange}
              placeholder="Describe the journey"
              rows="5"
            ></textarea>
          </div>

          {/* Journey Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                className="block text-lg text-gray-700 font-medium mb-3"
                htmlFor="journeyDate"
              >
                Journey Date
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="journeyDate"
                type="date"
                name="journeyDate"
                value={formData.journeyDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} // Ensures date is not in the past
              />
            </div>

            <div>
              <label
                className="block text-lg text-gray-700 font-medium mb-3"
                htmlFor="journeyTime"
              >
                Journey Time
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="journeyTime"
                type="time"
                name="journeyTime"
                value={formData.journeyTime}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Journey"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJourneyForm;
