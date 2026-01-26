import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionGrid from './components/SectionGrid';
import SocialsSection from './components/SocialsSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionGrid />
      <SocialsSection />
      <Footer />
    </>
  );
}
