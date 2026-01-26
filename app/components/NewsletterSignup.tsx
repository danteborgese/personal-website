export default function NewsletterSignup() {
  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-signup">
          <p>Join thousands of people who get my free newsletter delivered to their inbox, every week.</p>
          <form className="newsletter-form" action="https://wisdomoftheweek.substack.com/api/v1/free" method="post" target="_blank">
            <input type="email" name="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}
