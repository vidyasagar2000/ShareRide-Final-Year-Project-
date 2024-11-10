import "./Blog.css";
// import Header from "./Header";

const Blog = () => {
  return (
    <>
      {/* <Header /> */}
      <section className="blog-section">
        <h2 className="blog-title">
          Share-Ride Blog – Stay Updated and Informed
        </h2>

        <p className="blog-intro">
          Welcome to the <strong>Share-Ride Blog</strong>! Here, you will find
          the latest news, travel tips, and updates from our community. Whether
          you are looking for inspiration for your next trip or want to learn
          more about how Share-Ride is enhancing the travel experience, you have
          come to the right place.
        </p>

        <div className="blog-content">
          <h3>Latest Posts:</h3>
          <ul className="blog-list">
            <li>
              <article className="blog-post">
                <h4 className="blog-post-title">
                  How Share-Ride Can Save You Money on Your Next Trip
                </h4>
                <p className="blog-post-excerpt">
                  Discover practical tips on how using Share-Ride can help you
                  reduce your travel expenses. From splitting costs with
                  co-travelers to finding the best deals, learn how to make the
                  most of your journeys.
                </p>
                <a
                  href="/blog/how-share-ride-can-save-you-money"
                  className="blog-read-more"
                >
                  Read More
                </a>
              </article>
            </li>
            <li>
              <article className="blog-post">
                <h4 className="blog-post-title">
                  Top Destinations for Share-Ride Users
                </h4>
                <p className="blog-post-excerpt">
                  Explore the most popular destinations among Share-Ride users.
                  Whether youe looking for a weekend getaway or a long vacation,
                  find out where your fellow travelers are heading.
                </p>
                <a href="/blog/top-destinations" className="blog-read-more">
                  Read More
                </a>
              </article>
            </li>
            <li>
              <article className="blog-post">
                <h4 className="blog-post-title">
                  Success Stories from Share-Ride Users
                </h4>
                <p className="blog-post-excerpt">
                  Read inspiring stories from Share-Ride users who have had
                  amazing experiences sharing rides and saving on travel. Get
                  motivated by their adventures and start planning your own.
                </p>
                <a href="/blog/success-stories" className="blog-read-more">
                  Read More
                </a>
              </article>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Blog;
