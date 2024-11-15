// import Header from "./Header";
import "./Team.css";

const Team = () => {
  return (
    <>
      {/* <Header /> */}
      <section className="team-section">
        <h2 className="team-title">Under the supervision of Dr. Mrinal Kanti Debbarma Sir</h2>

        <p className="team-intro">
          <strong>Share-Ride</strong> is powered by a dedicated team committed
          to making your travel experience seamless and cost-effective. Get to
          know the people who make it all possible.
        </p>

        <div className="team-content">
          <div className="team-member">
            <h3 className="team-member-name">Member 1 : Vidya Sagar</h3>
            <p className="team-member-contact">
              <strong>Phone:</strong> +91 6201427621
            </p>
            <p className="team-member-contact">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:vidya9955297836@gmail.com"
                className="team-member-link"
              >
                vidya9955297836@gmail.com
              </a>
            </p>
          </div>
          <div className="team-member">
            <h3 className="team-member-name">Member 2 : Mohit Pal</h3>
            <p className="team-member-contact">
              <strong>Phone:</strong> +91 9811424101
            </p>
            <p className="team-member-contact">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:oohomohit@gmail.com"
                className="team-member-link"
              >
                ohoomohit@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
