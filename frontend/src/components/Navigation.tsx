// src/components/Navigation.tsx
import { useTranslation } from "@/TranslationContext";

type Props = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Navigation = ({ activeSection, setActiveSection }: Props) => {
  const { t, language, setLanguage } = useTranslation();

  const menuItems = [
    { id: "home", label: t("navigation.home") },
    { id: "about", label: t("navigation.about") },
    { id: "watercolor", label: t("navigation.watercolor") },
    { id: "acrylic", label: t("navigation.acrylic") },
    { id: "oil", label: t("navigation.oil") },
    { id: "pencil", label: t("navigation.pencil") },
    { id: "contact", label: t("navigation.contact") },
  ];

  return (
    <nav className="flex gap-4 p-4 bg-white shadow-md sticky top-0 z-50">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`${
            activeSection === item.id ? "font-bold underline" : ""
          }`}
          onClick={() => {
            setActiveSection(item.id);
            document
              .getElementById(item.id)
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {item.label}
        </button>
      ))}

      {/* Nyelvváltó gomb */}
      <button
        className="ml-auto px-3 py-1 border rounded"
        onClick={() => setLanguage(language === "hu" ? "en" : "hu")}
      >
        {language === "hu" ? "EN" : "HU"}
      </button>
    </nav>
  );
};

export default Navigation;
