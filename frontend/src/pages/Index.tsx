import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import AboutMe from '@/components/AboutMe';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Scroll tracking for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home','about', 'watercolor', 'acrylic', 'oil', 'pencil', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Home section (hero)
      if (window.scrollY < 200) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {/* Hero Section */}
      <HeroSection setActiveSection={setActiveSection} />
      <AboutMe /> {/* Új sor */}
      {/* Gallery Sections */}
      <GallerySection
        id="watercolor"
        title="Akvarell"
        description="Átlátszó, könnyű technikával készült festmények, amelyek a víz és pigment harmonikus játékát mutatják be."
        color="watercolor"
      />
      <GallerySection
        id="acrylic"
        title="Akril"
        description="Élénk színekkel és gazdag textúrákkal készült akril festmények, amelyek modern technikával születtek."
        color="acrylic"
      />
      <GallerySection
        id="oil"
        title="Olajfestés"
        description="Klasszikus olajfestő technikával készült művek, amelyek mélységet és gazdagságot tükröznek."
        color="oil"
      />
      <GallerySection
        id="pencil"
        title="Ceruza munkák"
        description="Szén, grafit, színes és pasztell ceruzával készült finom kompozíciók és részletgazdag ábrázolások."
        color="pencil"
      />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Index;
