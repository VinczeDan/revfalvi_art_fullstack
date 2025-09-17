import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/TranslationContext";
import { Newspaper } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image_url: string;
  publication_date: string;
}

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Ezt a részt majd a Django backend elkészültekor aktiválod újra
    /*
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/news/?lang=${language}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: NewsItem[] = await response.json();
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
    */

    // Próba adatok, amíg az API nem működik
    setNews([
      {
        id: 1,
        title: "Példahír 1: Kiállítás a Műcsarnokban",
        excerpt:
          "Péter legújabb munkái is megtekinthetők a Műcsarnokban rendezett őszi kiállításon.",
        image_url: "https://via.placeholder.com/600x450.png?text=H%C3%ADr+1",
        publication_date: "2024-09-17",
      },
      {
        id: 2,
        title: "Példahír 2: Beszélgetés a művészettel",
        excerpt:
          "Egy interjú Révfalvi Péterrel, ahol a művészet iránti szenvedélyéről és alkotási folyamatairól mesél.",
        image_url: "https://via.placeholder.com/600x450.png?text=H%C3%ADr+2",
        publication_date: "2024-09-10",
      },
      {
        id: 3,
        title: "Példahír 3: Új kollekció megérkezett",
        excerpt:
          "A legújabb akvarell és olajfestmények mostantól megvásárolhatók a webshopban.",
        image_url: "https://via.placeholder.com/600x450.png?text=H%C3%ADr+3",
        publication_date: "2024-09-01",
      },
    ]);
    setLoading(false);
  }, []);

  return (
    <section id="news" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
            <Newspaper className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("news.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("news.description")}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Card
              key={item.id}
              className="group hover-lift cursor-pointer border-0 shadow-soft hover:shadow-medium overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-white/90 text-sm line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
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

export default NewsSection;
