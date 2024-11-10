import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import PopUp from "./components/PopUp.jsx";
// import MyJourneyForm from "./components/MyJourneyForm.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <MyJourneyForm/> */}
   {/* <PopUp/> */}
  </StrictMode> 
);
