import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

function Header({toggleSidebar}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // To get the current path

  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate("/app/login");
    } else {
      navigate("/login");
    }
  };
  const handleSignupClick = () => {
    if (isAuthenticated) {
      navigate("/app/signup");
    } else {
      navigate("/signup");
    }
  };

  const handleContactClick = () => {
    if (isAuthenticated) {
      navigate("/app/contact");
    } else {
      navigate("/contact");
    }
  };

  const handleBlogClick = () => {
    if (isAuthenticated) {
      navigate("/app/blog");
    } else {
      navigate("/blog");
    }
  };

  const handleFeatureClick = () => {
    if (isAuthenticated) {
      navigate("/app/feature");
    } else {
      navigate("/feature");
    }
  };

  const handleTeamClick = () => {
    if (isAuthenticated) {
      navigate("/app/team");
    } else {
      navigate("/team");
    }
  };

  const handleAboutClick = () => {
    if (isAuthenticated) {
      navigate("/app/about");
    } else {
      navigate("/about");
    }
  };

  const handleHomeClick = () => {
    if (isAuthenticated) {
      navigate("/app/home");
    } else {
      navigate("/home");
    }
  };

  const handleSideBarToggle = (e) => {
    e.stopPropagation();
    toggleSidebar(prev => !prev);
    
  };

  // Function to check if a link is active (updated to allow partial matches)
  const isActive = (path) => location.pathname.includes(path);

  return (
    <header className="flex shadow-md py-0 px-0 sm:px-10 bg-white font-[sans-serif] min-h-[5vh] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <Logo />
        <div
          id="collapseMenu"
          className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
        >
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              />
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              />
            </svg>
          </button>
          <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="mb-6 hidden max-lg:block">
              <a href="javascript:void(0)">
                <img
                  src="https://readymadeui.com/readymadeui.svg"
                  alt="logo"
                  className="w-36"
                />
              </a>
            </li>
            { (
              <li
                className={`max-lg:border-b border-gray-300 max-lg:py-3 px-3 ${
                  isActive("/home") ? "text-[#007bff]" : "text-gray-500"
                }`}
              >
                <a
                  href="javascript:void(0)"
                  className="hover:text-[#007bff] block font-semibold text-[15px]"
                  onClick={handleHomeClick}
                >
                  Home
                </a>
              </li>
            )}
            <li
              className={`max-lg:border-b border-gray-300 max-lg:py-3 px-3 ${
                isActive("/team") ? "text-[#007bff]" : "text-gray-500"
              }`}
            >
              <a
                href="javascript:void(0)"
                className="hover:text-[#007bff] block font-semibold text-[15px]"
                onClick={handleTeamClick}
              >
                Team
              </a>
            </li>
            <li
              className={`max-lg:border-b border-gray-300 max-lg:py-3 px-3 ${
                isActive("/feature") ? "text-[#007bff]" : "text-gray-500"
              }`}
            >
              <a
                href="javascript:void(0)"
                className="hover:text-[#007bff] block font-semibold text-[15px]"
                onClick={handleFeatureClick}
              >
                Feature
              </a>
            </li>
            <li
              className={`max-lg:border-b border-gray-300 max-lg:py-3 px-3 ${
                isActive("/blog") ? "text-[#007bff]" : "text-gray-500"
              }`}
            >
              <a
                href="javascript:void(0)"
                className="hover:text-[#007bff] block font-semibold text-[15px]"
                onClick={handleBlogClick}
              >
                Blog
              </a>
            </li>
            <li
              className={`max-lg:border-b border-gray-300 max-lg:py-3 px-3 ${
                isActive("/about") ? "text-[#007bff]" : "text-gray-500"
              }`}
            >
              <a
                href="javascript:void(0)"
                className="hover:text-[#007bff] block font-semibold text-[15px]"
                onClick={handleAboutClick}
              >
                About us
              </a>
            </li>
            <li
              className={`max-lg:border-b border-gray-300 max-lg:py-3 px-3 ${
                isActive("/contact") ? "text-[#007bff]" : "text-gray-500"
              }`}
            >
              <a
                href="javascript:void(0)"
                className="hover:text-[#007bff] block font-semibold text-[15px]"
                onClick={handleContactClick}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="flex max-lg:ml-auto space-x-3">
          {!isAuthenticated && (
            <button
              className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
              onClick={handleLoginClick}
            >
              Login
            </button>
          )}
          {!isAuthenticated && (
            <button
              className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
              onClick={handleSignupClick}
            >
              Sign up
            </button>
          )}
          {isAuthenticated && (<button id="toggleOpen"
            // className="lg:hidden"
            onClick={(e)=>handleSideBarToggle(e)}
          >
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 7h50v4H0V7zm0 16h50v4H0v-4zm0 16h50v4H0v-4z" />
            </svg>
          </button>)}
        </div>
      </div>
    </header>
  );
}

export default Header;

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};