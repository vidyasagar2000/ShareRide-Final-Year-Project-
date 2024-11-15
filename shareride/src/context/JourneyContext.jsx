import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const JourneyContext = createContext();

// const BASE_URL = "http://localhost:3000/"; // Corrected the URL scheme
const BASE_URL = "https://shareride-final-year-project-1.onrender.com/"; 
// const BASE_URL = "/"; // Corrected the URL scheme

function JourneyProvider({ children }) {
  const { user } = useAuth();
  const userId = user?._id;
  const [allJourney, setAllJourney] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allMyJourney,setAllMyJourney] = useState([]);

  async function fetchAllJourney() {
    setIsLoading(true);

    const token = localStorage.getItem("token");
    // console.log('token in authorisation:', `Bearer ${token}`);

    try {
      const response = await fetch(`${BASE_URL}journey/journey-requests`, {
        // const response = await fetch(`/journey/journey-requests`, {

        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const res = await response.json();

      // console.log('fetchAllJourneys',res);
      setAllJourney(res);
      await fetchAllMyJourney();

    } catch (error) {
      console.error("Fetching error", error);
      toast.error("Fetching error");
    } finally {
      setIsLoading(false);
    }
  }


  async function fetchAllMyJourney() {
    setIsLoading(true);

    const token = localStorage.getItem("token");
    // console.log('token in authorisation:', `Bearer ${token}`);

    try {
      const response = await fetch(`${BASE_URL}journey/my-journey`, {
        // const response = await fetch(`/journey/my-journey`, {

        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const res = await response.json();
      setAllMyJourney(res)
    } catch (error) {
      console.error("Fetching MyJourney error", error);
      toast.error("Fetching MyJourney error");
    } finally {
      setIsLoading(false);
    }
  }

  async function createJourney(
    passengerRequired,
    journeyStartLocation,
    journeyEndLocation,
    journeyDescription,
    fare,
    journeyDate,
    journeyTime
  ) {
    setIsLoading(true);

    // console.log('create Journey fetch');
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}journey/journey-request`, {
        // const response = await fetch(`/journey/journey-request`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          passengerRequired,
          journeyStartLocation,
          journeyEndLocation,
          journeyDescription,
          fare,
          journeyDate,
          journeyTime,

        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log(res);
      await fetchAllJourney();
    } catch (error) {
      toast.error(`There was an error creating the journey: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function joinJourney(id) {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}journey/join-journey`, {
        // const response = await fetch(`/journey/join-journey`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log(res);
      await fetchAllJourney();
      toast.success("Successfully joined journey item");
      return res;
    } catch {
      toast.error("unable to join journey");
    } finally {
      setIsLoading(false);
    }
  }

  const exitJourney = async (id) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}journey/journey-exit`, {
        // const response = await fetch(`/journey/journey-exit`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log(res);
      await fetchAllJourney();
      toast.success("Successfully exited journey");
    } catch {
      toast.error("unable to exit journey");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelJourney = async (_id) => {
    try {
      const token = localStorage.getItem("token");
  
      const option = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ _id }),
      };
  
      const response = await fetch(`${BASE_URL}journey/journeyCancel`, option);
      // const response = await fetch(`/journey/journeyCancel`, option);

  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json(); 
      console.log(result); 
      await fetchAllJourney();
      toast.success("Journey cancelled successfully");
      return result;
    } catch (error) {
      toast.error(`Unable to cancel the journey ride`);
      console.error("Error cancelling journey:", error);
    }
  };
  const restartJourney = async (_id) => {
    try {
      const token = localStorage.getItem("token");
  
      const option = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      };
  
      const response = await fetch(`${BASE_URL}journey/restartJourney`, option);
      // const response = await fetch(`/journey/restartJourney`, option);

  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result);
      await fetchAllJourney();
      toast.success("Journey restarted successfully");
    } catch (error) {
      toast.error("Unable to restart the journey");
      console.error("Error restarting journey:", error);
    }
  };
  

  const deleteJourneyInfo = async (id) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}journey/delete-journey`, {
        // const response = await fetch(`/journey/delete-journey`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success("Successfully deleted journey item");
      const res = await response.json();
      console.log(res);
      await fetchAllJourney();
    } catch (error) {
      console.error("Error deleting journey:", error);
      toast.error("fail to delete journey item");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPassengersDetails = async (users) => {
    setIsLoading(true); // Ensure loading state is set before making the request
    
    console.log("users in fetch passengers",users)
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("No token found. Please login again.");
      }
  
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ users }),
      };
  
      const response = await fetch(`${BASE_URL}journey/passengers`, option);
      // const response = await fetch(`/journey/passengers`, option);

  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const res = await response.json();
    
      console.log("Response from backend in passenger fetch",res);
      return res;
  
    } catch (error) {
      console.error("Error while fetching passengers details:", error);
      toast.error("Failed to fetch passengers details");
      return null; // Return null to handle cases where an error occurs
    } finally {
      setIsLoading(false); // Ensure loading state is turned off after request completes
    }
  };
  
  const UpdateJourney = async(journey)=>{
    setIsLoading(true);
    
    console.log("updates to happen in Journey form",journey)
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("No token found. Please login again.");
      }
  
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...journey }),
      };
  
      const response = await fetch(`${BASE_URL}journey/passengers`, option);
      // const response = await fetch(`/journey/journey-Update`, option);

  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const res = await response.json();
      await fetchAllJourney();
      
      console.log("Response from backend in update journey form",res);
      toast.success("Journey updated successfully");
      return res;
  
    } catch (error) {
      console.error("Error while updating journey form:", error);
      toast.error("Failed to update journey form");
      return null; 
    } finally {
      setIsLoading(false); 
    }
  }

  return (
    <JourneyContext.Provider
      value={{
        allJourney,
        setAllJourney,
        isLoading,
        setIsLoading,
        fetchAllJourney,
        createJourney,
        joinJourney,
        deleteJourneyInfo,
        exitJourney,
        fetchAllMyJourney,
        allMyJourney,
        fetchPassengersDetails,
        cancelJourney,
        restartJourney,
        UpdateJourney
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}

function useJourney() {
  const context = useContext(JourneyContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthProvider");
  }
  return context;
}

// Prop validation for AuthProvider
JourneyProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures `children` is passed and is a React node
};

export { useJourney, JourneyProvider };
