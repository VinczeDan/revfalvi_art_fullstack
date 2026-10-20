// src/components/AboutMe.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { useTranslation } from "@/TranslationContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
// Importáld a képet (ügyelj a helyes elérési útra a projektedben)
import diploma from "../assets/angliai_diploma.jpeg";

const AboutMe = () => {
  const { t } = useTranslation();

  const header = useScrollReveal({ threshold: 0.2 });
  const leftCard = useScrollReveal({ threshold: 0.15 });
  const rightCard = useScrollReveal({ threshold: 0.15 });

  return (
    <section id="about" className="py-20 px-4 bg-gradient-soft">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div
          ref={header.ref}
          className={`text-center mb-16 reveal reveal-up ${header.isVisible ? "is-visible" : ""}`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6 shadow-lg">
            <Palette className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("about.title")}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 shadow-sm rounded-full"></div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("about.text")}
          </p>
        </div>

        {/* Kétkártyás elrendezés */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bal oldali kártya */}
          <div
            ref={leftCard.ref}
            className={`reveal reveal-left ${leftCard.isVisible ? "is-visible" : ""}`}
          >
            <Card className="border-0 shadow-soft h-full bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-8">
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {t("about.leftContent")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Jobb oldali kártya - Beillesztett képpel */}
          <div
            ref={rightCard.ref}
            className={`reveal reveal-right reveal-delay-2 ${rightCard.isVisible ? "is-visible" : ""}`}
          >
            <Card className="border-0 shadow-soft h-full bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-8">
                {/* 2. KÉP BEILLESZTÉSE */}

                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {t("about.rightContent")}
                </p>
                <div className="mb-6 rounded-lg shadow-medium flex justify-center">
                  <img
                    src={diploma}
                    alt="Diploma"
                    className="max-w-full h-auto object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
