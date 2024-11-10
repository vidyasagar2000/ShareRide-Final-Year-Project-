import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./LandingPageLayout.css";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function LandingPageLayout() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const location = useLocation();
  useEffect(() => {
    const loadLogin = async () => {
      if (isAuthenticated) {
        navigate(location.state);
        return;
      }
      console.log("login ho raha hai");
      const token = localStorage.getItem("token");
      console.log("login ho raha hai ka token", token);

      if (token) {
        const result = await login(); // Assuming login returns a result that updates isAuthenticated
        console.log("Login result:", result);

        if (isAuthenticated) {
          // Ensure that isAuthenticated is updated properly
          console.log(
            "isNowAuthenticated in login ho raha hai",
            isAuthenticated
          );
          console.log("location in url", location);

          // navigate(location.state);
          navigate("/dashboard");
        } else {
          console.log("Authentication failed");
        }
      }
    };

    loadLogin();
  }, [isAuthenticated]); // Adding dependencies for accurate updates

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     console.log("navigate")
  //     navigate("/app/dashboard");
  //   }
  // },[])
  return (
    <div id="container">
      <div id="header">
        <Header></Header>
      </div>
      <div id="main">
        <Outlet />
      </div>
    </div>
  );
}

export default LandingPageLayout;
