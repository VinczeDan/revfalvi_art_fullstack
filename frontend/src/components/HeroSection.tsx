// src/components/HeroSection.tsx
import { Button } from "@/components/ui/button";


const HERO_BACKGROUND_IMAGE = "/borito.jpg"; // ← IDE ÍRD BE A KÉPED ÚTJÁT

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
  const scrollToGallery = () => {
    setActiveSection("portfolio");
    const element = document.getElementById("portfolio");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const heroStyle = HERO_BACKGROUND_IMAGE
    ? {
        backgroundImage: `url(${HERO_BACKGROUND_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        HERO_BACKGROUND_IMAGE ? "" : "bg-gradient-hero"
      }`}
      style={heroStyle}
    >
      {/* Sötét overlay – képnél is biztosítja a szöveg olvashatóságát */}
      {HERO_BACKGROUND_IMAGE && (
        <div className="absolute inset-0 bg-black/50 z-0" />
      )}

      {/* Dekoratív háttér elemek (csak ha nincs egyedi kép) */}
      {!HERO_BACKGROUND_IMAGE && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-artist-blue rounded-full blur-2xl"></div>
        </div>
      )}

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="slide-in-left text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          {title}
        </h1>
        <p className="slide-in-right stagger-1 text-xl md:text-2xl text-white/90 mb-8 font-light max-w-2xl mx-auto drop-shadow">
          {subtitle}
        </p>

        <div className="fade-in-up stagger-3 flex flex-wrap gap-4 justify-center">
          <Button
            onClick={scrollToGallery}
            className="bg-white text-artist-dark hover:bg-white/90 transition-all duration-300 px-8 py-4 text-lg font-medium rounded-full shadow-strong hover-lift"
          >
            {buttonText}
          </Button>

          {/* Tanfolyamok gomb – piros kiemelés */}
          <Button
            onClick={() => {
              setActiveSection("courses");
              document
                .getElementById("courses")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-red-500 hover:bg-red-600 text-white transition-all duration-300 px-8 py-4 text-lg font-medium rounded-full shadow-strong hover-lift"
          >
            Tanfolyamok
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
