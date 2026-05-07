// src/components/GallerySection.tsx
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/TranslationContext";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Painting {
  id: number;
  title: string;
  description: string;
  technique: string;
  image_url: string;
  created_at: string;
}

interface GallerySectionProps {
  id: string;
  title: string;
  description: string;
  color: "watercolor" | "acrylic" | "oil" | "pencil";
}

const GallerySection = ({
  id,
  title,
  description,
  color,
}: GallerySectionProps) => {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(
    null,
  );
  const [expanded, setExpanded] = useState(false);

  const { language } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Görgetés figyelése (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Megkeressük az összes "reveal" osztályú elemet ezen a szekción belül
            const children = entry.target.querySelectorAll(".reveal-item");
            children.forEach((child) => {
              child.classList.add("is-visible");
            });
            // Ha egyszer már megjelent, levehetjük a figyelőt
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }, // 10% láthatóságnál indul
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [loading, expanded]); // Újraépítjük, ha változik a tartalom

  useEffect(() => {
    const fetchPaintings = async () => {
      setLoading(true);
      setExpanded(false);
      try {
        const response = await fetch(
          `/api/paintings/?technique=${id}&lang=${language}`,
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data: Painting[] = await response.json();
        setPaintings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        console.error("Error fetching paintings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, [id, language]);

  const visiblePaintings = expanded ? paintings : paintings.slice(0, 3);
  const hasMore = paintings.length > 3;

  if (loading)
    return (
      <section id={id} className="py-20 px-4 text-center">
        <p>
          {language === "en" ? "Loading paintings..." : "Képek betöltése..."}
        </p>
      </section>
    );

  if (error)
    return (
      <section id={id} className="py-20 px-4 text-center text-red-500">
        <p>{error}</p>
      </section>
    );

  return (
    <section id={id} ref={sectionRef} className="py-20 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header - Ez is beúszik */}
        <div className="text-center mb-16 reveal-item opacity-0 translate-y-10 transition-all duration-1000">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 shadow-sm"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visiblePaintings.map((painting, index) => (
            <div
              key={painting.id}
              className="reveal-item opacity-0 translate-y-20 transition-all duration-700"
              style={{ transitionDelay: `${(index % 3) * 150}ms` }} // Lépcsőzetes beúszás
            >
              <Card
                className="group hover-lift cursor-pointer border-0 shadow-soft hover:shadow-medium overflow-hidden"
                onClick={() => setSelectedPainting(painting)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                    <img
                      src={painting.image_url}
                      alt={painting.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {painting.title}
                        </h3>
                        <p className="text-white/90 text-sm line-clamp-2">
                          {painting.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-10 w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200 font-medium text-sm"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />{" "}
                {language === "en" ? "Show less" : "Kevesebb"}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />{" "}
                {language === "en"
                  ? `View all ${paintings.length} works`
                  : `Összes megtekintése (${paintings.length} mű)`}
              </>
            )}
          </button>
        )}

        {/* Modal (maradt változatlanul) */}
        {selectedPainting && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedPainting(null)}
          >
            <div
              className="bg-white rounded-lg overflow-hidden w-full max-w-6xl max-h-[90vh] flex flex-col lg:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPainting(null)}
                className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-3xl font-bold z-50"
              >
                ×
              </button>
              <div className="lg:w-1/2 h-[70vh] bg-gray-50 flex items-center justify-center p-8">
                <img
                  src={selectedPainting.image_url}
                  alt={selectedPainting.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="lg:w-1/2 p-8 overflow-y-auto">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {selectedPainting.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {language === "en" ? "Technique" : "Technika"}
                      </p>
                      <p className="text-lg capitalize">
                        {selectedPainting.technique}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {language === "en" ? "Created" : "Készült"}
                      </p>
                      <p className="text-lg">
                        {new Date(
                          selectedPainting.created_at,
                        ).toLocaleDateString(
                          language === "en" ? "en-US" : "hu-HU",
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      {language === "en" ? "Description" : "Leírás"}
                    </h4>
                    <p className="text-gray-700 whitespace-pre-line">
                      {selectedPainting.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
