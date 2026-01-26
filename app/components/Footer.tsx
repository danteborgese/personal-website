
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-main">
      <div className="footer-container">
        <div className="footer-content">
          {/* Left - Profile & CTA */}
          <div className="footer-profile">
            <div className="footer-profile-header">
              <div className="footer-avatar-wrapper">
                <img
                  src="/Dante-Profile Pic.jpeg"
                  alt="Dante Borgese"
                  className="footer-avatar"
                />
              </div>
              <h3 className="footer-chat-title">Let's Connect</h3>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="footer-nav">
            <div className="footer-nav-column">
              <h4 className="footer-nav-title">SOCIAL</h4>
              <ul className="footer-nav-list">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              </ul>
            </div>

            <div className="footer-nav-column">
              <h4 className="footer-nav-title">NAVIGATE</h4>
              <ul className="footer-nav-list">
                <li><a href="#work">Work</a></li>
                <li><a href="#content">Content</a></li>
                <li><a href="#interests">Interests</a></li>
                <li><a href="#library">Library</a></li>
              </ul>
            </div>

            <div className="footer-nav-column footer-contact-column">
              <ul className="footer-nav-list footer-contact-list">
                <li>Based in NYC</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Dante Borgese. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
