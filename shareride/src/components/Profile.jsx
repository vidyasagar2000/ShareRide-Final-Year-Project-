import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Profile.css"; // Assuming you'll create a CSS file for styling
import EditProfile from "./EditProfile";
import { useAuth } from "../context/AuthContext";
import { useJourney } from "../context/JourneyContext";

const Profile = () => {
  // const [user] = useState(null);

  const { user,updateUserProfileImage } = useAuth();
  const { allMyJourney } = useJourney();
  const [isopenedUpdateForm, setOpenUpdateForm] = useState(false);
  const profileImageFileInputRef=useRef(null);
  // const [
  //   // journeys,
  //   setJourneys,
  // ] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        // Hardcoded user data
        // const hardcodedUser = {
        //   fullName: "John Doe",
        //   phoneNo: "+1234567890",
        //   enrollmentNo: "123456",
        //   imageUrl:
        //     "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
        // };

        // Hardcoded journey data
        // const hardcodedJourneys = [
        //   {
        //     _id: "journey1",
        //     journeyStartLocation: "Main Gate",
        //     journeyEndLocation: "Downtown",
        //     journeyDate: "2024-09-20T00:00:00Z",
        //     journeyTime: "10:00 AM",
        //     journeyDescription: "A ride from the main gate to downtown.",
        //     status: "required",
        //     fare: 15,
        //   },
        //   {
        //     _id: "journey2",
        //     journeyStartLocation: "Campus Entrance",
        //     journeyEndLocation: "Airport",
        //     journeyDate: "2024-09-22T00:00:00Z",
        //     journeyTime: "3:00 PM",
        //     journeyDescription: "Airport transfer from the campus entrance.",
        //     status: "full",
        //     fare: 25,
        //   },
        // ];

        // Set the state with hardcoded data
        // setUser(hardcodedUser);
        // setJourneys(hardcodedJourneys);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenEditProfileForm = () => {
    setOpenUpdateForm((prev) => !prev);
  };

  const handleImageChange =async ()=>{
    console.log("handleImageChange clicked");
    await updateUserProfileImage(profileImageFileInputRef);
  };
  if (loading) return <div className="loading">Loading...</div>;

  // console.log("user.imageUrl",user.imageUrl);
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-container">
        <input type="file" id="profileImageUpload"
         className="uploadProfileImage" 
         onChange={handleImageChange}
         ref={profileImageFileInputRef}
         accept="image/*" 
        />
        <label htmlFor="profileImageUpload" className="custom-file-upload">
          {user.imageUrl ? (
            <img src={user.imageUrl} alt="Profile" className="profile-image" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="profile-image"
              viewBox="0 0 512 512"
            >
              <path d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0" />
            </svg> 
           
          )}
          </label> 
        </div>
        <div className="profile-info-container">
          <h1 className="profile-name">{user.fullName?.toUpperCase()}</h1>

          <div className="profile-details">
            <div className="details-list">
              <p>
                <strong>Enrollment No:</strong> {user?.enrollmentNo?.toUpperCase()}
              </p>
              <p>
                <strong>Phone No:</strong> {user.phoneNo}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="journey-container">
        {!isopenedUpdateForm ? (
          <div className="journey-info">
            <h2 className="RecentJourneysHeading">My Recent Journeys</h2>
            <div className="RecentJourneysList">
              <div className="the-journey">
                <h3>
                  {allMyJourney?.[0]?.journeyStartLocation || ""} to{" "}
                  {allMyJourney?.[0]?.journeyEndLocation || ""}
                </h3>

                <p>
                  <strong>Date: </strong>
                  {/* September 20, 2024 */}
                  {allMyJourney?.[1]?.journeyDate.split('T')[0] || ""}

                </p>
                <p>
                  <strong>Time: </strong>
                  {/* 10:00 AM */}
                  {allMyJourney?.[0]?.journeyTime || ""}
                </p>
                <p>
                  <strong>Status: </strong>
                  {/* Required */}
                  {allMyJourney?.[0]?.status || ""}
                </p>
                <p className="fare">
                  <strong>Fare: </strong>
                  {/* Rs 15 */}
                  Rs {allMyJourney?.[0]?.fare || ""}
                </p>
              </div>
              <div className="the-journey">
                <h3>
                  {allMyJourney?.[1]?.journeyStartLocation || ""} to{" "}
                  {allMyJourney?.[1]?.journeyEndLocation || ""}
                </h3>

                <p>
                  <strong>Date: </strong>
                  {/* September 20, 2024 */}
                  {allMyJourney?.[1]?.journeyDate.split('T')[0] || ""}

                </p>
                <p>
                  <strong>Time: </strong>
                  {/* 10:00 AM */}
                  {allMyJourney?.[1]?.journeyTime || ""}
                </p>
                <p>
                  <strong>Status: </strong>
                  {/* Required */}
                  {allMyJourney?.[1]?.status || ""}
                </p>
                <p className="fare">
                  <strong>Fare: </strong>
                  {/* Rs 15 */}
                   Rs {allMyJourney?.[1]?.fare || ""}
                </p>
              </div>
              {/* <div className="the-journey">
                <h3>Campus Entrance to Airport</h3>
                <p>
                  <strong>Date:</strong> September 22, 2024
                </p>
                <p>
                  <strong>Time:</strong> 3:00 PM
                </p>
                <p>
                  <strong>Status:</strong> Full
                </p>
                <p className="fare">
                  <strong>Fare:</strong> $25
                </p>
              </div> */}
            </div>
            <Link to="/app/myJourney" className="showMoreJourneys">
              Show More
            </Link>{" "}
          </div>
        ) : (
          <div className="EditProfileContainer">
            <EditProfile />
          </div>
        )}

        {isopenedUpdateForm ? (
          <button
            id="EditProfileBtn"
            type="button"
            onClick={handleOpenEditProfileForm}
          >
            Close Edit Profile Form
          </button>
        ) : (
          <button
            id="EditProfileBtn"
            type="button"
            onClick={handleOpenEditProfileForm}
          >
            Open Edit Profile Form
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
