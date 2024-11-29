import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./FilterComponent.css";

function FilterComponent({ journeys, setJourneys, showStatus = true }) {
  console.log(showStatus);
  console.log("journeys in FilterComponent", journeys);

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: false,
    status: false,
    dateRange: false,
  });
  const [locationFilters, setLocationFilters] = useState({
    location: false,
    fromLocation: false,
    toLocation: false,
  });

  const [location, setLocation] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [status, setStatus] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [searchInfo, setSearchInfo] = useState("");

  const filterRef = useRef(null);
  const handleClickOutsideFilter = (e) => {
    if (filterRef.current && !filterRef.current.contains(e.target)) {
      setShowFilters(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideFilter);

    return () => {
      document.removeEventListener("click", handleClickOutsideFilter);
    };
  }, []);

  // const toggleToDefault=()=>{
  //   setLocation('');
  //   setStartLocation('');
  //   setEndLocation('');
  //   setStatus('');
  //   setStartDate('');
  //   setEndDate('');
  // }

  // Reset fields when filters are unchecked
  const handleFilterToggle = (filter) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [filter]: !prevFilters[filter] };

      if (!updatedFilters[filter]) {
        if (filter === "location") {
          setLocation("");
          setStartLocation("");
          setEndLocation("");
          setLocationFilters({
            location: false,
            fromLocation: false,
            toLocation: false,
          });
        } else if (filter === "status") {
          setStatus("All");
        } else if (filter === "dateRange") {
          setStartDate("");
          setEndDate("");
        }
      }

      return updatedFilters;
    });
  };

  // Handle location filter toggle
  const handleLocationFilterToggle = (filterType) => {
    setLocationFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [filterType]: !prevFilters[filterType],
      };

      if (!updatedFilters[filterType]) {
        if (filterType === "location") {
          setLocation("");
        } else if (filterType === "fromLocation") {
          setStartLocation("");
        } else if (filterType === "toLocation") {
          setEndLocation("");
        }
      }

      return updatedFilters;
    });
  };

  // Filter submission logic
  const handleFilterSubmit = (e) => {
    e.preventDefault();

    let filteredJourneys = [...journeys];

    // Filter by status
    if (status !== "All") {
      filteredJourneys = filteredJourneys.filter(
        (journey) => journey.status === status
      );
    }

    // Filter by startDate
    if (startDate !== "") {
      filteredJourneys = filteredJourneys.filter(
        (journey) =>
          new Date(journey.journeyDate).getTime() >=
          new Date(startDate).getTime()
      );
    }

    // Filter by endDate
    if (endDate !== "") {
      filteredJourneys = filteredJourneys.filter(
        (journey) =>
          new Date(journey.journeyDate).getTime() <= new Date(endDate).getTime()
      );
    }

    // Filter by location
    if (location !== "" || startLocation !== "" || endLocation !== "") {
      filteredJourneys = filteredJourneys.filter(
        (journey) =>
          (location !== "" &&
            (journey.journeyEndLocation.trim().toLowerCase() ===
              location.trim().toLowerCase() ||
              journey.journeyStartLocation.trim().toLowerCase() ===
                location.trim().toLowerCase())) ||
          // journey.journeyEndLocation === location
          (startLocation !== "" &&
            journey.journeyStartLocation.trim().toLowerCase() ===
              startLocation.trim().toLowerCase()) ||
          (endLocation !== "" &&
            journey.journeyEndLocation.trim().toLowerCase() ===
              endLocation.trim().toLowerCase())
      );
    }

    console.log(
      "match last location",
      journeys.some((journey) => journey.journeyEndLocation === location)
    );

    // Sort journeys by journeyDate in descending order
    filteredJourneys.sort(
      (a, b) => new Date(b.journeyDate) - new Date(a.journeyDate)
    );

    setJourneys(filteredJourneys);

    setShowFilters(false);
    setSearchInfo("");

    // toggleToDefault();
  };

  const handelFilterSearchClick = () => {
    let filteredJourney = [...journeys];

    filteredJourney = journeys.filter((journey) => {
      return (
        journey.journeyStartLocation
          .trim()
          .toLowerCase()
          .includes(searchInfo.trim().toLowerCase()) ||
        journey.journeyEndLocation
          .trim()
          .toLowerCase()
          .includes(searchInfo.trim().toLowerCase()) ||
        journey.journeyDescription
          .trim()
          .toLowerCase()
          .includes(searchInfo.trim().toLowerCase()) ||
        journey.phoneNo
          .trim()
          .toLowerCase()
          .includes(searchInfo.trim().toLowerCase()) ||
        journey.fullName        
          .trim()
          .toLowerCase()
          .includes(searchInfo.trim().toLowerCase())  
      );
    });

    console.log("filtered in search", journeys);
    setJourneys(filteredJourney);
    // toggleToDefault();
  };

  useEffect(()=>{
    handelFilterSearchClick(); 
  },[searchInfo])
  return (
    <>
      <form
        className="max-w-lg mx-auto filter-search"
        onSubmit={handleFilterSubmit}
        ref={filterRef}
      >
        <div className="relative inline-block text-left filter">
          <button
            id="dropdown-button"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Filters
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className={`z-10 ${
              showFilters ? "block" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-96 dark:bg-gray-700`}
          >
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Filters
              </h3>

              {/* Filter Toggles */}
              <div className="flex flex-wrap gap-4 mb-4">
                {Object.keys(filters).map((filter) => (
                  <label key={filter} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={filters[filter]}
                      onChange={() => handleFilterToggle(filter)}
                      className="form-checkbox"
                    />
                    <span className="ml-2 text-sm font-medium">
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </span>
                  </label>
                ))}
              </div>

              {/* Location Filter */}
              {filters.location && (
                <div className="my-2">
                  <div className="flex flex-wrap gap-4 mb-4">
                    {["location", "fromLocation", "toLocation"].map((type) => (
                      <label key={type} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={locationFilters[type]}
                          onChange={() => handleLocationFilterToggle(type)}
                          className="form-checkbox"
                        />
                        <span className="ml-2 text-sm font-medium">
                          {type === "location"
                            ? "Location"
                            : type === "fromLocation"
                            ? "From Location"
                            : "To Location"}
                        </span>
                      </label>
                    ))}
                  </div>

                  {locationFilters.location && (
                    <>
                      <label
                        htmlFor="location-name"
                        className="block text-sm font-medium"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        id="location-name"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Enter location"
                      />
                    </>
                  )}

                  {locationFilters.fromLocation && (
                    <>
                      <label
                        htmlFor="start-location"
                        className="block text-sm font-medium"
                      >
                        From Location
                      </label>
                      <input
                        type="text"
                        id="start-location"
                        value={startLocation}
                        onChange={(e) => setStartLocation(e.target.value)}
                        className="block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Enter start location"
                      />
                    </>
                  )}

                  {locationFilters.toLocation && (
                    <>
                      <label
                        htmlFor="end-location"
                        className="block text-sm font-medium"
                      >
                        To Location
                      </label>
                      <input
                        type="text"
                        id="end-location"
                        value={endLocation}
                        onChange={(e) => setEndLocation(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Enter end location"
                      />
                    </>
                  )}
                </div>
              )}

              {/* Status Filter */}
              {showStatus && filters.status && (
                <div className="my-2">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  >
                    <option value="All">All</option>
                    <option value="full">Completed</option>
                    <option value="required">InComplete</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              )}

              {/* Date Range Filter */}
              {filters.dateRange && (
                <div className="my-2">
                  <label
                    htmlFor="start-date"
                    className="block text-sm font-medium "
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  />
                  <label
                    htmlFor="end-date"
                    className="block text-sm font-medium"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  />
                </div>
              )}

              {/* Submit and Reset buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
                >
                  Apply
                </button>
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg"
                  onClick={() => {
                    setFilters({
                      location: false,
                      status: false,
                      dateRange: false,
                    });
                    setLocationFilters({
                      location: false,
                      fromLocation: false,
                      toLocation: false,
                    });

                    setLocation("");
                    setStartLocation("");
                    setEndLocation("");
                    setStatus("All");
                    setStartDate("");
                    setEndDate("");
                    setJourneys(journeys); // Reset the journeys to the original unfiltered list
                    setShowFilters(false);
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search by location and description..."
            value={searchInfo}
            onChange={(e) => {
              setSearchInfo(e.target.value);
            }}
            // required
          />
          <button
            type="button"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handelFilterSearchClick}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </form>
    </>
  );
}

FilterComponent.propTypes = {
  journeys: PropTypes.array.isRequired,
  setJourneys: PropTypes.func.isRequired,
  showStatus: PropTypes.bool,
};

export default FilterComponent;
