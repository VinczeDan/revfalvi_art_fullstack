import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  setActiveSection: (section: string) => void;
}

const HeroSection = ({ setActiveSection }: HeroSectionProps) => {
  const scrollToGallery = () => {
    setActiveSection('watercolor');
    const element = document.getElementById('watercolor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-artist-blue rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Főcím */}
          <h1 className="slide-in-left text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Üdvözöllek az oldalamon.
          </h1>

          {/* Alcím */}
          <p className="slide-in-right stagger-1 text-xl md:text-2xl text-white/90 mb-8 font-light max-w-2xl mx-auto">
            Akvarell, akril és olajfestmények, valamint ceruza kompozíciók gyűjteménye
          </p>

          {/* Techniák lista */}
          <div className="fade-in-up stagger-2 flex flex-wrap justify-center gap-4 mb-12">
            {[
              'Akvarell',
              'Akril',
              'Olajfestés',
              'Szén',
              'Grafit',
              'Színes ceruza',
              'Pasztell'
            ].map((technique, index) => (
              <span
                key={technique}
                className={`fade-in-up stagger-${Math.min(index + 2, 4)} px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium border border-white/30`}
              >
                {technique}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <div className="fade-in-up stagger-3">
            <Button
              onClick={scrollToGallery}
              size="lg"
              className="bg-white text-artist-dark hover:bg-white/90 transition-all duration-300 px-8 py-4 text-lg font-medium rounded-full shadow-strong hover-lift"
            >
              Galéria megtekintése
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 fade-in-up stagger-4">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;