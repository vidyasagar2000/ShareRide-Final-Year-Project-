import PropTypes from 'prop-types';
import Spinner from "./Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const location = useLocation();
 const {isAuthenticated, isLoading 
  // ,login
} =  useAuth();

  useEffect(() => {
   const loadProtectedPage=async ()=>{
    if (!isAuthenticated && !isLoading) {
      // const isNowAuthenticated=await login();
      // if(isNowAuthenticated){
      //   return;
      // }
      console.log("location in protected route",location)
      navigate("/login", { replace: true , state:location.pathname});
    }
   };

   loadProtectedPage();

  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated) return children;

  return null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
