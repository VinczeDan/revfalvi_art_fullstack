// src/components/TestimonialsSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Quote } from "lucide-react";
import { useTranslation } from "@/TranslationContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Testimonial {
  name: string;
  personality: string;
  goal: string;
  progress: string;
  improvement: string;
  recommendation: string;
}

const TestimonialsSection = () => {
  const { language } = useTranslation();
  const header = useScrollReveal({ threshold: 0.2 });
  const cardsReveal = useScrollReveal({ threshold: 0.1 });

  // A megadott válaszok alapján strukturált adatok Anna és Petra nevével
  const testimonials: Testimonial[] = [
    {
      name: "Flóra",
      personality: "Segítőkész, vicces, megértő, figyelmes, együttérző.",
      goal: "Kitűzött célom, hogy jobban és bátrabban beszéljek angolul. Sikeres nyelvvizsgákat tudjak tenni, amik teljesítése elengedhetetlen a továbbtanulásomhoz.",
      progress: "Igen, úgy érzem mióta hozzád járok, nagyon sokat fejlődtem.",
      improvement:
        "Beszédben elsősorban és szókincsben. Nyelvtani feladatokat is egyre jobban megértem és könnyebben oldom meg azokat.",
      recommendation:
        "Megbízható vagy. Olyan tanár, akitől bátran tudok kérdezni, a kérdésekre érthető választ kapok. Valamint kellemes és megbízható környezetben tanulhatok nálad.",
    },
    {
      name: " ",
      personality: "Segítőkész, megértő, nyitott, vicces, megbízható.",
      goal: "Kitűzött célom, hogy bátran és jobban beszéljek angolul. Amiben úgy érzem, nagy segítségemre vagy. Nemcsak a magas szintű nyelvtudásod miatt, hanem a biztató szavaid, őszinte érdeklődésed az elkészített feladatok átnézésében.",
      progress: "Igen, úgy érzem nagyon sokat fejlődtem, amióta hozzád járok.",
      improvement:
        "A nyelv magabiztosabb használatában, valamint a szókincs gyarapodásában.",
      recommendation:
        "Az órák jó hangulatban telnek, mindig érzem az őszinte támogatásodat, biztató szavaid mindig nagy lendületet adnak, akkor is amikor úgy érzem, hogy elfáradtam és nehezebben értem meg az adott óra anyagát.",
    },
    {
      name: "Dóra",
      personality: "Kedves, figyelmes, előzékeny és jól felkészült.",
      goal: "Azért szeretek hozzád járni, mert szeretnék magabiztosabban beszélni angolul, és úgy érzem, veled ezt a célomat el tudom érni.",
      progress: "Igen, elégedett vagyok a haladásommal.",
      improvement:
        "Sokat fejlődtem abban, hogy jobban odafigyelek az új kifejezésekre, és igyekszem azokat aktívan alkalmazni is.",
      recommendation:
        "Azért ajánlanálak másoknak is, mert nagyon türelmes vagy, és mindig személyre szabott órákat tartasz.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-4 bg-gradient-soft">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div
          ref={header.ref}
          className={`text-center mb-16 reveal reveal-up ${header.isVisible ? "is-visible" : ""}`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {language === "hu" ? "Vélemények" : "Testimonials"}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 shadow-sm"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "hu"
              ? "Olvass bele a diákjaim visszajelzéseibe és sikereibe."
              : "Read what my students say about our lessons together."}
          </p>
        </div>

        {/* Diákok kártyái elrendezve */}
        <div
          ref={cardsReveal.ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 reveal reveal-up ${cardsReveal.isVisible ? "is-visible" : ""}`}
        >
          {testimonials.map((student, idx) => (
            <Card
              key={idx}
              className="border-0 shadow-soft bg-card relative overflow-hidden flex flex-col justify-between"
            >
              {/* Idézőjel dekoráció a háttérben */}
              <div className="absolute top-6 right-6 opacity-5 pointer-events-none">
                <Quote className="w-24 h-24 text-foreground" />
              </div>

              <CardContent className="p-8 space-y-6">
                {/* Diák neve és belső tulajdonságok */}
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    {student.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                    {student.personality}
                  </p>
                </div>

                {/* Kérdések szerinti tömör csempék/blokkok */}
                <div className="space-y-4 border-t border-border pt-4">
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      {language === "hu"
                        ? "Miért szeretsz ide járni?"
                        : "Why do you like studying here?"}
                    </h4>
                    <p className="text-foreground/90 text-sm italic">
                      "{student.goal}"
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      / Haladás és fejlődés /
                    </h4>
                    <p className="text-foreground/90 text-sm">
                      {student.progress}{" "}
                      <span className="text-primary font-medium">
                        {student.improvement}
                      </span>
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      {language === "hu"
                        ? "Miért ajánlanád másnak?"
                        : "Why would you recommend me?"}
                    </h4>
                    <p className="text-foreground/90 text-sm bg-muted/30 p-3 rounded-xl border border-white/5">
                      {student.recommendation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
