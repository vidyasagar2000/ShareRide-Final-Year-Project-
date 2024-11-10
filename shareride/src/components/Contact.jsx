import "./Contact.css";
// import Header from "./Header";

const Contact = () => {
  return (
    <>
      {/* <Header /> */}
      <section className="contact-section">
        <h2 className="contact-title">Get in Touch with Share-Ride</h2>

        <p className="contact-intro">
          Have questions or need assistance? <strong>Share-Ride</strong> is here
          to help. Feel free to reach out to us through the options below, and
          we will get back to you as soon as possible.
        </p>

        <div className="contact-content">
          <h3>Contact Options:</h3>
          <ul className="contact-list">
            <li>
              <strong>Email Us:</strong> Send us an email at{" "}
              <a href="mailto:support@share-ride.com" className="contact-link">
                support@share-ride.com
              </a>
              .
            </li>
            <li>
              <strong>Call Us:</strong> Reach out to our support team at{" "}
              <a href="tel:+1234567890" className="contact-link">
                +1 234 567 890
              </a>
              .
            </li>
            <li>
              <strong>Visit Us:</strong> Our office is located at 123 Share-Ride
              St., Travel City, TC 45678. Feel free to drop by during office
              hours.
            </li>
          </ul>

          <h3>Contact Form:</h3>
          <form className="contact-form">
            <label htmlFor="name" className="contact-label">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                className="contact-input"
                required
              />
            </label>
            <label htmlFor="email" className="contact-label">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                className="contact-input"
                required
              />
            </label>
            <label htmlFor="message" className="contact-label">
              Message:
              <textarea
                id="message"
                name="message"
                className="contact-textarea"
                required
              ></textarea>
            </label>
            <button type="submit" className="contact-button">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
