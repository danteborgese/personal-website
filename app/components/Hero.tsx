import NewsletterSignup from './NewsletterSignup';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-banner">
        <img
          src="/Dante Wide Profile.png"
          alt="Dante Borgese"
          className="profile-banner-img"
        />
        <div className="hero-text-overlay">
          <h1 className="hero-name">Dante Borgese</h1>
          <p className="hero-location">Based in NYC</p>
          <h2 className="linkedin-title">Product & Growth Manager | Systems, GTM, and Distribution</h2>
        </div>
      </div>
      
      <div className="container">
        <NewsletterSignup />
      </div>
    </section>
  );
}
