// import React from 'react'
import "./StoreJourneyCards.css";

import JourneyCard from "../components/journey.card";
import { useEffect, useState } from "react";
import { useJourney } from "../context/JourneyContext";
import FilterComponent from "../components/FilterComponent";

function StoreJourneyCards() {
  const { allJourney, fetchAllJourney } = useJourney();
  const [filteredJourney, setFilteredJourney] = useState([]); 
 

  console.log(filteredJourney,setFilteredJourney)
  useEffect(() => {
    const fetchData = async () => {
      await fetchAllJourney();
    };
  
    fetchData();

    setFilteredJourney(allJourney);
  }, []);

  useEffect(() => {
    setFilteredJourney(allJourney);
  },[allJourney])
 
  return (
    <>
      <FilterComponent journeys={allJourney} setJourneys={setFilteredJourney} showStatus={false}></FilterComponent>
      <div className="journeyCardsContainer">
      {filteredJourney?.map((journey) => {
        if (journey?.status === "required") {
          return <JourneyCard key={journey._id} journey={journey} />;
        }

        return null;
      })}
    </div>
    </>
  );
}

export default StoreJourneyCards;
