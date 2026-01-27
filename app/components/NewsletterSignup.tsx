export default function NewsletterSignup() {
  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-heading">
            <h2>Check out my free newsletter where I share some nuggets of wisdom.</h2>
          </div>
          <div className="newsletter-embed-wrapper">
            <iframe
              src="https://wisdomoftheweek.substack.com/embed"
              style={{ border: '1px solid #EEE', background: 'white' }}
              frameBorder="0"
              scrolling="no"
              title="Subscribe to newsletter"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
