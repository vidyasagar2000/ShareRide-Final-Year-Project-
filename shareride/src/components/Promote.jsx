import "./Promote.css";
import { useState } from "react";

const Promote = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const websiteLink = "https://share-ride-eight.vercel.app/";
    navigator.clipboard.writeText(websiteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000); // Reset the copied status after 3 seconds
  };

  return (
    <section className="promote-section">
      <div className="container">
        <h2 className="promote-title">
          Promote Share-Ride – Travel Together, Save Together
        </h2>

        <p className="promote-intro">
          <strong>Share-Ride</strong> helps you and your community save on
          travel costs by connecting travelers to share rides. Students,
          teachers, faculty, coordinators, staff members, and even locals of
          NITA are part of the effort to promote this initiative.
        </p>

        <div className="promote-content">
          <h3>How to Promote Share-Ride:</h3>
          <ul className="promote-list">
            <li>
              <strong>Students:</strong> Spread the word among your classmates
              by sharing ride details, promoting on social media, and inviting
              friends to join your ride.
            </li>
            <li>
              <strong>Teachers and Faculty:</strong> Encourage students to use
              Share-Ride for group travels and field trips, promoting cost-saving
              and environmental benefits.
            </li>
            <li>
              <strong>Coordinators & Staff Members:</strong> Organize carpool
              groups for events and daily commuting. Share-Ride makes travel
              easier for large groups.
            </li>
            <li>
              <strong>Dean & Director of NITA:</strong> Promote sustainable
              transportation on campus by encouraging students and staff to adopt
              Share-Ride for daily commutes.
            </li>
            <li>
              <strong>Locals of NITA:</strong> Support the initiative by sharing
              rides with students and staff traveling through the same routes.
              Promote community connectivity.
            </li>
          </ul>

          <h3>Benefits of Promoting Share-Ride:</h3>
          <ul className="promote-list">
            <li>
              <strong>Cost Efficiency:</strong> More people using Share-Ride
              means more co-travelers and lower travel costs for everyone.
            </li>
            <li>
              <strong>Environmental Impact:</strong> Fewer vehicles on the road
              result in lower carbon emissions, contributing to a cleaner
              environment.
            </li>
            <li>
              <strong>Community Building:</strong> Promoting Share-Ride fosters a
              stronger sense of community, bringing together students, faculty,
              and locals of NITA.
            </li>
          </ul>

          <h3>Get Involved:</h3>
          <p className="promote-cta">
            Whether you&apos;re a student, teacher, faculty member, or local of
            NITA, you can make a difference by promoting{" "}
            <strong>Share-Ride</strong>. Start promoting today and help build a
            more connected, cost-effective travel solution!
          </p>

          {/* Share Section */}
          <div className="share-section">
            <h3>Share Our Website:</h3>
            <p>Help others discover Share-Ride! Share the link below:</p>
            <div className="copy-link-container">
              <input
                type="text"
                value="https://share-ride-eight.vercel.app/"
                readOnly
                className="copy-link-input"
              />
              <button onClick={handleCopyLink} className="copy-button">
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promote;
