export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} Dante Borgese. All rights reserved.</p>
        <p className="footer-contact">Contact: <a href="mailto:dlborgese@gmail.com">dlborgese@gmail.com</a></p>
      </div>
    </footer>
  );
}
