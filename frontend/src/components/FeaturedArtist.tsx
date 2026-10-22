import { Award, Facebook } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import featuredArtwork from "@/assets/featured-artist-artwork.jpg";

const FeaturedArtist = () => {
  const header = useScrollReveal({ threshold: 0.2 });
  const artwork = useScrollReveal({ threshold: 0.15 });
  const story = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      aria-labelledby="featured-artist-title"
      className="bg-gradient-soft px-4 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div
          ref={header.ref}
          className={`reveal reveal-up mb-12 text-center ${header.isVisible ? "is-visible" : ""}`}
        >
          <Badge className="mb-5 px-4 py-2 text-sm" variant="secondary">
            <Award aria-hidden="true" className="mr-2 h-4 w-4" />
            Különdíjas alkotó
          </Badge>
          <h2
            className="text-3xl font-bold text-foreground md:text-5xl"
            id="featured-artist-title"
          >
            Kiemelt Művész: Szloboda Szilárd
          </h2>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-primary shadow-sm" />
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div
            ref={artwork.ref}
            className={`reveal reveal-left lg:col-span-7 ${artwork.isVisible ? "is-visible" : ""}`}
          >
            <Card className="overflow-hidden border-0 bg-card/70 shadow-medium">
              <CardContent className="p-3">
                <img
                  alt="Absztrakt, színes művészeti illusztráció – helyőrző Szloboda Szilárd alkotásához"
                  className="h-auto w-full rounded-lg object-contain shadow-medium"
                  src={featuredArtwork}
                />
              </CardContent>
            </Card>
          </div>

          <div
            ref={story.ref}
            className={`reveal reveal-right reveal-delay-2 lg:col-span-5 ${story.isVisible ? "is-visible" : ""}`}
          >
            <Card className="border-0 bg-card/70 shadow-soft backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <p className="leading-relaxed text-muted-foreground">
                  Szloboda Szilárd vagyok, 16 éves autizmussal élő fiatal.
                  Nagyon súlyos autistaként kezdtem életem, ceruzát 5 évesen
                  vettem a kezembe, és nem ment a beszéd sem. Anya fejlesztése
                  hatására megtanultam beszélni és olvasni, és egyre jobb
                  kinyílt a világom. Rajzaim először inkább az
                  &quot;odabent&quot;-et, a fejemben lévő dolgokat ábrázolták;
                  de ahogy egyre jobban megértem a körülöttem zajló eseményeket,
                  egyre komplexebbek a festményeim, grafikáim is. Ha jól
                  megnézed őket, lehet, hogy érzel rajtuk valami
                  különlegeset.... a Másság különleges szépségét. Ha tetszik ez
                  a kép, jelölj be a Szloboda Szilárd Facebook oldalon, ahová az
                  összes művem felkerül!
                </p>
                <Button asChild className="mt-7" size="lg">
                  <a
                    href="https://www.facebook.com/share/1KamH7CpgM/?mibextid=wwXIfr"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Facebook aria-hidden="true" />
                    Szloboda Szilárd Facebook oldala
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtist;
