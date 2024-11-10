import { useState, useEffect } from "react";
// import Header from "./Header";
import "./TermsAndConditions.css";
import Spinner from "./Spinner";

const TermsAndConditions = () => {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      {/* <Header /> */}
      {loading ? (
        <Spinner/>
      ) : (
        <section className="terms-section">
          <h2 className="terms-title">Terms and Conditions</h2>
          <p className="terms-intro">
            Welcome to <strong>Share-Ride</strong>. By using our platform, you agree to the following terms and conditions. Please read them carefully.
          </p>

          <div className="terms-content">
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing or using Share-Ride, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use our services.
            </p>

            <h3>2. User Responsibilities</h3>
            <ul className="terms-list">
              <li><strong>Accuracy of Information:</strong> Users must provide accurate and up-to-date information when creating or joining journeys.</li>
              <li><strong>Respectful Behavior:</strong> Users must treat other users with respect and follow community guidelines.</li>
              <li><strong>Compliance with Laws:</strong> Users must comply with all applicable laws and regulations while using the platform.</li>
            </ul>

            <h3>3. Platform Use</h3>
            <ul className="terms-list">
              <li><strong>Service Availability:</strong> Share-Ride strives to ensure that the platform is available at all times, but does not guarantee uninterrupted service.</li>
              <li><strong>Account Security:</strong> Users are responsible for maintaining the confidentiality of their account credentials and for all activities under their account.</li>
              <li><strong>Content Ownership:</strong> Users retain ownership of their content but grant Share-Ride a license to use, display, and share it in accordance with our Privacy Policy.</li>
            </ul>

            <h3>4. Limitation of Liability</h3>
            <p>Share-Ride is not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the platform.</p>

            <h3>5. Changes to Terms</h3>
            <p>Share-Ride reserves the right to modify these Terms and Conditions at any time. Changes will be effective upon posting on the platform, and continued use of the service constitutes acceptance of the updated terms.</p>

            <h3>6. Contact Us</h3>
            <p>
              If you have any questions or concerns about these Terms and Conditions, please contact us at{" "}
              <a href="mailto:support@share-ride.com" className="terms-link">support@share-ride.com</a>.
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default TermsAndConditions;




