// import React from 'react'
import "./LandingPage.css";

import Footer from "./Footer"
import { useNavigate } from "react-router-dom";


function LandingPage() {
  
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate("/login");
  }

  return (
    <div className="page-container">
      <section className="intro-section">
        <div className="intro-hero">
          <h1 className="intro-title">
            Welcome to Share-Ride – Journey Together, Save Together
          </h1>
          <p className="intro-subtitle">
            A smarter way to travel. Connect with co-travelers, reduce your
            travel costs, and enjoy the journey together!
          </p>
          <a className="intro-button"
            onClick={handleLoginClick}
          >
            Start Your Journey
          </a>
        </div>

        <div className="features-section">
          <h2 className="features-title">Why Choose Share-Ride?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Cost-Saving</h3>
              <p>
                Reduce your travel expenses by sharing the cost with
                co-travelers heading to the same destination.
              </p>
            </div>
            <div className="feature-item">
              <h3>Flexible Options</h3>
              <p>
                Post a journey or join an existing one – whatever suits your
                travel plans best.
              </p>
            </div>
            <div className="feature-item">
              <h3>Effortless Booking</h3>
              <p>
                Quickly browse available rides or post your trip details. It’s
                simple and easy.
              </p>
            </div>
            <div className="feature-item">
              <h3>Seamless Connections</h3>
              <p>
                Find travelers heading to the same place, ensuring a smooth and
                shared experience.
              </p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Share Your Next Ride?</h2>
          <p>
            Sign up now and join the Share-Ride community to start saving on
            your travel costs!
          </p>
          <a href="/signup" className="cta-button">
            Join Share-Ride
          </a>
        </div>
        
      </section>

      <Footer />
      </div>
  )
}

export default LandingPage;
