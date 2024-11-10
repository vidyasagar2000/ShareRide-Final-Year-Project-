import   { useState } from "react";

function CreateJourneyForm() {
  const [formData, setFormData] = useState({
    passengerRequired: 0,
    passengers: [],
    journeyStartLocation: "",
    journeyEndLocation: "",
    journeyDescription: "",
    fare: 0,
    journeyDate: "",
    journeyTime: "",
    status: "required",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Reset form data after submission
    setFormData({
      passengerRequired: 0,
      passengers: [],
      journeyStartLocation: "",
      journeyEndLocation: "",
      journeyDescription: "",
      fare: 0,
      journeyDate: "",
      journeyTime: "",
      status: "required",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-3xl w-full">
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
              />
            </div>

            <div>
              <label
                className="block text-lg text-gray-700 font-medium mb-3"
                htmlFor="fare"
              >
                Fare (₹)
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="fare"
                type="number"
                name="fare"
                value={formData.fare}
                onChange={handleChange}
                placeholder="Enter fare amount"
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

          {/* Journey Status */}
          <div className="mb-8">
            <label
              className="block text-lg text-gray-700 font-medium mb-3"
              htmlFor="status"
            >
              Journey Status
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="required">Required</option>
              <option value="full">Full</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Journey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJourneyForm;
