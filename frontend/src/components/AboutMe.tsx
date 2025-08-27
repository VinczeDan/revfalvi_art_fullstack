import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";

const AboutMe = () => {
  return (
    <section id="about" className="py-20 px-4 bg-gradient-soft">
      {/* Középre igazított konténer fix szélességgel */}
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
            <Palette className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Rólam
          </h2>

          <p className="text-lg text-muted-foreground">
            Ismerj meg közelebbről és fedezd fel a művészetem mögött rejlő
            történetet.
          </p>
        </div>

        {/* Középre igazított Card fix szélességgel */}
        <div className="flex justify-center">
          <Card className="w-full max-w-2xl border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-xl">Bemutatkozás</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Üdvözöllek az oldalamon! Révfalvi Péter vagyok, A
                képzőművészettel már több éve foglalkozom. Azon belül is
                festészettel és grafikával. Alkotásaimmal egy-egy hely
                szépségét, formavilágát mutatom be különböző médiumok
                használatával. Ami a grafikai munkáimat illeti, igyekszem olyat
                alkotni, amin egy-egy emberi érzés, vagy valamilyen egyedi tárgy
                kerül a középpontba. Jó időtöltést kívánok az oldalamon!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
