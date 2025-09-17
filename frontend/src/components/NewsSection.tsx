// src/components/NewsSection.tsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/TranslationContext";
import { Newspaper } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url: string;
  publication_date: string;
}

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useTranslation();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/news/?lang=${language}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
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
  }, [language]); // Lekérés nyelvváltozáskor is

  if (loading)
    return (
      <section id="news" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <p>{t("news.loading")}</p>
        </div>
      </section>
    );

  if (error)
    return (
      <section id="news" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl text-center text-red-500">
          <p>
            {t("news.error")}: {error}
          </p>
        </div>
      </section>
    );

  if (news.length === 0)
    return (
      <section id="news" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <p>{t("news.noNews")}</p>
        </div>
      </section>
    );

  return (
    <section id="news" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Card
              key={item.id}
              className="group hover-lift cursor-pointer border-0 shadow-soft hover:shadow-medium overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-white/90 text-sm line-clamp-2">
                        {item.content}
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
