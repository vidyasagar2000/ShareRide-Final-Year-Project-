import "./Features.css";
// import Header from "./Header";

const Features = () => {
  return (
    <>
      {/* <Header /> */}
      <section className="highlights-section">
        <h2 className="highlights-title">Key Features of Share-Ride</h2>

        <p className="highlights-description">
          <strong>Share-Ride</strong> offers a range of features designed to
          enhance your travel experience. Whether you are creating a journey or
          joining one, our platform provides you with tools and options to make
          your travel more cost-effective and enjoyable.
        </p>

        <div className="highlights-content">
          <div className="highlights-item">
            <h3 className="highlights-heading">
              <span className="highlights-icon">💰</span> Cost Efficiency
            </h3>
            <p>
              Reduce your travel costs by splitting expenses with co-travelers.
              Share-Ride ensures that both journey creators and participants
              save money.
            </p>
          </div>

          <div className="highlights-item">
            <h3 className="highlights-heading">
              <span className="highlights-icon">🔗</span> Seamless Connections
            </h3>
            <p>
              Easily connect with co-travelers heading to the same destination
              at the same time. Share-Ride simplifies finding and joining rides.
            </p>
          </div>

          <div className="highlights-item">
            <h3 className="highlights-heading">
              <span className="highlights-icon">🔄</span> Flexible Options
            </h3>
            <p>
              Choose to offer a ride or join an existing one. Share-Ride gives
              you multiple ways to save on travel.
            </p>
          </div>

          <div className="highlights-item">
            <h3 className="highlights-heading">
              <span className="highlights-icon">📋</span> Effortless Ride Posting
            </h3>
            <p>
              Quickly post your journey details or browse available rides to
              join. Share-Ride makes the process smooth and straightforward.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
