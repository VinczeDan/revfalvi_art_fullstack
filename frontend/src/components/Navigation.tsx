// src/components/Navigation.tsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/TranslationContext";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();

  const menuItems = [
    { id: "home", label: "Kezdőlap", highlight: false },
    { id: "about", label: "Rólam", highlight: false },
    { id: "courses", label: "Tanfolyamok", highlight: true }, // ← piros kiemelés
    { id: "news", label: "Sajtó", highlight: false },
    { id: "portfolio", label: "Portfólió", highlight: false },
    { id: "contact", label: "Kapcsolat", highlight: false },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const navHeight = 64;
        const top =
          element.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="slide-in-left">
            <h1
              className="text-xl font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
              onClick={() => scrollToSection("home")}
            >
              Révfalvi Péter
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  slide-in-right stagger-${Math.min(index + 1, 4)}
                  text-sm font-medium transition-all duration-200 px-3 py-1.5 rounded
                  ${
                    item.highlight
                      ? `border border-red-500 text-red-500 hover:bg-red-500 hover:text-white
                       ${activeSection === item.id ? "bg-red-500 text-white" : ""}`
                      : `hover:text-primary
                       ${
                         activeSection === item.id
                           ? "text-primary border-b-2 border-primary"
                           : "text-muted-foreground"
                       }`
                  }
                `}
              >
                {item.label}
              </button>
            ))}

            {/* Nyelvváltó */}
            <button
              className="ml-4 px-3 py-1 border rounded text-sm hover:bg-accent transition-colors"
              onClick={() => setLanguage(language === "hu" ? "en" : "hu")}
            >
              {language === "hu" ? "EN" : "HU"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="px-2 py-1 border rounded text-sm hover:bg-accent transition-colors"
              onClick={() => setLanguage(language === "hu" ? "en" : "hu")}
            >
              {language === "hu" ? "EN" : "HU"}
            </button>

            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="slide-in-right"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
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
                  className={`
                    block w-full text-left px-3 py-2 text-sm font-medium
                    transition-colors rounded-md
                    ${
                      item.highlight
                        ? `text-red-500 hover:bg-red-50
                         ${activeSection === item.id ? "bg-red-50" : ""}`
                        : `hover:text-primary hover:bg-accent
                         ${
                           activeSection === item.id
                             ? "text-primary bg-accent"
                             : "text-muted-foreground"
                         }`
                    }
                  `}
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
