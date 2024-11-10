import "./About.css";
// import Header from "./Header";

const About = () => {
  return (
    <>
      {/* <Header/> */}
    <section className="about-section">
      <h2 className="about-title">
        Share-Ride – Journey Together, Save Together
      </h2>

      <p className="about-intro">
        <strong>Share-Ride</strong> is a platform designed to make travel more
        affordable and efficient. Whether you create a journey or join someone
        else, Share-Ride helps you save on travel costs by connecting you with
        co-travelers heading to the same destination.
      </p>

      <div className="about-content">
        <h3>Create or Join a Journey:</h3>
        <ul className="about-list">
          <li>
            <strong>Create a Journey on Share-Ride:</strong> Post your trip
            details—destination and date—and let co-travelers join you to share
            the cost.
          </li>
          <li>
            <strong>Join a Posted Ride:</strong> If you are traveling to the same
            location, easily join an existing journey on Share-Ride to split
            travel expenses and save money.
          </li>
        </ul>

        <h3>Features of Share-Ride:</h3>
        <ul className="about-list">
          <li>
            <strong>Cost Efficiency:</strong> Whether you post or join a
            journey, Share-Ride helps you reduce travel costs by splitting them
            with co-travelers.
          </li>
          <li>
            <strong>Seamless Connections:</strong> Find co-travelers heading to
            the same place at the same time, making it easy to share rides.
          </li>
          <li>
            <strong>Flexible Options:</strong> With Share-Ride, you can either
            offer a ride or join one, giving you multiple ways to save.
          </li>
          <li>
            <strong>Effortless Ride Posting:</strong> Quickly post your journey
            details or browse available rides to join, all within Share-Ride.
          </li>
        </ul>

        <h3>Call to Action:</h3>
        <p className="about-cta">
          Want to lower your travel costs?{" "}
          <strong>Create a journey or join one today</strong> on
          <strong> Share-Ride</strong> and start saving with co-travelers!
        </p>
      </div>
      </section>
      </>
  );
};

export default About;