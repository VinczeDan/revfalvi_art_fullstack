// src/components/AboutMe.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { useTranslation } from "@/TranslationContext";

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-4 bg-gradient-soft">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("about.title")}
          </h2>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-2xl border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">{t("about.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("about.text")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
