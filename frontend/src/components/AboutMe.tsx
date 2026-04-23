import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, User } from "lucide-react";
import { useTranslation } from "@/TranslationContext";

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-4 bg-gradient-soft">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
            <Palette className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("about.title")}
          </h2>

          <p className="text-lg text-muted-foreground">{t("about.text")}</p>
        </div>

        {/* Kétkártyás elrendezés */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Első kártya (Küldetésnyilatkozat / Angol tanár) */}
          <Card className="border-0 shadow-soft h-full">
            <CardHeader>
              <CardTitle className="text-xl">{t("about.cardTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">
                {t("about.cardContent")}
              </p>
            </CardContent>
          </Card>

          {/* Második kártya (Művészi Bemutatkozás) */}
          <Card className="border-0 shadow-soft h-full">
            <CardHeader className="flex flex-row items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">{t("about.introTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">
                {t("about.introContent")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
