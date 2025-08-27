// TranslationContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { translations } from "./translations";

type Language = "hu" | "en";

interface TranslationContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(
  undefined
);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("hu");

  const t = (key: string) => {
    const parts = key.split(".");
    let value: any = translations[language];
    for (const part of parts) {
      value = value?.[part];
    }
    return value || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const ctx = useContext(TranslationContext);
  if (!ctx)
    throw new Error("useTranslation must be used within TranslationProvider");
  return ctx;
};
