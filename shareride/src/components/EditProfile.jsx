import { useState } from "react";
import "./EditProfile.css";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const EditProfile = () => {
  const [formVisible, setFormVisible] = useState("profile"); // Use string to differentiate forms
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    enrollment: "123456789", // Static enrollment number
  });

  const {updateUserProfile, updateUserPassword} = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formVisible === "profile") {
      const { name:fullName, phone:phoneNo, password:password } = formData;
      updateUserProfile(fullName,phoneNo,password);
      console.log("Profile Data:", formData);
    } else if (formVisible === "password") {
      const {currentPassword, newPassword } = formData;
      updateUserPassword(currentPassword, newPassword);
      if (formData.newPassword === formData.confirmPassword) {
        console.log("Password Data:", formData);
      } else {
        toast.error("Passwords do not match.");
      }
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="updateBtn">
        <button id="UpdateProfileBtn" onClick={() => setFormVisible("profile")}>
          Update Profile
        </button>
        <button
          id="UpdatePasswordBtn"
          onClick={() => setFormVisible("password")}
        >
          Password
        </button>
      </div>

      {formVisible === "profile" && (
        <form id="editProfileForm" onSubmit={handleSubmit}>
          {/* <div className="enrollment-info form-group">
            <label htmlFor="enrollment">Enrollment No (Unique):</label>
            <input
              type="text"
              id="enrollment"
              name="enrollment"
              value={formData.enrollment}
              disabled
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone No:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your new password"
              required
            />
          </div>

          <button type="submit" id="updateBtn">
            Update Profile
          </button>
        </form>
      )}

      {formVisible === "password" && (
        <form id="editPasswordForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Enter your current password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter your new password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your new password"
              required
            />
          </div>

          <button type="submit" id="updateBtn">
            Update Password
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
