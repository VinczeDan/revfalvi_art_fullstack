// src/pages/Index.tsx
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import AboutMe from "@/components/AboutMe";
import { useTranslation } from "@/TranslationContext";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const { t } = useTranslation();

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "watercolor",
        "acrylic",
        "oil",
        "pencil",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }

      if (window.scrollY < 200) setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <HeroSection
        setActiveSection={setActiveSection}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        buttonText={t("hero.button")}
      />

      <AboutMe />

      <GallerySection
        id="watercolor"
        title={t("gallery.watercolor.title")}
        description={t("gallery.watercolor.description")}
        color="watercolor"
      />
      <GallerySection
        id="acrylic"
        title={t("gallery.acrylic.title")}
        description={t("gallery.acrylic.description")}
        color="acrylic"
      />
      <GallerySection
        id="oil"
        title={t("gallery.oil.title")}
        description={t("gallery.oil.description")}
        color="oil"
      />
      <GallerySection
        id="pencil"
        title={t("gallery.pencil.title")}
        description={t("gallery.pencil.description")}
        color="pencil"
      />

      <ContactSection />
    </div>
  );
};

export default Index;
