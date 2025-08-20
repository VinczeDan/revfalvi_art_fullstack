import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Főoldal' },
    { id: 'about', label: 'Rólam' },
    { id: 'watercolor', label: 'Akvarell' },
    { id: 'acrylic', label: 'Akril' },
    { id: 'oil', label: 'Olajfestés' },
    { id: 'pencil', label: 'Ceruza munkák' },
    { id: 'contact', label: 'Kapcsolat' }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
    
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Név */}
          <div className="slide-in-left">
            <h1 
              className="text-xl font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
              onClick={() => scrollToSection('home')}
            >
              Révfalvi Péter
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`slide-in-right stagger-${Math.min(index + 1, 4)} text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.id 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="slide-in-right"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-accent rounded-md ${
                    activeSection === item.id 
                      ? 'text-primary bg-accent' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;