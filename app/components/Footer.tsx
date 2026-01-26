import Image from 'next/image';

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
                <Image
                  src="/Dante-Profile Pic.jpeg"
                  alt="Dante Borgese"
                  fill
                  sizes="60px"
                  className="footer-avatar"
                />
              </div>
              <h3 className="footer-chat-title">Let's Chat</h3>
            </div>
            <p className="footer-bio">
              I'm passionate about building systems that scale, crafting go-to-market strategies,
              and creating content that drives growth. Let's connect and explore how we can work together.
            </p>
            <a
              href="mailto:dlborgese@gmail.com"
              className="footer-cta"
            >
              Schedule a call
            </a>
          </div>

          {/* Navigation Columns */}
          <div className="footer-nav">
            <div className="footer-nav-column">
              <h4 className="footer-nav-title">NAVIGATE</h4>
              <ul className="footer-nav-list">
                <li><a href="#work">Work</a></li>
                <li><a href="#content">Content</a></li>
                <li><a href="#interests">Interests</a></li>
                <li><a href="#library">Library</a></li>
              </ul>
            </div>

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
              <h4 className="footer-nav-title">CONTACT</h4>
              <ul className="footer-nav-list footer-contact-list">
                <li>dlborgese@gmail.com</li>
                <li>New York City</li>
                <li>EST Timezone</li>
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
