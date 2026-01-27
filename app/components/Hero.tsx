import Image from 'next/image';

console.log('Hero component loaded');

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-banner">
        <Image
          src="/Dante Wide Profile.png"
          alt="Dante Borgese"
          fill
          priority
          sizes="100vw"
          className="hero-banner-img"
        />
        <div className="hero-overlay">
          <h1 className="hero-name">Dante Borgese</h1>
          <p className="hero-location">Based in NYC</p>
          <p className="hero-title">Product & Growth Manager | Systems, GTM, and Distribution</p>
        </div>
      </div>
    </section>
  );
}
