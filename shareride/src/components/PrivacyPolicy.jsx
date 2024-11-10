// import Header from "./Header";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <>
      {/* <Header /> */}
      <section className="privacy-policy-section">
        <h2 className="privacy-policy-title">Share-Ride – Privacy Policy</h2>

        <p className="privacy-policy-intro">
          At <strong>Share-Ride</strong>, your privacy is important to us. This
          Privacy Policy outlines how we collect, use, and safeguard your
          personal information when using our platform. By using Share-Ride, you
          agree to the practices described in this policy.
        </p>

        <div className="privacy-policy-content">
          <h3>Information We Collect:</h3>
          <ul className="privacy-policy-list">
            <li>
              <strong>Personal Information:</strong> When you sign up or use
              Share-Ride, we may collect details like your name, email address,
              and phone number to facilitate the service.
            </li>
            <li>
              <strong>Ride Information:</strong> We collect information about
              the journeys you create or join, including destination, date, and
              co-travelers.
            </li>
            <li>
              <strong>Usage Data:</strong> To improve our platform, we may
              collect data on how you interact with the Share-Ride app or
              website.
            </li>
          </ul>

          <h3>How We Use Your Information:</h3>
          <ul className="privacy-policy-list">
            <li>
              <strong>Service Operation:</strong> We use your information to
              enable you to create or join journeys and connect with
              co-travelers.
            </li>
            <li>
              <strong>Communication:</strong> We may send you updates about your
              journey, new features, or promotions.
            </li>
            <li>
              <strong>Improvement:</strong> The data we collect helps us enhance
              the platform user experience and offer new features.
            </li>
          </ul>

          <h3>Data Protection:</h3>
          <p>
            Share-Ride takes data security seriously. We use industry-standard
            security measures to protect your personal information from
            unauthorized access, alteration, or disclosure. However, no
            internet-based service is completely secure, and we encourage users
            to take precautions when sharing personal details online.
          </p>

          <h3>Updates to Privacy Policy:</h3>
          <p>
            We may update this Privacy Policy periodically to reflect changes in
            our practices or legal requirements. You will be notified of any
            significant updates via email or through the app.
          </p>

          <h3>Contact Us:</h3>
          <p className="privacy-policy-contact">
            If you have any questions or concerns regarding this Privacy Policy,
            feel free to <strong>contact us</strong> at{" "}
            <a
              href="mailto:privacy@share-ride.com"
              className="privacy-policy-link"
            >
              privacy@share-ride.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
