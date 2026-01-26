"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Work", link: "#work" },
    { name: "Content", link: "#content" },
    { name: "Interests", link: "#interests" },
    { name: "Library", link: "#library" },
    { name: "Socials", link: "#socials" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Check if this is an expandable list item (work, content, interests, library)
    const expandableItems = ['work', 'content', 'interests', 'library'];
    const hashId = href.slice(1); // Remove the #
    
    if (expandableItems.includes(hashId)) {
      // For expandable list items, find the section and scroll to it
      const section = document.querySelector('.expandable-section');
      if (section) {
        // Always update URL hash
        window.location.hash = href;
        
        // Manually trigger expansion via custom event (works even if hashchange doesn't fire)
        // Use a small delay to ensure DOM is ready
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('expandable-hash', { detail: { hash: hashId } }));
        }, 50);
        
        // Scroll to section first, then ExpandableList will handle scrolling to the row
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // For other links, use normal behavior
      const element = document.querySelector(href);
      if (element) {
        // Update URL hash if it's a hash link
        if (href.startsWith('#')) {
          window.location.hash = href;
        }
        
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <nav className="navbar__container" aria-label="Main navigation">
        <a
          href="#hero"
          className="navbar__logo"
          onClick={(e) => handleLinkClick(e, "#hero")}
        >
          Dante Borgese
        </a>

        {/* Desktop Navigation */}
        <ul className="navbar__menu" role="menubar">
          {navItems.map((item, idx) => (
            <li key={idx} role="none">
              <a
                href={item.link}
                role="menuitem"
                onClick={(e) => handleLinkClick(e, item.link)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className={`navbar__toggle ${isMenuOpen ? "navbar__toggle--open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="navbar__toggle-bar" aria-hidden="true"></span>
          <span className="navbar__toggle-bar" aria-hidden="true"></span>
          <span className="navbar__toggle-bar" aria-hidden="true"></span>
        </button>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`navbar__mobile ${isMenuOpen ? "navbar__mobile--open" : ""}`}
          aria-hidden={!isMenuOpen}
        >
          <ul className="navbar__mobile-menu" role="menu">
            {navItems.map((item, idx) => (
              <li key={idx} role="none">
                <a
                  href={item.link}
                  role="menuitem"
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={(e) => handleLinkClick(e, item.link)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Backdrop for mobile menu */}
        {isMenuOpen && (
          <div
            className="navbar__backdrop"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </nav>
    </header>
  );
}
