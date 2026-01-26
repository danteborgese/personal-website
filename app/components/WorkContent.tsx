import Image from 'next/image';

export default function WorkContent() {
  return (
    <div className="work-grid">
      <div className="work-item">
        <h3 className="work-company-heading">
          <a href="https://hogylures.com" target="_blank" rel="noopener noreferrer" className="company-link">
            <span className="company-logo-wrapper">
              <Image
                src="/HOGY LOGO.png"
                alt="Hogy Lure Company"
                fill
                sizes="32px"
                className="company-logo"
              />
            </span>
            Hogy Lure Company
          </a>
        </h3>
        <p className="work-role">Product & Growth Manager | May 2024 - Present</p>
        <ul className="work-description">
          <li>Building content-led growth systems across YouTube, blog, and e-commerce.</li>
          <li>Running Meta ad campaigns end-to-end.</li>
          <li>Current Project: Building the industry's most dynamic fishing ed-tech platform (more details soon..)</li>
        </ul>
        <p className="work-role-previous">Previously:</p>
        <p className="work-role">Growth & Content Manager | May 2022 - May 2024</p>
        <p className="work-role">Video Production Specialist | May 2021 - May 2022</p>
        <a href="https://www.linkedin.com/in/danteborgese/" target="_blank" rel="noopener noreferrer">View on LinkedIn</a>
      </div>

      <div className="work-item">
        <h3 className="work-company-heading">
          <a href="https://ramislandstudios.com" target="_blank" rel="noopener noreferrer" className="company-link">
            <span className="company-logo-wrapper">
              <Image
                src="/Ram Island Studios Logo.png"
                alt="Ram Island Studios"
                fill
                sizes="32px"
                className="company-logo"
              />
            </span>
            Ram Island Studios
          </a>
        </h3>
        <p className="work-role">Founder & Operator | June 2018 - May 2021</p>
        <p>Built and operated a video services business end-to-end. Worked directly with founders and small teams to translate business goals into realized outcomes.</p>
        <a href="https://ramislandstudios.com" target="_blank" rel="noopener noreferrer">Visit Website</a>
      </div>
    </div>
  );
}
