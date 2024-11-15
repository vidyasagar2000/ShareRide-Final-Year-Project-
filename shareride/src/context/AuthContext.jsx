import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const AuthContext = createContext();

// const BASE_URL = "https://shareride-final-year-project-1.onrender.com/"; // Corrected the URL scheme
// const BASE_URL = "/"; // Corrected the URL scheme
const BASE_URL = "http://localhost:3000/";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function createUser(
    fullName,
    enrollmentNo,
    phoneNo,
    password,
    imageUrl = "https://i.pravatar.cc/100?u=zz"
  ) {
    console.log("signup", fullName, phoneNo, password, enrollmentNo);
    const Response = await fetch(`${BASE_URL}user/signup`, {
      // const Response = await fetch(`/user/signup`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        phoneNo,
        password,
        enrollmentNo,
        imageUrl,
      }),
    });
    const res = await Response.json();
    return res;
  }

  async function login(enrollmentNo, password) {
    const token = localStorage.getItem("token");
    const Response = await fetch(`${BASE_URL}user/signin`, {
      // const Response = await fetch(`/user/signin`, {

      method: "POST",
      // credentials:"include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ enrollmentNo, password }),
    });

    const res = await Response.json();

    console.log("token from backend", res);
    if (res.success) {
      setIsAuthenticated(true);
      setUser(res?.user || {});
      localStorage.setItem("token", res.token);
      toast.success("Logged In Successfully!");
      return isAuthenticated;
    } else {
      toast.error(res.error);
    }
  }

  const updateUserProfile = async (fullName, phoneNo, password) => {
    try {
      const option = {
        method: "POST",
        // credentials: "include", // Uncomment if needed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phoneNo,
          password,
          _id: user._id,
          enrollmentNo: user.enrollmentNo,
        }),
      };

      const response = await fetch(`${BASE_URL}user/updateProfile`, option);
      // const response = await fetch(`/user/updateProfile`, option);


      if (response.ok) {
        const res = await response.json();
        const { user, token } = res;
        setUser(user);
        localStorage.setItem("token", token);
        toast.success("Successfully updated user profile");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to update user profile");
      }
    } catch (error) {
      toast.error("Failed to update user profile");
      console.error(error);
    }
  };

  const updateUserPassword = async (currentPassword, newPassword) => {
    try {
      const option = {
        method: "POST",
        // credentials: "include", // Uncomment if needed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: currentPassword,
          newPassword,
          _id: user._id,
          enrollmentNo: user.enrollmentNo,
        }),
      };

      const response = await fetch(`${BASE_URL}user/updatePassword`, option);
      // const response = await fetch(`/user/updatePassword`, option);


      if (response.ok) {
        const res = await response.json();
        const { user, token } = res;
        setUser(user);
        localStorage.setItem("token", token);
        toast.success("Successfully updated user password");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to update user password");
      }
    } catch (error) {
      toast.error("Failed to update user password");
      console.error(error);
    }
  };

  const updateUserProfileImage = async (profileImageFileInputRef) => {
    const token = localStorage.getItem("token");
  
    const formData = new FormData();
    if (profileImageFileInputRef.current.files[0]) {
      formData.append('userProfileImage', profileImageFileInputRef.current.files[0]);
    }
  
    // Use formData.get() to log the file for debugging
    console.log("updateUserProfileImage", formData.get('userProfileImage'));
  
    const option = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      body: formData, // FormData for file upload
    };
  
    try {
      // const response = await fetch('/user/updateProfileImage', option);
      const response = await fetch(`${BASE_URL}/user/updateProfileImage`, option);
      if (response.ok) {
        const res = await response.json();
        console.log("res from backend in upload user Image",res);
        const { user, token } = res;
        setUser(user); // Assuming setUser is defined in your context
        localStorage.setItem("token", token);
        toast.success("Successfully updated profile image");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to update profile image");
      }
    } catch (err) {
      toast.error("Something went wrong", err);
    }
  };
  
  function logout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    toast.success("Logged Out Successfully");
  }

  return (
    <AuthContext.Provider
      value={{
        createUser,
        login,
        logout,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
        updateUserProfile,
        updateUserPassword,
        updateUserProfileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthProvider");
  }
  return context;
}

// Prop validation for AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures `children` is passed and is a React node
};

export { useAuth, AuthProvider, AuthContext };
