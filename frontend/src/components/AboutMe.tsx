import { Card, CardContent } from "@/components/ui/card";
import { Palette } from "lucide-react";
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

        {/* Kétkártyás elrendezés címek nélkül */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bal oldali kártya (Angol oktatás szöveg) */}
          <Card className="border-0 shadow-soft h-full">
            <CardContent className="pt-6">
              {" "}
              {/* Adtam egy kis felső margót a szövegnek */}
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {t("about.leftContent")}
              </p>
            </CardContent>
          </Card>

          {/* Jobb oldali kártya (Művészeti bemutatkozás) */}
          <Card className="border-0 shadow-soft h-full">
            <CardContent className="pt-6">
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {t("about.rightContent")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
