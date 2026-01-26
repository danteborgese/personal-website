export default function NewsletterSignup() {
  return (
    <section className="newsletter-section">
      <div className="container">
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
    </section>
  );
}
