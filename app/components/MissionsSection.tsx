const missions = [
  {
    id: 1,
    title: "Building Systems That Scale",
    description: "Creating repeatable processes and frameworks that drive sustainable growth. Focused on operational excellence and systematic approaches to product development.",
    image: "/golf%20photo.jpeg",
    color: "#8B4513"
  },
  {
    id: 2,
    title: "Go-To-Market Strategy",
    description: "Developing and executing GTM strategies that connect products with the right audiences. From positioning to distribution, building the bridge between product and market.",
    image: "/Dante%20Wide%20Profile.png",
    color: "#C41E3A"
  },
  {
    id: 3,
    title: "Content & Distribution",
    description: "Creating valuable content that educates and inspires. Building distribution channels that amplify reach and create meaningful connections with audiences.",
    image: "/hunting%20photo.jpeg",
    color: "#5D4E8C"
  },
  {
    id: 4,
    title: "Growth Through Community",
    description: "Fostering communities around shared interests and values. When people feel aligned, trust forms—and the right customers follow naturally.",
    image: "/sauna%20photo.jpeg",
    color: "#2F4F4F"
  }
];

export default function MissionsSection() {
  return (
    <section className="missions-section">
      <div className="missions-container">
        {/* Left Content */}
        <div className="missions-content">
          <h2 className="missions-headline">
            Driven by Purpose,<br />
            Focused on<br />
            <span className="missions-highlight">Results</span>
          </h2>
          <p className="missions-description">
            I take ideas from 0→1, build them into durable systems, and connect them with the people they're meant for—sharing what I learn along the way.
          </p>
        </div>

        {/* Right - Expandable Cards */}
        <div className="missions-cards">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="mission-card"
              style={{
                backgroundImage: `linear-gradient(${mission.color}dd, ${mission.color}ee), url(${mission.image})`,
                backgroundColor: mission.color
              }}
            >
              <div className="mission-card-content">
                <div className="mission-card-header">
                  <h3 className="mission-card-title">{mission.title}</h3>
                  <span className="mission-card-toggle">+</span>
                </div>
                <div className="mission-card-body">
                  <p className="mission-card-description">{mission.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
