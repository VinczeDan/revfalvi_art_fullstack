// src/pages/NewsDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/TranslationContext";

interface NewsImage {
  id: number;
  image_url: string;
  caption?: string | null;
}

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url: string; // borítókép
  publication_date: string;
  images?: NewsImage[]; // további képek
}

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useTranslation();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/news/${id}/?lang=${language}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data: NewsItem = await response.json();
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetail();
  }, [id, language]);

  if (loading) return <p>{t("news.loading")}</p>;
  if (error)
    return (
      <p className="text-red-500">
        {t("news.error")}: {error}
      </p>
    );
  if (!news) return <p>{t("news.noNews")}</p>;

  return (
    <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl">
        <Link to="/" className="text-blue-600 hover:underline mb-6 block">
          ← {t("news.back")}
        </Link>

        <Card className="overflow-hidden shadow-soft rounded-2xl">
          {/* Borítókép */}
          {news.image_url && (
            <img
              src={news.image_url}
              alt={news.title}
              className="w-full h-48 sm:h-64 md:h-80 object-cover"
            />
          )}

          <CardContent className="p-4 sm:p-6 md:p-8">
            {/* Cím */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              {news.title}
            </h1>

            {/* Dátum */}
            <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
              {new Date(news.publication_date).toLocaleDateString()}
            </p>

            {/* Tartalom */}
            <p className="text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {news.content}
            </p>

            {/* További képek */}
            {news.images && news.images.length > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {news.images.map((img) => (
                  <div key={img.id} className="overflow-hidden rounded-lg">
                    <img
                      src={img.image_url}
                      alt={img.caption || news.title}
                      className="w-full h-48 object-cover"
                    />
                    {img.caption && (
                      <p className="text-sm text-gray-600 mt-1">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsDetail;
