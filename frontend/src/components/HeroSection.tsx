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
  const scrollToGallery = () => {
    setActiveSection("watercolor");
    const element = document.getElementById("watercolor");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-artist-blue rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="slide-in-left text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        <p className="slide-in-right stagger-1 text-xl md:text-2xl text-white/90 mb-8 font-light max-w-2xl mx-auto">
          {subtitle}
        </p>

        <div className="fade-in-up stagger-3">
          <Button
            onClick={scrollToGallery}
            size="lg"
            className="bg-white text-artist-dark hover:bg-white/90 transition-all duration-300 px-8 py-4 text-lg font-medium rounded-full shadow-strong hover-lift"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
