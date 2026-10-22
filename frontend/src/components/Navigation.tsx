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
    { id: "home", label: t("navigation.home"), highlight: false },
    { id: "about", label: t("navigation.about"), highlight: false },
    { id: "courses", label: t("navigation.courses"), highlight: true },
    { id: "news", label: t("navigation.news"), highlight: false },
    { id: "portfolio", label: t("navigation.portfolio"), highlight: false },
    {
      id: "testimonials",
      label:
        language === "hu"
          ? "Vélemények"
          : language === "de"
            ? "Bewertungen"
            : "Testimonials",
      highlight: false,
    },
    { id: "contact", label: t("navigation.contact"), highlight: false },
  ];

  const languages = [
    { code: "hu", label: "HU" },
    { code: "en", label: "EN" },
    { code: "de", label: "DE" },
  ] as const;

  const languageLabels = {
    hu: "Nyelv",
    en: "Language",
    de: "Sprache",
  };

  const changeLanguage = (nextLanguage: (typeof languages)[number]["code"]) => {
    setLanguage(nextLanguage);
    setIsOpen(false);
  };

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

            <div
              aria-label={languageLabels[language]}
              className="ml-3 flex items-center gap-1 rounded-lg border border-border p-1"
              role="group"
            >
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  aria-pressed={language === code}
                  className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
                    language === code
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() => changeLanguage(code)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
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
              <div className="mt-3 border-t border-border px-3 pt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {languageLabels[language]}
                </p>
                <div
                  aria-label={languageLabels[language]}
                  className="flex gap-2"
                  role="group"
                >
                  {languages.map(({ code, label }) => (
                    <button
                      key={code}
                      aria-pressed={language === code}
                      className={`min-w-14 rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${
                        language === code
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                      onClick={() => changeLanguage(code)}
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
