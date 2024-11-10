import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 text-gray-800 bg-gray-100 p-3 px-6 rounded-sm transition-all duration-300"
                : "flex items-center gap-3 text-gray-600 p-3 px-6 transition-all duration-300"
            }
          >
            <HiOutlineHome className="w-6 h-6 text-gray-400 transition-all duration-300" />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 text-gray-800 bg-gray-100 p-3 px-6 rounded-sm transition-all duration-300"
                : "flex items-center gap-3 text-gray-600 p-3 px-6 transition-all duration-300"
            }
          >
            <HiOutlineCalendarDays className="w-6 h-6 text-gray-400 transition-all duration-300" />
            <span>Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cabins"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 text-gray-800 bg-gray-100 p-3 px-6 rounded-sm transition-all duration-300"
                : "flex items-center gap-3 text-gray-600 p-3 px-6 transition-all duration-300"
            }
          >
            <HiOutlineHomeModern className="w-6 h-6 text-gray-400 transition-all duration-300" />
            <span>Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 text-gray-800 bg-gray-100 p-3 px-6 rounded-sm transition-all duration-300"
                : "flex items-center gap-3 text-gray-600 p-3 px-6 transition-all duration-300"
            }
          >
            <HiOutlineUsers className="w-6 h-6 text-gray-400 transition-all duration-300" />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 text-gray-800 bg-gray-100 p-3 px-6 rounded-sm transition-all duration-300"
                : "flex items-center gap-3 text-gray-600 p-3 px-6 transition-all duration-300"
            }
          >
            <HiOutlineCog6Tooth className="w-6 h-6 text-gray-400 transition-all duration-300" />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
