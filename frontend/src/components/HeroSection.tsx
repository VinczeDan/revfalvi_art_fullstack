// src/components/HeroSection.tsx
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  setActiveSection: (section: string) => void;
  title: string;
  subtitle: string;
  buttonText: string;
}

const HeroSection = ({
  setActiveSection,
  title,
  subtitle,
  buttonText,
}: HeroSectionProps) => {
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Vite alatt a public mappából a "/" jellel érjük el a fájlt
  const HERO_IMAGE_PATH = "/borito.jpeg";

  const heroStyle = {
    // Kettős megoldás: sötétítő réteg és a kép egyben
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${HERO_IMAGE_PATH}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
  };

  return (
    <section
      id="home"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={heroStyle}
    >
      {/* Tartalom konténer */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="slide-in-left text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          {title}
        </h1>

        <p className="slide-in-right stagger-1 text-xl md:text-2xl text-white/90 mb-8 font-light max-w-2xl mx-auto drop-shadow">
          {subtitle}
        </p>

        <div className="fade-in-up stagger-3 flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => scrollToSection("portfolio")}
            className="bg-white text-artist-dark hover:bg-white/90 transition-all duration-300 px-8 py-4 text-lg font-medium rounded-full shadow-strong hover-lift"
          >
            {buttonText}
          </Button>

          <Button
            onClick={() => scrollToSection("courses")}
            className="bg-red-500 hover:bg-red-600 text-white transition-all duration-300 px-8 py-4 text-lg font-medium rounded-full shadow-strong hover-lift"
          >
            Tanfolyamok
          </Button>
        </div>
      </div>

      {/* Díszítő elemek csak akkor látszanak, ha valamiért nem töltene be a kép */}
      <div className="absolute inset-0 opacity-10 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
