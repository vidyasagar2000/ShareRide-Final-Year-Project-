import { useEffect, useState } from "react";
import "./MyJourney.css";

import FilterComponent from "../components/FilterComponent";
import { useJourney } from "../context/JourneyContext";
import JourneyCard from "../components/journey.card";
import Spinner from "../components/Spinner";
import { Outlet} from "react-router-dom";

function MyJourney() {
  const { allMyJourney, fetchAllMyJourney } = useJourney();
  const [filteredJourney, setFilteredJourney] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [cardJourney, setCardJourney] = useState({});
  

  console.log("allmyjourney", allMyJourney);
  console.log("journeys in myjourney", filteredJourney);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchAllMyJourney();
      setFilteredJourney(allMyJourney);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredJourney(allMyJourney);
  }, [allMyJourney]);

  const handleOpenJourneyCardFormClick = (_id) => {
    console.log('handleOpenJourneyCardFormClick',_id)
    // const currentCardJourney = filteredJourney.filter((journey) => journey._id === _id);
    // setCardJourney(currentCardJourney);
  }

  return (
    <div>
      <div className="filterComp">
        <FilterComponent journeys={allMyJourney} setJourneys={setFilteredJourney} filteredData={filteredJourney} />
      </div>
      {/* <div className="cards">
        {filteredJourney?.map((journey) => (
          <JourneyCard key={journey._id} journey={journey} />
        ))}
      </div> */}

      {loading ? (
        <Spinner />
      ) : (
        <div className="cards">
          {filteredJourney?.map((journey) => (
            <JourneyCard key={journey._id} journey={journey}
            onClick={()=>handleOpenJourneyCardFormClick(journey._id)}
            />
          ))}
        </div>
      )}
      <div className="journeyCardForm" >
          <Outlet/>
      </div>
    </div>
  );
}

export default MyJourney;
