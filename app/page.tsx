import PromoBanner from './components/PromoBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsletterSignup from './components/NewsletterSignup';
import AboutSection from './components/AboutSection';
import MissionsSection from './components/MissionsSection';
import SectionGrid from './components/SectionGrid';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <PromoBanner />
      <Navbar />
      <Hero />
      <NewsletterSignup />
      <AboutSection />
      <MissionsSection />
      <SectionGrid />
      <Footer />
    </>
  );
}
