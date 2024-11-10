import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import PopUp from "../components/PopUp";
import ChatRoom from "../components/ChatRoom";
// import ChatRoom from "../components/ChatRoom";


const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  

  // const isPopUp=true;

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="w-full">
        <Header toggleSidebar={setIsSidebarOpen} />
      </div>

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-64"
          >
            <Sidebar
            />
          </div>
        )}

        {/* Main Content */}

       
       
        
        <PopUp/>
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto z-0">
          <Outlet />
        </main>
        <ChatRoom/>
      </div>
      {/* <ChatRoom/> */}

      {/* Footer */}
      {/* <Footer className="p-4 bg-gray-200 text-center" /> */}
    </div>
  );
};

export default AppLayout;
