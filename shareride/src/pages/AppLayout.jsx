import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import PopUp from "../components/PopUp";
import ChatRoom from "../components/ChatRoom";

const AppLayout = () => {
  const [isSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="w-full">
        <Header toggleSidebar={toggleSidebar} />
      </div>

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar for larger screens */}
        {isSidebarOpen && (
          <div className="hidden lg:block lg:w-64">
            <Sidebar />
          </div>
        )}

        {/* Sliding Sidebar overlay for mobile screens */}
        <div
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-gray-200 transform transition-transform duration-300 ease-in-out ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
        >
          <Sidebar />
        </div>

        {/* Overlay for mobile sidebar */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
            onClick={toggleSidebar} // Close sidebar when overlay is clicked
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto z-0 w-full">
          <Outlet />
        </main>

        <PopUp />
        <ChatRoom />
      </div>
    </div>
  );
};

export default AppLayout;
