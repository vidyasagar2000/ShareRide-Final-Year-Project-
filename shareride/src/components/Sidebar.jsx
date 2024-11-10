import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";
import { usePopUp } from "../context/PopUpContext";
// import PopUp from "./PopUp";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  const {setPopUPMessage, setIsPopUPVisible,setOnYesFunc,}=usePopUp();

  const handleLogout = () => {
    // Set the pop-up message
    setPopUPMessage("DO YOU WANT TO LOGOUT");

    // Set the function to be called when "Yes" is clicked
    setOnYesFunc(() => logout);

    // Show the pop-up
    setIsPopUPVisible(true);
};


  const handlePostClick = () => {
    navigate("/app/post");
  };

  const handleMyJourneyClick = () => {
    navigate("/app/myJourney");
  };

  const handleProfileClick = () => {
    navigate("/app/profile");
  };

  const handlePromoteClick = () => {
    const websiteLink = "https://share-ride-eight.vercel.app/";

    navigator.clipboard.writeText(websiteLink);
    toast.success("Website link copied to clipboard! Share & promote now.");
  };

  const handleAudianceClick = () => {
    navigate("/app/promote");
  };

  const handleDashBoardceClick = () => {
    navigate("/app/dashboard");
  };

  const isActive = (path) => location.pathname.includes(path);

  // ${
  //   isActive("/team") ? "text-[#007bff]" : "text-gray-500"
  // }`

  // Add this condition to each icon

  return (
    <>
      <nav className="bg-[#f7f7f8] h-screen fixed top-0 left-0 min-w-[250px] py-14 px-4 font-[sans-serif]">
        <div className="relative">
          {/* <a href="javascript:void(0)">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="w-[160px]"
            />
          </a> */}
          <div className="absolute -right-6 top-2 h-6 w-6 p-[6px] cursor-pointer bg-[#007bff] flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              className="w-4 h-4"
              viewBox="0 0 55.752 55.752"
            >
              <path
                d="M43.006 23.916a5.36 5.36 0 0 0-.912-.727L20.485 1.581a5.4 5.4 0 0 0-7.637 7.638l18.611 18.609-18.705 18.707a5.398 5.398 0 1 0 7.634 7.635l21.706-21.703a5.35 5.35 0 0 0 .912-.727 5.373 5.373 0 0 0 1.574-3.912 5.363 5.363 0 0 0-1.574-3.912z"
                data-original="#000000"
              />
            </svg>
          </div>
        </div>
        <div className="overflow-auto py-6 h-full mt-4">
          <ul className="space-y-1">
            <li>
              <a
                href="javascript:void(0)"
                className={`text-[15px] flex items-center px-4 py-3 rounded transition-all ${
                  isActive("/app/dashboard") ? "text-blue-600" : "text-black"
                } hover:bg-white hover:text-blue-600`}
                onClick={handleDashBoardceClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                    data-original="#000000"
                  />
                </svg>
                <span>Dashboard</span>
              </a>
            </li>
            <li onClick={handlePostClick}>
              <a
                href="javascript:void(0)"
                className={`text-[15px] flex items-center px-4 py-3 rounded transition-all ${
                  isActive("/app/post") ? "text-blue-600" : "text-black"
                } hover:bg-white hover:text-blue-600`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4H6c-2.206 0-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0-2H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6z"
                    data-original="#000000"
                  />
                  <path
                    d="M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z"
                    data-original="#000000"
                  />
                  <path
                    d="M6 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z"
                    data-original="#000000"
                  />
                </svg>
                <span>Posts Journey</span>
              </a>
            </li>

            <li onClick={handleMyJourneyClick}>
              <a
                href="javascript:void(0)"
                className={`text-[15px] flex items-center px-4 py-3 rounded transition-all ${
                  isActive("/app/myJourney") ? "text-blue-600" : "text-black"
                } hover:bg-white hover:text-blue-600`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-4"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                  <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
                </svg>
                <span className="font-medium">My Journey</span>
              </a>
            </li>

            {/* <li>
              <a
                href="javascript:void(0)"
                className="text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 510 510"
                >
                  <g fillOpacity=".9">
                    <path
                      d="M255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm0 459c-112.2 0-204-91.8-204-204S142.8 51 255 51s204 91.8 204 204-91.8 204-204 204z"
                      data-original="#000000"
                    />
                    <path
                      d="M267.75 127.5H229.5v153l132.6 81.6 20.4-33.15-114.75-68.85z"
                      data-original="#000000"
                    />
                  </g>
                </svg>
                <span>Schedules</span>
              </a>
            </li> */}

            {/* </li> */}
            <li onClick={handleAudianceClick}>
              <a
                href="javascript:void(0)"
                className={`text-[15px] flex items-center px-4 py-3 rounded transition-all ${
                  isActive("app/promote") ? "text-blue-600" : "text-black"
                } hover:bg-white hover:text-blue-600`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                    data-original="#000000"
                  />
                </svg>
                <span>Audience</span>
              </a>
            </li>

            <li>
              <a
                href="javascript:void(0)"
                className="text-[15px] flex items-center px-4 py-3 rounded transition-all text-black hover:bg-white hover:text-blue-600"
                onClick={handlePromoteClick}
              >
                {/* Share Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7 0-.24-.03-.47-.09-.7l7.05-4.11c.53.5 1.21.81 1.95.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.03.47.09.7L8.96 9.81C8.43 9.3 7.76 9 7 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.76 0 1.44-.3 1.96-.77l7.12 4.17c-.05.2-.08.42-.08.63 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3zm0-10.08c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-11 7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm11 7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                </svg>
                Share & Promote
              </a>
            </li>

            <li onClick={handleProfileClick}>
              <a
                href="javascript:void(0)"
                className={`text-[15px] flex items-center px-4 py-3 rounded transition-all ${
                  isActive("/app/profile") ? "text-blue-600" : "text-black"
                } hover:bg-white hover:text-blue-600`}
                onClick={handleProfileClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                    data-original="#000000"
                  />
                </svg>
                <span>Profile</span>
              </a>
            </li>
            <li onClick={handleLogout}>
              <a
                href="javascript:void(0)"
                className="text-red-600 hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-[18px] h-[18px] mr-4"
                  viewBox="0 0 6.35 6.35"
                >
                  <path
                    d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                    data-original="#000000"
                  />
                </svg>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
        {/* <div>
          <PopUp/>
        </div> */}
      </nav>
    </>
  );
}

export default Sidebar;
